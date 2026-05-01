import { useEffect, useMemo, useRef, useState } from 'react';
import * as d3 from 'd3';

const TOTAL_NODES = 40;
const FRAUD_RING_SIZE = 8;

function buildGraph() {
	const nodes = Array.from({ length: TOTAL_NODES }, (_, i) => ({
		id: i,
		label: `ACC-${String(i + 1).padStart(3, '0')}`,
		fraud: i < FRAUD_RING_SIZE,
	}));

	const links = [];
	const seen = new Set();
	const key = (a, b) => `${Math.min(a, b)}-${Math.max(a, b)}`;
	const addLink = (source, target, suspicious = false) => {
		if (source === target) return;
		const k = key(source, target);
		if (seen.has(k)) return;
		seen.add(k);
		links.push({ source, target, suspicious });
	};

	// Fraud ring is densely connected but hidden at first.
	for (let i = 0; i < FRAUD_RING_SIZE; i += 1) {
		for (let j = i + 1; j < FRAUD_RING_SIZE; j += 1) {
			addLink(i, j, true);
		}
	}

	// Benign links across wider graph.
	while (links.length < 90) {
		const source = Math.floor(Math.random() * TOTAL_NODES);
		const target = Math.floor(Math.random() * TOTAL_NODES);
		const suspicious = source < FRAUD_RING_SIZE && target < FRAUD_RING_SIZE;
		addLink(source, target, suspicious);
	}

	return { nodes, links };
}

export default function FraudRingGraph() {
	const containerRef = useRef(null);
	const svgRef = useRef(null);
	const [analysisRun, setAnalysisRun] = useState(false);
	const graph = useMemo(() => buildGraph(), []);

	useEffect(() => {
		if (!containerRef.current || !svgRef.current) return;

		const width = containerRef.current.clientWidth;
		const height = Math.max(420, Math.round(width * 0.6));
		const svg = d3.select(svgRef.current).attr('viewBox', `0 0 ${width} ${height}`);
		svg.selectAll('*').remove();

		const simulation = d3
			.forceSimulation(graph.nodes)
			.force('link', d3.forceLink(graph.links).id((d) => d.id).distance(54).strength(0.14))
			.force('charge', d3.forceManyBody().strength(-130))
			.force('center', d3.forceCenter(width / 2, height / 2))
			.force('collide', d3.forceCollide().radius(12));

		const link = svg
			.append('g')
			.attr('stroke-linecap', 'round')
			.selectAll('line')
			.data(graph.links)
			.join('line')
			.attr('stroke', '#5c6575')
			.attr('stroke-opacity', 0.35)
			.attr('stroke-width', 1.2);

		const node = svg
			.append('g')
			.selectAll('circle')
			.data(graph.nodes)
			.join('circle')
			.attr('r', 7)
			.attr('fill', '#90a4bf')
			.attr('stroke', '#e7eef9')
			.attr('stroke-width', 1.5);

		node.append('title').text((d) => d.label);

		simulation.on('tick', () => {
			link
				.attr('x1', (d) => d.source.x)
				.attr('y1', (d) => d.source.y)
				.attr('x2', (d) => d.target.x)
				.attr('y2', (d) => d.target.y);

			node.attr('cx', (d) => d.x).attr('cy', (d) => d.y);
		});

		const drag = d3
			.drag()
			.on('start', (event, d) => {
				if (!event.active) simulation.alphaTarget(0.25).restart();
				d.fx = d.x;
				d.fy = d.y;
			})
			.on('drag', (event, d) => {
				d.fx = event.x;
				d.fy = event.y;
			})
			.on('end', (event, d) => {
				if (!event.active) simulation.alphaTarget(0);
				d.fx = null;
				d.fy = null;
			});

		node.call(drag);

		if (analysisRun) {
			node
				.transition()
				.duration(900)
				.attr('fill', (d) => (d.fraud ? '#ad1f2b' : '#9eb2cb'))
				.attr('r', (d) => (d.fraud ? 8.5 : 7));

			link
				.transition()
				.duration(900)
				.attr('stroke', (d) => (d.suspicious ? '#d6404f' : '#4f5969'))
				.attr('stroke-opacity', (d) => (d.suspicious ? 0.85 : 0.2))
				.attr('stroke-width', (d) => (d.suspicious ? 2.4 : 1.1));
		}

		const resizeObserver = new ResizeObserver(() => {
			if (!containerRef.current) return;
			const resizedWidth = containerRef.current.clientWidth;
			const resizedHeight = Math.max(420, Math.round(resizedWidth * 0.6));
			svg.attr('viewBox', `0 0 ${resizedWidth} ${resizedHeight}`);
			simulation.force('center', d3.forceCenter(resizedWidth / 2, resizedHeight / 2));
			simulation.alpha(0.5).restart();
		});

		resizeObserver.observe(containerRef.current);

		return () => {
			resizeObserver.disconnect();
			simulation.stop();
		};
	}, [analysisRun, graph]);

	return (
		<section className="fraud-graph-wrap">
			<div className="fraud-graph-head">
				<h3>Graph Network View: Suspicious Transaction Cluster</h3>
				<button type="button" onClick={() => setAnalysisRun(true)}>
					Run GNN Analysis
				</button>
			</div>
			<p>
				Simulated account network ({TOTAL_NODES} entities). Press the button to surface a latent
				fraud ring inferred from graph-structure anomalies.
			</p>
			<div ref={containerRef} className="fraud-graph-canvas">
				<svg ref={svgRef} role="img" aria-label="Fraud ring graph visualisation" />
			</div>

			<style>{`
				.fraud-graph-wrap {
					margin: 2rem 0 2.5rem;
					padding: 1rem 1rem 1.25rem;
					background: linear-gradient(145deg, #111923, #0d141d);
					border: 1px solid #243040;
					border-radius: 14px;
					color: #dde7f5;
				}
				.fraud-graph-head {
					display: flex;
					gap: 1rem;
					align-items: center;
					justify-content: space-between;
					flex-wrap: wrap;
				}
				.fraud-graph-head h3 {
					margin: 0;
					color: #f3f7ff;
					font-size: 1.15rem;
				}
				button {
					background: #d9e4ff;
					color: #0f1722;
					border: 0;
					border-radius: 999px;
					font-weight: 700;
					padding: 0.55rem 0.95rem;
					cursor: pointer;
				}
				button:hover {
					background: #f0f5ff;
				}
				p {
					margin: 0.6rem 0 1rem;
					font-size: 0.92rem;
					color: #b8c7dc;
				}
				.fraud-graph-canvas {
					width: 100%;
					min-height: 420px;
					border: 1px solid #2a3647;
					border-radius: 10px;
					background: radial-gradient(circle at 50% 30%, #1d2a3a, #121b27 70%);
					overflow: hidden;
				}
				svg {
					width: 100%;
					height: 100%;
					display: block;
				}
			`}</style>
		</section>
	);
}
