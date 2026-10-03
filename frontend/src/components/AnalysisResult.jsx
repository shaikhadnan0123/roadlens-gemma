import React from 'react';
import { AlertTriangle, CheckCircle, MapPin, Gauge, Shield, Wrench, Building2, Tag } from 'lucide-react';

export default function AnalysisResult({ result }) {
  if (!result) return null;

  const isRoadIssue = result.is_road_issue !== false;

  const getSeverityBadge = (severity) => {
    const sev = (severity || 'Medium').toLowerCase();
    if (sev === 'critical') return <span className="badge badge-critical">Critical Hazard</span>;
    if (sev === 'high') return <span className="badge badge-high">High Priority</span>;
    if (sev === 'medium') return <span className="badge badge-medium">Medium Severity</span>;
    return <span className="badge badge-low">Low Hazard</span>;
  };

  const confidencePct = Math.round((result.confidence || 0.95) * 100);

  return (
    <div className="glass-panel glass-panel-glow" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Header & Badges */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {isRoadIssue ? (
            <AlertTriangle size={24} color="var(--accent-amber)" />
          ) : (
            <CheckCircle size={24} color="var(--accent-emerald)" />
          )}
          <div>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 800 }}>
              {result.issue_type || 'Road Issue Detected'}
            </h2>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              Processed by: {result.engine || 'Gemma 4 Multimodal'}
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {getSeverityBadge(result.severity)}

          {/* Confidence Meter */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '4px 12px',
            background: 'rgba(15, 23, 42, 0.7)',
            borderRadius: 'var(--radius-full)',
            border: '1px solid var(--border-muted)',
            fontSize: '0.8rem'
          }}>
            <Gauge size={14} color="var(--accent-cyan)" />
            <span style={{ color: 'var(--text-muted)' }}>Confidence:</span>
            <span style={{ fontWeight: 700, color: 'var(--accent-cyan)' }}>{confidencePct}%</span>
          </div>
        </div>
      </div>

      {/* Summary Box */}
      <div style={{
        background: 'rgba(15, 23, 42, 0.6)',
        padding: '16px',
        borderRadius: 'var(--radius-md)',
        borderLeft: `4px solid ${isRoadIssue ? 'var(--accent-amber)' : 'var(--accent-emerald)'}`
      }}>
        <p style={{ fontSize: '0.94rem', color: '#f1f5f9', fontWeight: 500 }}>
          {result.summary}
        </p>
      </div>

      {/* Details Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        
        {/* Location Hints */}
        <div style={{ background: 'rgba(15, 23, 42, 0.4)', padding: '14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-muted)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-cyan)', marginBottom: '6px' }}>
            <MapPin size={16} />
            <span style={{ fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase' }}>Location Hints</span>
          </div>
          <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)' }}>
            {result.location_hints || 'Urban road surface near pavement curb'}
          </p>
        </div>

        {/* Estimated Dimensions */}
        <div style={{ background: 'rgba(15, 23, 42, 0.4)', padding: '14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-muted)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-indigo)', marginBottom: '6px' }}>
            <Shield size={16} />
            <span style={{ fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase' }}>Hazard Scale</span>
          </div>
          <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)' }}>
            {result.estimated_dimensions || 'Noticeable structural surface defect'}
          </p>
        </div>

        {/* Recommended Action */}
        <div style={{ background: 'rgba(15, 23, 42, 0.4)', padding: '14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-muted)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-emerald)', marginBottom: '6px' }}>
            <Wrench size={16} />
            <span style={{ fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase' }}>Action Required</span>
          </div>
          <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)' }}>
            {result.recommended_action || 'Inspect and execute asphalt surface patch repair'}
          </p>
        </div>

        {/* Responsible Authority */}
        <div style={{ background: 'rgba(15, 23, 42, 0.4)', padding: '14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-muted)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-purple)', marginBottom: '6px' }}>
            <Building2 size={16} />
            <span style={{ fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase' }}>Target Authority</span>
          </div>
          <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)' }}>
            {result.authority || 'Greater Hyderabad Municipal Corporation (GHMC)'}
          </p>
        </div>

      </div>

      {/* Tags */}
      {result.tags && result.tags.length > 0 && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginTop: '4px' }}>
          <Tag size={14} color="var(--text-dim)" />
          {result.tags.map((tag, idx) => (
            <span key={idx} style={{
              background: 'rgba(255,255,255,0.05)',
              color: 'var(--text-muted)',
              padding: '3px 10px',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.75rem'
            }}>
              #{tag}
            </span>
          ))}
        </div>
      )}

    </div>
  );
}
