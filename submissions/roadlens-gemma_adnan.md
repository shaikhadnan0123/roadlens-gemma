# Hackathon Submission: RoadLens AI (Best Open-Source AI Project Track)

**Project Name:** RoadLens AI  
**Track:** Best Open-Source AI Project  
**Author:** Adnan  
**Repository:** [https://github.com/shaikhadnan0123/roadlens-gemma](https://github.com/shaikhadnan0123/roadlens-gemma)  
**License:** MIT License (`LICENSE`)

---

## 1. Project Overview & Problem Statement

Civic road infrastructure hazards such as deep potholes, waterlogging, fallen traffic signs, and cracked pavements cause thousands of vehicle accidents, commuter delays, and severe damage daily. Traditional municipal complaint processes require citizens to manually fill out tedious web forms, guess civil engineering terminology, and write formal complaints in official municipal formats.

**RoadLens AI** solves this by providing a zero-friction multimodal visual inspection app:
1. Citizen takes or uploads a photo of any road defect.
2. An open-weight vision model (served locally via **Ollama** e.g., `llava`, `gemma3`, `qwen2.5-vl`) visually analyzes the photo.
3. RoadLens extracts structured JSON containing issue type, severity level (Critical, High, Medium, Low), location/curb hints, estimated dimensions, and recommended municipal repair actions.
4. Generates an instant formal complaint draft ready to copy or submit to civic authorities (e.g. Greater Hyderabad Municipal Corporation - GHMC), with a 1-click **English, Telugu (తెలుగు), and Hindi (हिंदी)** multilingual language toggle.

---

## 2. Open-Source AI Architecture & Demo Workflow

```
┌─────────────────────────────────────────────────────────┐
│              Browser Client (React + Vite)              │
│    - Drag-and-drop Photo Upload & Sample Presets        │
│    - Dynamic Scanning Overlay & Severity Badges         │
│    - Multilingual Complaint Generator (EN / TE / HI)    │
│    - JSON Schema Output Inspector                        │
└───────────────────────────┬─────────────────────────────┘
                            │ HTTP POST /api/analyze
                            ▼
┌─────────────────────────────────────────────────────────┐
│               Python Flask API (app.py)                 │
│    - Multimodal Image Parsing & Base64 Payload          │
│    - Strict JSON Schema System Prompt Instructions       │
│    - Error-tolerant Multilevel AI Pipeline Engine       │
└───────────────────────────┬─────────────────────────────┘
                            │
            ┌───────────────┴───────────────┐
            ▼                               ▼
┌─────────────────────────┐   ┌───────────────────────────┐
│   Ollama Vision Engine  │   │  High-Fidelity Local AI   │
│  (Open-Weight Model:    │   │     Simulation Engine     │
│   Llava / Gemma3 /      │   │  (Zero-downtime Fallback) │
│   Qwen2.5-VL)           │   └───────────────────────────┘
└─────────────────────────┘
```

### Why Open-Source AI is Central
Without the open-weight vision model, RoadLens cannot visually interpret unstructured road surface photos into structured engineering metrics or draft civic complaint letters. The open-weight model acts as the core perceptual and generative engine of the application.

---

## 3. Challenge Evidence & Criteria Alignment

| Requirement | Implementation Evidence |
| :--- | :--- |
| **Track Alignment** | **Best Open-Source AI Project** (Uses open-weight vision models served locally via Ollama). |
| **Open License** | Licensed under the OSI-approved **MIT License** (`LICENSE` file included in root repo). |
| **Architecture Diagram** | Complete architecture diagram mapping Browser → Flask → Local Ollama Vision Model → Validated JSON → React UI. |
| **Multimodal Perception** | Analyzes asphalt erosion, standing water depth, broken signposts, and surrounding curb landmarks from photos. |
| **Multilingual Support** | Instant civic complaint generation in English, Telugu (తెలుగు), and Hindi (हिंदी). |
| **Resilience & Fallbacks** | Handles API capacity errors (503), offline state, non-road images, and invalid file uploads gracefully without crashing. |

---

## 4. Setup & Running Instructions

### Backend Setup (Python Flask)
```bash
# Clone the repository
git clone https://github.com/adnan/roadlens-gemma.git
cd roadlens-gemma

# Install Python dependencies
pip install -r requirements.txt

# Start local Ollama model (Open-Weight Vision)
ollama pull llava
ollama serve

# Start Flask Backend server
python app.py
# Server runs on http://localhost:5000
```

### Frontend Setup (React + Vite)
```bash
cd frontend

# Install node dependencies
npm install

# Start development server
npm run dev
# App opens on http://localhost:5173
```

---

## 5. Sample Screenshots & Demo Validation

- Pre-loaded sample road photos (`/sample_images/pothole.jpg`, `waterlogging.jpg`, `broken_sign.jpg`) allow judges and reviewers to test instant multimodal analysis in 1 click!
- Tested on varied severity inputs with clean validated JSON output.
