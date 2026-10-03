import React, { useRef } from 'react';
import { Upload, Image as ImageIcon, Zap, CheckCircle2 } from 'lucide-react';
import DecodeText from './DecodeText';

const SAMPLES = [
  { id: 'pothole.jpg', label: 'DEEP POTHOLE', category: 'ASPHALT HAZARD', path: '/sample_images/pothole.jpg' },
  { id: 'waterlogging.jpg', label: 'WATERLOGGING', category: 'DRAINAGE DEFECT', path: '/sample_images/waterlogging.jpg' },
  { id: 'broken_sign.jpg', label: 'BROKEN SIGN', category: 'TRAFFIC SIGNAGE', path: '/sample_images/broken_sign.jpg' },
];

export default function ImageUploader({ selectedImage, onSelectFile, onSelectSample, isLoading, onAnalyze }) {
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onSelectFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      onSelectFile(e.target.files[0]);
    }
  };

  return (
    <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h2 className="lbl" style={{ fontSize: '1.1rem', color: '#ffffff', letterSpacing: '0.12em' }}>
            <DecodeText text="1. UPLOAD ROAD HAZARD PHOTO" />
          </h2>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            Provide an image of asphalt defects, waterlogging, or broken public signage
          </p>
        </div>
        <span className="badge-pill badge-medium">
          MAX 10MB JPG/PNG
        </span>
      </div>

      {/* Drag & Drop Box */}
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        style={{
          position: 'relative',
          border: selectedImage ? '1px solid var(--accent-cyan)' : '1px dashed rgba(255, 255, 255, 0.18)',
          borderRadius: '12px',
          padding: selectedImage ? '16px' : '36px 20px',
          textAlign: 'center',
          cursor: 'pointer',
          background: selectedImage ? 'rgba(10, 14, 18, 0.9)' : 'rgba(10, 14, 18, 0.4)',
          transition: 'all 0.25s var(--e-soft)',
          minHeight: '220px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden'
        }}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          style={{ display: 'none' }}
        />

        {isLoading && <div className="scanning-laser" />}

        {selectedImage ? (
          <div style={{ position: 'relative', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
            <img
              src={selectedImage.previewUrl}
              alt="Road Inspection Preview"
              style={{
                maxHeight: '260px',
                maxWidth: '100%',
                objectFit: 'contain',
                borderRadius: '8px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.6)'
              }}
            />
            <div className="lbl" style={{ fontSize: '0.78rem', color: 'var(--accent-cyan)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircle2 size={14} /> SELECTED: {selectedImage.name.toUpperCase()}
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '52px',
              height: '52px',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid var(--line)',
              clipPath: 'polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--accent-cyan)'
            }}>
              <Upload size={24} />
            </div>
            <div>
              <p className="lbl" style={{ fontSize: '0.9rem', color: '#ffffff' }}>
                <DecodeText text="DRAG AND DROP ROAD PHOTO HERE" />
              </p>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                or click to browse local files
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Quick Select Demo Samples */}
      <div>
        <p className="lbl" style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginBottom: '10px' }}>
          OR QUICK-TEST WITH SAMPLE DEMO PHOTOS:
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '10px' }}>
          {SAMPLES.map((sample) => (
            <button
              key={sample.id}
              type="button"
              className={`pill-btn ${selectedImage?.sampleId === sample.id ? 'pill-cream' : ''}`}
              onClick={() => onSelectSample(sample)}
              style={{
                height: 'auto',
                padding: '10px 12px',
                flexDirection: 'column',
                alignItems: 'flex-start',
                textAlign: 'left'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', width: '100%' }}>
                <ImageIcon size={14} color={selectedImage?.sampleId === sample.id ? 'var(--ink)' : 'var(--accent-cyan)'} />
                <span className="lbl" style={{ fontSize: '0.78rem' }}>
                  <DecodeText text={sample.label} />
                </span>
              </div>
              <span style={{ fontSize: '0.7rem', opacity: 0.7, marginTop: '4px' }}>
                {sample.category}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Analyze Trigger Button */}
      <button
        type="button"
        className="btn-cta lbl"
        disabled={!selectedImage || isLoading}
        onClick={onAnalyze}
        style={{ width: '100%', marginTop: '6px' }}
      >
        {isLoading ? (
          <>
            <div style={{
              width: '16px',
              height: '16px',
              border: '2px solid rgba(255,255,255,0.3)',
              borderTopColor: '#fff',
              borderRadius: '50%',
              animation: 'spin 0.8s linear infinite',
              marginRight: '8px'
            }} />
            <DecodeText text="ANALYZING WITH GEMMA 4..." />
          </>
        ) : (
          <>
            <Zap size={16} style={{ marginRight: '8px' }} color="var(--accent-cyan)" />
            <DecodeText text="RUN GEMMA 4 INSPECTION" />
          </>
        )}
      </button>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
