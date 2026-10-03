import React, { useEffect, useState } from 'react';
import { Camera, Cpu, Activity, Sparkles } from 'lucide-react';
import DecodeText from './DecodeText';

export default function Header() {
  const [backendStatus, setBackendStatus] = useState('checking');
  const [sdkInfo, setSdkInfo] = useState('GEMMA 4 VISION');

  useEffect(() => {
    fetch('http://localhost:5000/api/health')
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 'online') {
          setBackendStatus('online');
          setSdkInfo((data.sdk || 'GEMMA 4 VISION').toUpperCase());
        } else {
          setBackendStatus('offline');
        }
      })
      .catch(() => setBackendStatus('offline'));
  }, []);

  return (
    <header className="glass-panel" style={{ padding: '16px 28px', marginBottom: '24px', position: 'relative' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        
        {/* Brand identity */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{
            width: '42px',
            height: '42px',
            background: 'var(--cream)',
            clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--ink)'
          }}>
            <Camera size={22} />
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <h1 className="lbl" style={{ fontSize: '1.4rem', color: '#ffffff', letterSpacing: '0.15em' }}>
                <DecodeText text="ROADLENS AI" />
              </h1>
              <span className="badge-pill badge-medium">
                <Sparkles size={11} /> GEMMA 4 VISION
              </span>
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '2px' }}>
              Multimodal Civic Road Hazard Inspection & Instant Complaint Generator
            </p>
          </div>
        </div>

        {/* Status Pills */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div className="pill-btn lbl" style={{ cursor: 'default' }}>
            <Cpu size={14} color="var(--accent-cyan)" />
            <span style={{ color: 'var(--text-dim)' }}>ENGINE:</span>
            <span style={{ color: 'var(--accent-cyan)' }}><DecodeText text={sdkInfo} /></span>
          </div>

          <div className="pill-btn lbl" style={{
            cursor: 'default',
            borderColor: backendStatus === 'online' ? 'rgba(16, 185, 129, 0.35)' : 'rgba(244, 63, 94, 0.35)',
            background: backendStatus === 'online' ? 'rgba(16, 185, 129, 0.08)' : 'rgba(244, 63, 94, 0.08)'
          }}>
            <Activity size={14} color={backendStatus === 'online' ? 'var(--accent-emerald)' : 'var(--accent-rose)'} />
            <span style={{ color: backendStatus === 'online' ? '#6ee7b7' : '#fda4af' }}>
              <DecodeText text={backendStatus === 'online' ? 'BACKEND LIVE' : 'CONNECTING...'} />
            </span>
          </div>
        </div>

      </div>
    </header>
  );
}
