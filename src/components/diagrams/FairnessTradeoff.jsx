import React from 'react';

export default function FairnessTradeoff() {
  return (
    <div style={{ background: '#f8fafc', padding: '2rem', borderRadius: '8px', border: '1px solid #e2e8f0', margin: '2rem 0', fontFamily: 'system-ui, sans-serif' }}>
      <svg viewBox="0 0 600 500" width="100%" height="100%">
        <text x="300" y="40" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#0f172a">The Formal Impossibility of Joint Fairness</text>
        <text x="300" y="60" textAnchor="middle" fontSize="12" fill="#475569">(Kleinberg, Mullainathan, and Raghavan, 2017)</text>

        <g transform="translate(0, 40)">
          {/* Main Triangle */}
          <polygon points="300,80 150,380 450,380" fill="none" stroke="#cbd5e1" strokeWidth="4" strokeDasharray="8" />

          {/* Central Impossible Zone */}
          <circle cx="300" cy="260" r="50" fill="#fee2e2" stroke="#ef4444" strokeWidth="2" opacity="0.8" />
          <text x="300" y="255" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#b91c1c">IMPOSSIBLE</text>
          <text x="300" y="275" textAnchor="middle" fontSize="10" fill="#b91c1c">To satisfy all three</text>

          {/* Top Node: Calibration */}
          <circle cx="300" cy="80" r="45" fill="white" stroke="#3b82f6" strokeWidth="3" />
          <text x="300" y="75" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#1d4ed8">Calibration</text>
          <text x="300" y="90" textAnchor="middle" fontSize="9" fill="#475569">Honest scores</text>

          {/* Bottom Left Node: Demographic Parity */}
          <circle cx="150" cy="380" r="45" fill="white" stroke="#10b981" strokeWidth="3" />
          <text x="150" y="375" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#047857">Demographic</text>
          <text x="150" y="390" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#047857">Parity</text>
          <text x="150" y="405" textAnchor="middle" fontSize="9" fill="#475569">Equal approval rates</text>

          {/* Bottom Right Node: Equalized Odds */}
          <circle cx="450" cy="380" r="45" fill="white" stroke="#8b5cf6" strokeWidth="3" />
          <text x="450" y="375" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#6d28d9">Equalized</text>
          <text x="450" y="390" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#6d28d9">Odds</text>
          <text x="450" y="405" textAnchor="middle" fontSize="9" fill="#475569">Equal error rates</text>

          {/* Connection Labels */}
          <rect x="180" y="200" width="80" height="24" rx="4" fill="white" stroke="#94a3b8" />
          <text x="220" y="216" textAnchor="middle" fontSize="10" fill="#334155">Trade-off A</text>

          <rect x="340" y="200" width="80" height="24" rx="4" fill="white" stroke="#94a3b8" />
          <text x="380" y="216" textAnchor="middle" fontSize="10" fill="#334155">Trade-off B</text>

          <rect x="260" y="368" width="80" height="24" rx="4" fill="white" stroke="#94a3b8" />
          <text x="300" y="384" textAnchor="middle" fontSize="10" fill="#334155">Trade-off C</text>
        </g>
      </svg>
    </div>
  );
}
