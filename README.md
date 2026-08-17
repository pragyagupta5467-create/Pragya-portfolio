# Pragya Gupta — Developer Portfolio

Welcome to my personal developer portfolio! This repository contains the source code for my interactive web portfolio, built with **React 19**, **Vite 8**, and **Tailwind CSS v4**. It showcases my academic journey as an MCA student at IIIT Bhopal, software development projects, verified coding profile achievements, certifications, and leadership role as a GeeksforGeeks Campus Mantri.

---

## 1. About

I am **Pragya Gupta**, a Master of Computer Applications (MCA) student at the **Indian Institute of Information Technology (IIIT), Bhopal** (2024–Present) and an active **GeeksforGeeks Campus Mantri 2026**.

My core technical expertise spans **Data Structures & Algorithms in Java**, **System Design (HLD & LLD)**, **Full-Stack Web Development**, and **Machine Learning & Generative AI**. This portfolio serves as a central hub highlighting my projects, hands-on IoT systems, verified coding profiles, achievements, and technical skills.

---

## 2. Features

- 🌓 **Persistent Dual Theme System**: Instant toggle between Dark Mode (futuristic slate aesthetic) and Light Mode (high-contrast, crisp white UI) with `localStorage` persistence.
- ✨ **Animated 2.5D Particle Constellation Background**: Subtle floating particle dots and drifting blurred gradient orbs rendered via HTML5 Canvas and CSS animations.
- 💬 **Interactive Speech Avatar ("Hi 👋 I'm Pragya")**: Theme-aware speech avatar in the top navigation bar powered by the Web Speech API for voice introduction playback.
- 🎨 **Shining Purple-Blue Gradient Heading**: Smooth 4-stop animated gradient text effect on the main hero greeting.
- 🌿 **Single Vertical Connected Timeline**: Sequenced reveal timeline connecting Node 01 (About Me), Node 02 (Education), Node 03 (Campus Role), and Node 04 (Student Focus).
- 📜 **60FPS Infinite Auto-Scrolling Certificates Marquee**: Continuous horizontal marquee loop displaying verified certificates with automatic hover and touch pause.
- 🏆 **Verified Coding Profiles Section**: Direct profile integration with confirmed ratings for **LeetCode** (1700 Rating), **CodeChef** (2★ Rating), and **GeeksforGeeks**.
- 🛠️ **Project Lightbox & YouTube Video Demos**: Interactive image preview modals for project hardware models, posters, and direct YouTube video links.
- 📬 **Interactive Contact Form**: Integrated contact card with direct clickable profile links for **LinkedIn** and **GitHub**.

---

## 3. Tech Stack

### Core Frontend & UI Frameworks
- **React 19** (`react`, `react-dom`)
- **Vite 8** (High-performance build tool & HMR)
- **Tailwind CSS v4** (`@tailwindcss/vite`, CSS Custom Properties)
- **Framer Motion** (Sequenced scroll reveals & micro-interactions)
- **Lucide React** (Modern SVG icon library)

### Web & Audio APIs
- **Web Speech API** (`window.speechSynthesis` audio playback)
- **HTML5 Canvas API** (Lightweight particle physics background)

### Back-End & Machine Learning Tools (Project Specifics)
- **Languages**: Java, Python, JavaScript (ES6+), HTML5, CSS3, SQL
- **Libraries & Frameworks**: Node.js, Express, Flask, Pandas, NumPy, Scikit-learn, Random Forest, XGBoost
- **IoT & Hardware**: ESP32, Ultrasonic Sensors, Servo Motors, LCD Displays

---

## 4. Projects

### 1. Diabetes Prediction System
- **Category**: Machine Learning / HealthTech
- **Description**: Full-stack machine learning application predicting diabetes risk using patient health metrics, feature scaling, and comparative model evaluation (Random Forest vs XGBoost).
- **Tech Stack**: Python, Pandas, NumPy, Scikit-learn, Random Forest, XGBoost, Flask, React, Tailwind CSS

### 2. DevArena AI
- **Category**: Full Stack & Generative AI
- **Description**: AI-powered coding and interview prep platform combining developer tooling with Generative AI, low-latency vector retrieval (RAG), OpenAI API, and multi-language execution via Judge0 API.
- **Tech Stack**: React.js, Node.js, Express.js, MongoDB, RAG, OpenAI API, LangChain, ChromaDB, Judge0 API

### 3. Smart Parking System
- **Category**: IoT & Embedded Systems (IIIT Bhopal MCA 2nd Year Group Project)
- **Description**: Smart IoT-based parking solution that monitors parking slot availability in real time using ultrasonic sensors and automates entry/exit gates to reduce parking search time and urban congestion.
- **Role**: System Architecture & Development Support
- **Tech Stack**: ESP32, Ultrasonic Sensors, Servo Motor, LCD, IoT, HTML, CSS, JavaScript, Node.js
- **Highlights**: Features a compact 3-photo project gallery (Web Interface, Project Team, Team Photo), interactive lightbox modal, and direct YouTube live video demo.

---

## 5. Certifications & Achievements

- **Women Who Master Hackathon 2026** – Logitech & Aspire For Her National Initiative (July 2026)
- **GeeksforGeeks Campus Mantri 2026** – Selection Letter, Official ID & Student Ambassador (2026)
- **Smart India Hackathon 2025** – IIIT Bhopal Participation (September 2025)
- **Smart Parking System IoT Achievement** – IIIT Bhopal (2025)
- **Introduction to Prompt Engineering for Generative AI** – LinkedIn Learning (August 2024)
- **Python Summer Training (80 Hours)** – Dayanand Academy of Management Studies (August 2021)
- **Online Enquiry & Mail System Project Training** – Axpino Technologies (2021)

---

## 6. Portfolio Highlights

- **Accessibility & Contrast**: Built to meet WCAG color contrast standards across both Dark and Light themes.
- **Zero Horizontal Overflow**: Carefully wrapped responsive containers (`overflow-hidden`) preventing accidental page scrollbars.
- **Reduced Motion Support**: Honors `prefers-reduced-motion` browser settings for canvas and marquee animations.

---

## 7. Getting Started / Local Setup

Follow these steps to run the portfolio locally on your machine:

### Prerequisites
- **Node.js** (v18.0.0 or higher recommended)
- **npm** (v9.0.0 or higher)

### Installation Commands

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/pragyagupta5467-create/Pragya-portfolio.git
   cd Pragya-portfolio
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start Development Server**:
   ```bash
   npm run dev
   ```

4. **Open in Browser**:
   Navigate to `http://localhost:5173` to view the running portfolio.

---

## 8. Build & Deployment

### Production Build
To create an optimized, minified production build:

```bash
npm run build
```
The compiled static assets will be generated inside the `dist/` directory.

### Deployment (GitHub + Vercel)
This project is configured for automated continuous deployment on **Vercel** via **GitHub**:

- **Repository**: `pragyagupta5467-create/Pragya-portfolio`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **SPA Routing**: Configured via `vercel.json` rewrite rules.

---

## 9. Future Improvements

- Add live LeetCode & CodeChef API integration for auto-updating solved problem counts.
- Expand system design interactive visualizers for High-Level (HLD) and Low-Level (LLD) architecture patterns.
- Integrate an AI-powered interactive chatbot assistant for instant portfolio Q&A.

---

## 10. Author

**Pragya Gupta**  
*MCA Student @ Indian Institute of Information Technology (IIIT), Bhopal*

- **LinkedIn**: [linkedin.com/in/pragya-gupta-44200922a](https://www.linkedin.com/in/pragya-gupta-44200922a)
- **GitHub**: [github.com/pragyagupta5467-create](https://github.com/pragyagupta5467-create)
- **LeetCode**: [leetcode.com/u/Pragya_Gupta01](https://leetcode.com/u/Pragya_Gupta01/)
- **CodeChef**: [codechef.com/users/pragya_gupta01](https://www.codechef.com/users/pragya_gupta01)
- **GeeksforGeeks**: [geeksforgeeks.org/profile/pragyagupwxxe](https://www.geeksforgeeks.org/profile/pragyagupwxxe)

---
*© 2026 Pragya Gupta. All rights reserved.*
