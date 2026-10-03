import React, { useRef } from 'react';
import { Upload, Image as ImageIcon, Zap, AlertCircle, CheckCircle2 } from 'lucide-react';

const SAMPLES = [
  { id: 'pothole.jpg', label: 'Deep Pothole', category: 'Asphalt Hazard', path: '/sample_images/pothole.jpg' },
  { id: 'waterlogging.jpg', label: 'Waterlogging', category: 'Drainage Defect', path: '/sample_images/waterlogging.jpg' },
  { id: 'broken_sign.jpg', label: 'Broken Sign', category: 'Traffic Signage', path: '/sample_images/broken_sign.jpg' },
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
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>1. Upload Road Hazard Photo</h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Provide an image of asphalt defects, waterlogging, or broken public signage
          </p>
        </div>
        <span className="badge" style={{ background: 'rgba(56, 189, 248, 0.1)', color: 'var(--accent-cyan)' }}>
          Max 10MB JPG/PNG
        </span>
      </div>

      {/* Drag & Drop Box */}
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        style={{
          position: 'relative',
          border: selectedImage ? '2px solid var(--accent-cyan)' : '2px dashed rgba(255, 255, 255, 0.15)',
          borderRadius: 'var(--radius-md)',
          padding: selectedImage ? '16px' : '36px 20px',
          textAlign: 'center',
          cursor: 'pointer',
          background: selectedImage ? 'rgba(15, 23, 42, 0.9)' : 'rgba(15, 23, 42, 0.4)',
          transition: 'all 0.25s ease',
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

        {isLoading && <div className="scanning-overlay" />}

        {selectedImage ? (
          <div style={{ position: 'relative', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
            <img
              src={selectedImage.previewUrl}
              alt="Road Inspection Preview"
              style={{
                maxHeight: '260px',
                maxWidth: '100%',
                objectFit: 'contain',
                borderRadius: 'var(--radius-sm)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.5)'
              }}
            />
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--accent-cyan)' }}>
              <CheckCircle2 size={16} /> Selected: {selectedImage.name}
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '54px',
              height: '54px',
              borderRadius: '50%',
              background: 'rgba(56, 189, 248, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--accent-cyan)'
            }}>
              <Upload size={28} />
            </div>
            <div>
              <p style={{ fontWeight: 600, fontSize: '0.98rem', color: '#f8fafc' }}>
                Drag and drop road photo here
              </p>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                or click to browse local files
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Quick Select Demo Samples */}
      <div>
        <p style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '10px' }}>
          OR QUICK-TEST WITH SAMPLE DEMO PHOTOS:
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '10px' }}>
          {SAMPLES.map((sample) => (
            <button
              key={sample.id}
              type="button"
              className={`btn-secondary ${selectedImage?.sampleId === sample.id ? 'active' : ''}`}
              onClick={() => onSelectSample(sample)}
              style={{
                flexDirection: 'column',
                alignItems: 'flex-start',
                padding: '10px 12px',
                textAlign: 'left',
                height: '100%'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', width: '100%' }}>
                <ImageIcon size={14} color="var(--accent-cyan)" />
                <span style={{ fontWeight: 700, fontSize: '0.85rem' }}>{sample.label}</span>
              </div>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                {sample.category}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Analyze Trigger Button */}
      <button
        type="button"
        className="btn-primary"
        disabled={!selectedImage || isLoading}
        onClick={onAnalyze}
        style={{ width: '100%', marginTop: '6px', height: '48px' }}
      >
        {isLoading ? (
          <>
            <div style={{
              width: '18px',
              height: '18px',
              border: '2px solid rgba(255,255,255,0.3)',
              borderTopColor: '#fff',
              borderRadius: '50%',
              animation: 'spin 0.8s linear infinite'
            }} />
            Analyzing with Gemma 4...
          </>
        ) : (
          <>
            <Zap size={18} /> Run Gemma 4 Inspection
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
