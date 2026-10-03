import React, { useState } from 'react';
import Header from './components/Header';
import ImageUploader from './components/ImageUploader';
import AnalysisResult from './components/AnalysisResult';
import ComplaintDraft from './components/ComplaintDraft';
import JsonInspector from './components/JsonInspector';
import DecodeText from './components/DecodeText';
import { Sparkles, CheckCircle, ShieldAlert, RefreshCw, Volume2, ArrowDown, MessageSquare } from 'lucide-react';

export default function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // File upload handler
  const handleSelectFile = (file) => {
    setError(null);
    const previewUrl = URL.createObjectURL(file);
    setSelectedImage({
      type: 'file',
      file: file,
      name: file.name,
      previewUrl: previewUrl,
    });
  };

  // Sample preset handler
  const handleSelectSample = (sample) => {
    setError(null);
    setSelectedImage({
      type: 'sample',
      sampleId: sample.id,
      name: sample.label,
      previewUrl: sample.path,
    });
  };

  // Trigger analysis call to backend
  const handleAnalyze = async () => {
    if (!selectedImage) return;

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      let response;

      if (selectedImage.type === 'file') {
        const formData = new FormData();
        formData.append('file', selectedImage.file);

        response = await fetch('http://localhost:5000/api/analyze', {
          method: 'POST',
          body: formData,
        });
      } else {
        response = await fetch('http://localhost:5000/api/analyze', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sample: selectedImage.sampleId }),
        });
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Analysis failed. Please try again.');
      }

      setResult(data);
    } catch (err) {
      console.error('Analysis error:', err);
      setError(err.message || 'Failed to connect to backend server. Make sure app.py is running on port 5000.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="stage">
      
      {/* Monolithic Outer Frame Box */}
      <div className="frame-box">
        <span className="cn cn-tl" />
        <span className="cn cn-tr" />
        <span className="cn cn-bl" />
        <span className="cn cn-br" />

        <div style={{ padding: '24px', maxWidth: '1280px', margin: '0 auto' }}>
          
          <Header />

          <main style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px' }}>
            
            {/* Top Section: Upload & Explainer */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '24px', alignItems: 'start' }}>
              
              {/* Uploader Column */}
              <ImageUploader
                selectedImage={selectedImage}
                onSelectFile={handleSelectFile}
                onSelectSample={handleSelectSample}
                isLoading={isLoading}
                onAnalyze={handleAnalyze}
              />

              {/* Architectural Explainer Panel */}
              <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{
                    width: '36px',
                    height: '36px',
                    background: 'rgba(56, 189, 248, 0.12)',
                    border: '1px solid var(--line)',
                    clipPath: 'polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--accent-cyan)'
                  }}>
                    <Sparkles size={18} />
                  </div>
                  <h2 className="lbl" style={{ fontSize: '1.1rem', color: '#ffffff', letterSpacing: '0.12em' }}>
                    <DecodeText text="HOW ROADLENS & GEMMA 4 WORK" />
                  </h2>
                </div>

                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  RoadLens turns raw citizen photos into actionable municipal civic tickets in seconds using multimodal visual reasoning:
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <span className="badge-pill badge-medium">1</span>
                    <div>
                      <h4 className="lbl" style={{ fontSize: '0.85rem', color: '#ffffff' }}>
                        <DecodeText text="MULTIMODAL VISUAL ASSESSMENT" />
                      </h4>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        Gemma 4 examines road surface erosion, curb edges, drainage overflow, or sign damage.
                      </p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <span className="badge-pill badge-high">2</span>
                    <div>
                      <h4 className="lbl" style={{ fontSize: '0.85rem', color: '#ffffff' }}>
                        <DecodeText text="STRUCTURED JSON EXTRACTION" />
                      </h4>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        Returns validated JSON schema detailing issue severity, size hints, safety risk, and civic authority.
                      </p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <span className="badge-pill badge-low">3</span>
                    <div>
                      <h4 className="lbl" style={{ fontSize: '0.85rem', color: '#ffffff' }}>
                        <DecodeText text="MULTILINGUAL COMPLAINT GENERATOR" />
                      </h4>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        Generates formal complaint drafts in English, Telugu, or Hindi ready for GHMC submission.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Quick Hint */}
                <div style={{
                  background: 'rgba(10, 14, 18, 0.6)',
                  padding: '12px 14px',
                  borderRadius: '8px',
                  border: '1px solid var(--line)',
                  fontSize: '0.8rem',
                  color: 'var(--text-muted)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <CheckCircle size={16} color="var(--accent-emerald)" />
                  <span>Click any sample photo on the left to test instant visual analysis!</span>
                </div>
              </div>

            </div>

            {/* Error Banner */}
            {error && (
              <div className="glass-panel" style={{
                padding: '16px 20px',
                borderColor: 'rgba(244, 63, 94, 0.4)',
                background: 'rgba(244, 63, 94, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '12px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#fda4af' }}>
                  <ShieldAlert size={20} />
                  <span className="lbl" style={{ fontSize: '0.85rem' }}>{error}</span>
                </div>
                <button
                  type="button"
                  className="pill-btn lbl"
                  onClick={handleAnalyze}
                  style={{ height: '32px', fontSize: '10px' }}
                >
                  <RefreshCw size={13} /> <DecodeText text="RETRY" />
                </button>
              </div>
            )}

            {/* Results & Complaint Draft Section */}
            {result && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <AnalysisResult result={result} />
                <ComplaintDraft result={result} />
                <JsonInspector result={result} />
              </div>
            )}

          </main>

        </div>

        {/* Stratum Architectural Dock Bar */}
        <div className="dock-bar lbl">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)' }}>
            <Volume2 size={14} color="var(--accent-cyan)" />
            <DecodeText text="AUDIO ON" />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-dim)' }}>
            <ArrowDown size={14} />
            <DecodeText text="SCROLL TO INSPECT HAZARDS" />
          </div>

          <a href="https://github.com/shaikhadnan0123/roadlens-gemma" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', textDecoration: 'none' }}>
            <DecodeText text="TALK WITH US" />
            <MessageSquare size={14} color="var(--cream)" />
          </a>
        </div>

      </div>

    </div>
  );
}
