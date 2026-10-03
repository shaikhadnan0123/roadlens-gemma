import React, { useState } from 'react';
import { Code, ChevronDown, ChevronUp, Copy, Check } from 'lucide-react';

export default function JsonInspector({ result }) {
  if (!result) return null;

  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const jsonString = JSON.stringify(result, null, 2);

  const handleCopyJson = () => {
    navigator.clipboard.writeText(jsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="glass-panel" style={{ padding: '16px 20px', borderRadius: 'var(--radius-md)' }}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: 'pointer',
          userSelect: 'none'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Code size={18} color="var(--accent-cyan)" />
          <span style={{ fontWeight: 700, fontSize: '0.92rem' }}>Gemma 4 Structured JSON Output</span>
          <span className="badge" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#6ee7b7' }}>
            Validated Schema
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            type="button"
            className="btn-secondary"
            onClick={(e) => {
              e.stopPropagation();
              handleCopyJson();
            }}
            style={{ padding: '4px 10px', fontSize: '0.75rem' }}
          >
            {copied ? <Check size={12} color="var(--accent-emerald)" /> : <Copy size={12} />}
            {copied ? 'Copied' : 'Copy JSON'}
          </button>
          {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>
      </div>

      {isOpen && (
        <pre style={{
          marginTop: '14px',
          padding: '16px',
          background: '#040711',
          borderRadius: 'var(--radius-sm)',
          border: '1px solid var(--border-muted)',
          color: '#38bdf8',
          fontSize: '0.82rem',
          fontFamily: 'Consolas, Monaco, monospace',
          overflowX: 'auto',
          maxHeight: '340px'
        }}>
          {jsonString}
        </pre>
      )}
    </div>
  );
}
