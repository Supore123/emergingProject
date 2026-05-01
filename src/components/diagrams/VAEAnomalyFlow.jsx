import React from 'react';

export default function VAEAnomalyFlow() {
  return (
    <div style={{ background: '#f8fafc', padding: '2rem', borderRadius: '8px', border: '1px solid #e2e8f0', margin: '2rem 0', fontFamily: 'system-ui, sans-serif' }}>
      <svg viewBox="0 0 800 450" width="100%" height="100%">
        <text x="400" y="30" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#0f172a">VAE Reconstruction Error: Market Spoofing Detection</text>
        
        {/* Model Pipeline (Top) */}
        <g transform="translate(100, 60)">
          {/* Encoder */}
          <polygon points="0,0 120,40 120,80 0,120" fill="#e2e8f0" stroke="#64748b" strokeWidth="2" />
          <text x="40" y="65" fontSize="14" fontWeight="bold" fill="#334155">Encoder</text>
          
          {/* Latent Space */}
          <rect x="150" y="40" width="60" height="40" rx="4" fill="#c7d2fe" stroke="#4f46e5" strokeWidth="2" />
          <text x="180" y="65" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#3730a3">Latent Z</text>

          {/* Decoder */}
          <polygon points="240,40 360,0 360,120 240,80" fill="#e2e8f0" stroke="#64748b" strokeWidth="2" />
          <text x="320" y="65" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#334155">Decoder</text>

          <path d="M 120 60 L 150 60" stroke="#64748b" strokeWidth="2" />
          <path d="M 210 60 L 240 60" stroke="#64748b" strokeWidth="2" />
          
          <text x="-40" y="65" fontSize="12" fill="#475569">Order Book Window</text>
          <text x="400" y="65" fontSize="12" fill="#475569">Reconstruction x̂</text>
          <path d="M -80 60 L -10 60" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)" />
          <path d="M 370 60 L 440 60" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)" />
        </g>

        {/* Time Series Chart (Bottom) */}
        <g transform="translate(100, 250)">
          {/* Axes */}
          <line x1="0" y1="150" x2="600" y2="150" stroke="#94a3b8" strokeWidth="2" />
          <line x1="0" y1="150" x2="0" y2="0" stroke="#94a3b8" strokeWidth="2" />
          
          <text x="-10" y="75" textAnchor="end" fontSize="12" fill="#64748b" transform="rotate(-90, -10, 75)">Reconstruction Error (Anomaly Score)</text>
          <text x="300" y="170" textAnchor="middle" fontSize="12" fill="#64748b">Time (Microseconds)</text>

          {/* Threshold Line */}
          <line x1="0" y1="40" x2="600" y2="40" stroke="#ef4444" strokeWidth="2" strokeDasharray="6" />
          <text x="610" y="44" fontSize="12" fill="#ef4444" fontWeight="bold">Alert Threshold</text>

          {/* Data Line (Normal -> Spike -> Normal) */}
          <path d="M 0 130 Q 50 140 100 120 T 200 135 T 300 20 Q 320 10 340 130 T 450 125 T 600 135" fill="none" stroke="#2563eb" strokeWidth="3" />
          
          {/* Highlight Area */}
          <rect x="280" y="0" width="60" height="150" fill="#fee2e2" opacity="0.4" />
          <text x="310" y="-10" textAnchor="middle" fontSize="12" fill="#b91c1c" fontWeight="bold">Spoofing Pattern Detected</text>
        </g>
      </svg>
    </div>
  );
}
