import React from 'react';
import { AlertTriangle, CheckCircle, MapPin, Gauge, Shield, Wrench, Building2, Tag } from 'lucide-react';
import DecodeText from './DecodeText';

export default function AnalysisResult({ result }) {
  if (!result) return null;

  const isRoadIssue = result.is_road_issue !== false;

  const getSeverityBadge = (severity) => {
    const sev = (severity || 'Medium').toLowerCase();
    if (sev === 'critical') return <span className="badge-pill badge-critical"><DecodeText text="CRITICAL HAZARD" /></span>;
    if (sev === 'high') return <span className="badge-pill badge-high"><DecodeText text="HIGH PRIORITY" /></span>;
    if (sev === 'medium') return <span className="badge-pill badge-medium"><DecodeText text="MEDIUM SEVERITY" /></span>;
    return <span className="badge-pill badge-low"><DecodeText text="LOW HAZARD" /></span>;
  };

  const confidencePct = Math.round((result.confidence || 0.95) * 100);

  return (
    <div className="glass-panel glass-panel-glow" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Header & Badges */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {isRoadIssue ? (
            <AlertTriangle size={24} color="var(--accent-amber)" />
          ) : (
            <CheckCircle size={24} color="var(--accent-emerald)" />
          )}
          <div>
            <h2 className="lbl" style={{ fontSize: '1.25rem', color: '#ffffff', letterSpacing: '0.1em' }}>
              <DecodeText text={(result.issue_type || 'ROAD ISSUE DETECTED').toUpperCase()} />
            </h2>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              ENGINE: {result.engine || 'Gemma 4 Multimodal'}
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {getSeverityBadge(result.severity)}

          <div className="pill-btn lbl" style={{ height: '32px', padding: '0 12px', fontSize: '10px', cursor: 'default' }}>
            <Gauge size={13} color="var(--accent-cyan)" />
            <span style={{ color: 'var(--text-dim)' }}>CONFIDENCE:</span>
            <span style={{ color: 'var(--accent-cyan)' }}>{confidencePct}%</span>
          </div>
        </div>
      </div>

      {/* Summary Box */}
      <div style={{
        background: 'rgba(10, 14, 18, 0.75)',
        padding: '16px',
        borderLeft: `4px solid ${isRoadIssue ? 'var(--accent-amber)' : 'var(--accent-emerald)'}`,
        borderTop: '1px solid var(--line)',
        borderRight: '1px solid var(--line)',
        borderBottom: '1px solid var(--line)',
        borderRadius: '8px'
      }}>
        <p style={{ fontSize: '0.94rem', color: '#ffffff', lineHeight: 1.6, fontWeight: 400 }}>
          {result.summary}
        </p>
      </div>

      {/* Details Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        
        {/* Location Hints */}
        <div style={{ background: 'rgba(10, 14, 18, 0.4)', padding: '14px', borderRadius: '8px', border: '1px solid var(--line)' }}>
          <div className="lbl" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-cyan)', marginBottom: '6px', fontSize: '10px' }}>
            <MapPin size={14} />
            <DecodeText text="LOCATION HINTS" />
          </div>
          <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)' }}>
            {result.location_hints || 'Urban road surface near pavement curb'}
          </p>
        </div>

        {/* Estimated Dimensions */}
        <div style={{ background: 'rgba(10, 14, 18, 0.4)', padding: '14px', borderRadius: '8px', border: '1px solid var(--line)' }}>
          <div className="lbl" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-indigo)', marginBottom: '6px', fontSize: '10px' }}>
            <Shield size={14} />
            <DecodeText text="HAZARD SCALE" />
          </div>
          <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)' }}>
            {result.estimated_dimensions || 'Noticeable structural surface defect'}
          </p>
        </div>

        {/* Recommended Action */}
        <div style={{ background: 'rgba(10, 14, 18, 0.4)', padding: '14px', borderRadius: '8px', border: '1px solid var(--line)' }}>
          <div className="lbl" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-emerald)', marginBottom: '6px', fontSize: '10px' }}>
            <Wrench size={14} />
            <DecodeText text="ACTION REQUIRED" />
          </div>
          <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)' }}>
            {result.recommended_action || 'Inspect and execute asphalt surface patch repair'}
          </p>
        </div>

        {/* Responsible Authority */}
        <div style={{ background: 'rgba(10, 14, 18, 0.4)', padding: '14px', borderRadius: '8px', border: '1px solid var(--line)' }}>
          <div className="lbl" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--cream)', marginBottom: '6px', fontSize: '10px' }}>
            <Building2 size={14} />
            <DecodeText text="TARGET AUTHORITY" />
          </div>
          <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)' }}>
            {result.authority || 'Greater Hyderabad Municipal Corporation (GHMC)'}
          </p>
        </div>

      </div>

      {/* Tags */}
      {result.tags && result.tags.length > 0 && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginTop: '4px' }}>
          <Tag size={13} color="var(--text-dim)" />
          {result.tags.map((tag, idx) => (
            <span key={idx} className="lbl" style={{
              background: 'rgba(255,255,255,0.05)',
              color: 'var(--text-muted)',
              padding: '4px 10px',
              borderRadius: '4px',
              fontSize: '10px',
              border: '1px solid rgba(255,255,255,0.08)'
            }}>
              #{tag.toUpperCase()}
            </span>
          ))}
        </div>
      )}

    </div>
  );
}
