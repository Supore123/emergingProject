import React from 'react';

export default function HGTArchitecture() {
  return (
    <div style={{ background: '#f8fafc', padding: '2rem', borderRadius: '8px', border: '1px solid #e2e8f0', margin: '2rem 0', fontFamily: 'system-ui, sans-serif' }}>
      <svg viewBox="0 0 800 400" width="100%" height="100%">
        {/* Defs for arrowheads and gradients */}
        <defs>
          <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#64748b" />
          </marker>
        </defs>

        {/* Title */}
        <text x="400" y="30" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#0f172a">Heterogeneous Graph Transformer (HGT) Message Passing</text>

        {/* Source Nodes (Left) */}
        <g transform="translate(100, 100)">
          <circle cx="0" cy="0" r="30" fill="#bae6fd" stroke="#0284c7" strokeWidth="2" />
          <text x="0" y="5" textAnchor="middle" fontSize="12" fill="#0369a1" fontWeight="bold">Account</text>
          
          <circle cx="0" cy="100" r="30" fill="#d9f99d" stroke="#65a30d" strokeWidth="2" />
          <text x="0" y="105" textAnchor="middle" fontSize="12" fill="#4d7c0f" fontWeight="bold">Device</text>
          
          <circle cx="0" cy="200" r="30" fill="#fecaca" stroke="#dc2626" strokeWidth="2" />
          <text x="0" y="205" textAnchor="middle" fontSize="12" fill="#b91c1c" fontWeight="bold">Merchant</text>
        </g>

        {/* Type-Specific Projection Box (Middle) */}
        <rect x="250" y="80" width="200" height="240" rx="8" fill="white" stroke="#cbd5e1" strokeDasharray="4" />
        <text x="350" y="110" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#334155">Type-Specific Projection</text>
        
        {/* Edges from source to projection */}
        <path d="M 130 100 L 250 140" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)" />
        <text x="180" y="110" fontSize="10" fill="#64748b" transform="rotate(15, 180, 110)">Transferred-to</text>
        
        <path d="M 130 200 L 250 200" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)" />
        <text x="180" y="195" fontSize="10" fill="#64748b">Shared-IP</text>

        <path d="M 130 300 L 250 260" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)" />
        <text x="180" y="295" fontSize="10" fill="#64748b" transform="rotate(-15, 180, 295)">Paid-Invoice</text>

        {/* Internal Projection Matrices */}
        <rect x="280" y="130" width="140" height="40" rx="4" fill="#f1f5f9" stroke="#94a3b8" />
        <text x="350" y="155" textAnchor="middle" fontSize="12" fill="#475569">K(Account) × V(Account)</text>

        <rect x="280" y="180" width="140" height="40" rx="4" fill="#f1f5f9" stroke="#94a3b8" />
        <text x="350" y="205" textAnchor="middle" fontSize="12" fill="#475569">K(Device) × V(Device)</text>

        <rect x="280" y="230" width="140" height="40" rx="4" fill="#f1f5f9" stroke="#94a3b8" />
        <text x="350" y="255" textAnchor="middle" fontSize="12" fill="#475569">K(Merchant) × V(Merchant)</text>

        {/* Target Node (Right) */}
        <path d="M 450 200 L 600 200" stroke="#0ea5e9" strokeWidth="3" markerEnd="url(#arrow)" />
        <text x="525" y="190" textAnchor="middle" fontSize="12" fill="#0284c7" fontWeight="bold">Attention Aggregation</text>

        <circle cx="640" cy="200" r="40" fill="#bae6fd" stroke="#0284c7" strokeWidth="3" />
        <text x="640" y="195" textAnchor="middle" fontSize="14" fill="#0369a1" fontWeight="bold">Target</text>
        <text x="640" y="215" textAnchor="middle" fontSize="12" fill="#0369a1">Account</text>
      </svg>
    </div>
  );
}
