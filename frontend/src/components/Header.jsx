import React, { useEffect, useState } from 'react';
import { Camera, ShieldAlert, Cpu, Sparkles, Activity } from 'lucide-react';

export default function Header() {
  const [backendStatus, setBackendStatus] = useState('checking');
  const [sdkInfo, setSdkInfo] = useState('Gemma 4');

  useEffect(() => {
    fetch('http://localhost:5000/api/health')
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 'online') {
          setBackendStatus('online');
          setSdkInfo(data.sdk || 'Gemma 4 Multimodal');
        } else {
          setBackendStatus('offline');
        }
      })
      .catch(() => setBackendStatus('offline'));
  }, []);

  return (
    <header className="glass-panel" style={{ padding: '16px 28px', marginBottom: '28px', borderRadius: 'var(--radius-lg)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        
        {/* Brand identity */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{
            background: 'linear-gradient(135deg, #0284c7 0%, #a855f7 100%)',
            width: '46px',
            height: '46px',
            borderRadius: '14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 20px rgba(56, 189, 248, 0.4)'
          }}>
            <Camera size={26} color="#ffffff" />
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <h1 style={{ fontSize: '1.6rem', fontWeight: 800, background: 'linear-gradient(90deg, #ffffff, #7dd3fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                RoadLens AI
              </h1>
              <span className="badge" style={{ background: 'rgba(168, 85, 247, 0.2)', color: '#d8b4fe', border: '1px solid rgba(168, 85, 247, 0.4)' }}>
                <Sparkles size={12} /> Gemma 4 Vision
              </span>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Multimodal Civic Road Hazard Inspection & Instant Complaint Generator
            </p>
          </div>
        </div>

        {/* Backend & Gemma Engine status */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 14px',
            background: 'rgba(15, 23, 42, 0.6)',
            borderRadius: 'var(--radius-full)',
            border: '1px solid var(--border-muted)',
            fontSize: '0.82rem'
          }}>
            <Cpu size={15} color="var(--accent-cyan)" />
            <span style={{ color: 'var(--text-muted)' }}>Engine:</span>
            <span style={{ fontWeight: 600, color: 'var(--accent-cyan)' }}>{sdkInfo}</span>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 14px',
            background: backendStatus === 'online' ? 'rgba(16, 185, 129, 0.12)' : 'rgba(244, 63, 94, 0.12)',
            borderRadius: 'var(--radius-full)',
            border: `1px solid ${backendStatus === 'online' ? 'rgba(16, 185, 129, 0.3)' : 'rgba(244, 63, 94, 0.3)'}`,
            fontSize: '0.82rem'
          }}>
            <Activity size={15} color={backendStatus === 'online' ? 'var(--accent-emerald)' : 'var(--accent-rose)'} />
            <span style={{ color: backendStatus === 'online' ? '#6ee7b7' : '#fda4af', fontWeight: 600 }}>
              {backendStatus === 'online' ? 'Backend Live' : 'Backend Connecting...'}
            </span>
          </div>
        </div>

      </div>
    </header>
  );
}
