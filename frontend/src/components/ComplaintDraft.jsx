import React, { useState, useEffect } from 'react';
import { FileText, Copy, Check, Globe, Send, Edit3 } from 'lucide-react';

export default function ComplaintDraft({ result }) {
  if (!result || !result.complaint_drafts) return null;

  const drafts = result.complaint_drafts;
  const [activeLang, setActiveLang] = useState('english');
  const [draftText, setDraftText] = useState(drafts.english || '');
  const [copied, setCopied] = useState(false);

  // Update text when language or result changes
  useEffect(() => {
    setDraftText(drafts[activeLang] || drafts.english || '');
  }, [activeLang, result]);

  const handleCopy = () => {
    navigator.clipboard.writeText(draftText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
      
      {/* Header & Language Switcher */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FileText size={20} color="var(--accent-cyan)" />
            Generated Civic Complaint Draft
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Gemma 4 auto-drafted complaint ready for municipal portal submission. Edit as needed.
          </p>
        </div>

        {/* Multilingual Toggle (English, Telugu, Hindi) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(15, 23, 42, 0.7)', padding: '4px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-muted)' }}>
          <Globe size={14} color="var(--text-muted)" style={{ marginLeft: '6px' }} />
          
          <button
            type="button"
            className={`btn-secondary ${activeLang === 'english' ? 'active' : ''}`}
            onClick={() => setActiveLang('english')}
            style={{ padding: '4px 12px', fontSize: '0.8rem', borderRadius: 'var(--radius-sm)' }}
          >
            English
          </button>
          
          <button
            type="button"
            className={`btn-secondary ${activeLang === 'telugu' ? 'active' : ''}`}
            onClick={() => setActiveLang('telugu')}
            style={{ padding: '4px 12px', fontSize: '0.8rem', borderRadius: 'var(--radius-sm)' }}
          >
            తెలుగు (Telugu)
          </button>

          <button
            type="button"
            className={`btn-secondary ${activeLang === 'hindi' ? 'active' : ''}`}
            onClick={() => setActiveLang('hindi')}
            style={{ padding: '4px 12px', fontSize: '0.8rem', borderRadius: 'var(--radius-sm)' }}
          >
            हिंदी (Hindi)
          </button>
        </div>
      </div>

      {/* Editable Complaint Area */}
      <div style={{ position: 'relative' }}>
        <textarea
          value={draftText}
          onChange={(e) => setDraftText(e.target.value)}
          rows={7}
          style={{
            width: '100%',
            background: 'rgba(15, 23, 42, 0.8)',
            border: '1px solid var(--border-muted)',
            borderRadius: 'var(--radius-md)',
            padding: '16px',
            color: '#f8fafc',
            fontFamily: 'inherit',
            fontSize: '0.9rem',
            lineHeight: '1.6',
            resize: 'vertical',
            outline: 'none',
            boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.4)'
          }}
        />
        <div style={{ position: 'absolute', right: '12px', bottom: '16px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: 'var(--text-dim)' }}>
          <Edit3 size={12} /> Editable
        </div>
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span>Authority Target:</span>
          <strong style={{ color: 'var(--accent-cyan)' }}>{result.authority || 'GHMC Municipal Corporation'}</strong>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            type="button"
            className="btn-secondary"
            onClick={handleCopy}
            style={{ minWidth: '150px' }}
          >
            {copied ? (
              <>
                <Check size={16} color="var(--accent-emerald)" /> Copied to Clipboard!
              </>
            ) : (
              <>
                <Copy size={16} /> Copy Complaint Text
              </>
            )}
          </button>

          <a
            href="https://www.ghmc.gov.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            style={{ textDecoration: 'none', padding: '10px 18px', fontSize: '0.88rem' }}
          >
            <Send size={15} /> Submit to Portal
          </a>
        </div>
      </div>

    </div>
  );
}
