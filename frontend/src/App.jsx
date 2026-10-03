import React, { useState } from 'react';
import Header from './components/Header';
import ImageUploader from './components/ImageUploader';
import AnalysisResult from './components/AnalysisResult';
import ComplaintDraft from './components/ComplaintDraft';
import JsonInspector from './components/JsonInspector';
import { AlertCircle, RefreshCw, Sparkles, CheckCircle, ShieldAlert } from 'lucide-react';

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
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px 20px 60px' }}>
      <Header />

      <main style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px' }}>
        
        {/* Top Section: Upload & Hero Banner */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '24px', alignItems: 'start' }}>
          
          {/* Uploader Column */}
          <ImageUploader
            selectedImage={selectedImage}
            onSelectFile={handleSelectFile}
            onSelectSample={handleSelectSample}
            isLoading={isLoading}
            onAnalyze={handleAnalyze}
          />

          {/* Hero Feature Explainer Panel */}
          <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                background: 'rgba(56, 189, 248, 0.15)',
                padding: '8px',
                borderRadius: '10px',
                color: 'var(--accent-cyan)'
              }}>
                <Sparkles size={20} />
              </div>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 700 }}>How RoadLens & Gemma 4 Work</h2>
            </div>

            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
              RoadLens turns raw citizen photos into actionable municipal civic tickets in seconds using multimodal visual reasoning:
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <span className="badge" style={{ background: 'rgba(56, 189, 248, 0.2)', color: 'var(--accent-cyan)' }}>1</span>
                <div>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: 700 }}>Multimodal Visual Assessment</h4>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Gemma 4 examines road surface erosion, curb edges, drainage overflow, or sign damage.</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <span className="badge" style={{ background: 'rgba(168, 85, 247, 0.2)', color: '#d8b4fe' }}>2</span>
                <div>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: 700 }}>Structured JSON Extraction</h4>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Returns validated JSON schema detailing issue severity, size hints, safety risk, and civic authority.</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <span className="badge" style={{ background: 'rgba(16, 185, 129, 0.2)', color: '#6ee7b7' }}>3</span>
                <div>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: 700 }}>Multilingual Complaint Generator</h4>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Generates formal complaint drafts in English, Telugu, or Hindi ready for GHMC submission.</p>
                </div>
              </div>
            </div>

            {/* Quick Demo Hint */}
            <div style={{
              background: 'rgba(15, 23, 42, 0.6)',
              padding: '12px 14px',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-muted)',
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
              <ShieldAlert size={22} />
              <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>{error}</span>
            </div>
            <button
              type="button"
              className="btn-secondary"
              onClick={handleAnalyze}
              style={{ fontSize: '0.8rem', padding: '6px 12px' }}
            >
              <RefreshCw size={14} /> Retry
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

      {/* Footer */}
      <footer style={{
        marginTop: '50px',
        textAlign: 'center',
        fontSize: '0.82rem',
        color: 'var(--text-dim)',
        borderTop: '1px solid var(--border-muted)',
        paddingTop: '20px'
      }}>
        <p>RoadLens AI &copy; {new Date().getFullYear()} — Built for Best Use of Gemma 4 Challenge</p>
      </footer>
    </div>
  );
}
