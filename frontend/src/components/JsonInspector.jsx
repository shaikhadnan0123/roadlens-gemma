import React, { useState } from 'react';
import { Code, ChevronDown, ChevronUp, Copy, Check } from 'lucide-react';
import DecodeText from './DecodeText';

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
    <div className="glass-panel" style={{ padding: '16px 20px', borderRadius: '12px' }}>
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Code size={16} color="var(--accent-cyan)" />
          <span className="lbl" style={{ fontSize: '0.92rem', color: '#ffffff', letterSpacing: '0.12em' }}>
            <DecodeText text="GEMMA 4 STRUCTURED JSON OUTPUT" />
          </span>
          <span className="badge-pill badge-medium">
            VALIDATED SCHEMA
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            type="button"
            className="pill-btn lbl"
            onClick={(e) => {
              e.stopPropagation();
              handleCopyJson();
            }}
            style={{ height: '30px', padding: '0 10px', fontSize: '10px' }}
          >
            {copied ? <Check size={12} color="var(--accent-emerald)" /> : <Copy size={12} />}
            <DecodeText text={copied ? 'COPIED' : 'COPY JSON'} />
          </button>
          {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>
      </div>

      {isOpen && (
        <pre style={{
          marginTop: '14px',
          padding: '16px',
          background: '#04070d',
          borderRadius: '8px',
          border: '1px solid var(--line)',
          color: 'var(--accent-cyan)',
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
