import React, { useState, useEffect } from 'react';
import { FileText, Copy, Check, Globe, Send, Edit3 } from 'lucide-react';
import DecodeText from './DecodeText';

export default function ComplaintDraft({ result }) {
  if (!result || !result.complaint_drafts) return null;

  const drafts = result.complaint_drafts;
  const [activeLang, setActiveLang] = useState('english');
  const [draftText, setDraftText] = useState(drafts.english || '');
  const [copied, setCopied] = useState(false);

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
          <h2 className="lbl" style={{ fontSize: '1.15rem', color: '#ffffff', letterSpacing: '0.12em', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FileText size={18} color="var(--accent-cyan)" />
            <DecodeText text="GENERATED CIVIC COMPLAINT DRAFT" />
          </h2>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            Gemma 4 auto-drafted complaint ready for municipal portal submission. Edit as needed.
          </p>
        </div>

        {/* Multilingual Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(10, 14, 18, 0.6)', padding: '4px', borderRadius: '8px', border: '1px solid var(--line)' }}>
          <Globe size={14} color="var(--text-dim)" style={{ marginLeft: '6px' }} />
          
          <button
            type="button"
            className={`pill-btn lbl ${activeLang === 'english' ? 'pill-cream' : ''}`}
            onClick={() => setActiveLang('english')}
            style={{ height: '30px', padding: '0 10px', fontSize: '10px' }}
          >
            <DecodeText text="ENGLISH" />
          </button>
          
          <button
            type="button"
            className={`pill-btn lbl ${activeLang === 'telugu' ? 'pill-cream' : ''}`}
            onClick={() => setActiveLang('telugu')}
            style={{ height: '30px', padding: '0 10px', fontSize: '10px' }}
          >
            <DecodeText text="TELUGU" />
          </button>

          <button
            type="button"
            className={`pill-btn lbl ${activeLang === 'hindi' ? 'pill-cream' : ''}`}
            onClick={() => setActiveLang('hindi')}
            style={{ height: '30px', padding: '0 10px', fontSize: '10px' }}
          >
            <DecodeText text="HINDI" />
          </button>
        </div>
      </div>

      {/* Editable Textarea */}
      <div style={{ position: 'relative' }}>
        <textarea
          value={draftText}
          onChange={(e) => setDraftText(e.target.value)}
          rows={7}
          style={{
            width: '100%',
            background: 'rgba(10, 14, 18, 0.85)',
            border: '1px solid var(--line)',
            borderRadius: '8px',
            padding: '16px',
            color: '#ffffff',
            fontFamily: 'inherit',
            fontSize: '0.9rem',
            lineHeight: '1.6',
            resize: 'vertical',
            outline: 'none',
            boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.5)'
          }}
        />
        <div className="lbl" style={{ position: 'absolute', right: '12px', bottom: '16px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '10px', color: 'var(--text-dim)' }}>
          <Edit3 size={11} /> <DecodeText text="EDITABLE" />
        </div>
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span>TARGET AUTHORITY:</span>
          <strong style={{ color: 'var(--accent-cyan)' }}>{result.authority || 'GHMC Municipal Corporation'}</strong>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            type="button"
            className="pill-btn lbl"
            onClick={handleCopy}
            style={{ height: '38px', minWidth: '170px' }}
          >
            {copied ? (
              <>
                <Check size={14} color="var(--accent-emerald)" /> <DecodeText text="COPIED TO CLIPBOARD" />
              </>
            ) : (
              <>
                <Copy size={14} /> <DecodeText text="COPY COMPLAINT TEXT" />
              </>
            )}
          </button>

          <a
            href="https://www.ghmc.gov.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-cta lbl"
            style={{ height: '38px', fontSize: '11px' }}
          >
            <Send size={14} style={{ marginRight: '6px' }} /> <DecodeText text="SUBMIT TO PORTAL" />
          </a>
        </div>
      </div>

    </div>
  );
}
