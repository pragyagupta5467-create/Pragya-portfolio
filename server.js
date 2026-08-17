import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import contactRoutes from './routes/contactRoutes.js';
import codingRoutes from './routes/codingRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration (Requirement 5 & 10)
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',').map(o => o.trim())
  : ['http://localhost:5173', 'http://localhost:3000', 'http://localhost:5000'];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, curl, or Postman)
    if (!origin || allowedOrigins.includes(origin) || process.env.NODE_ENV !== 'production') {
      return callback(null, true);
    }
    return callback(new Error('CORS policy violation: Origin not allowed.'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Body parser size limit to prevent payload flooding (Requirement 5)
app.use(express.json({ limit: '10kb' }));

// Mount Contact & Coding API routes
app.use('/api', contactRoutes);
app.use('/api', codingRoutes);

// System prompt definitions for Student / Fresher SDE Portfolio
const getSystemPrompt = (portfolioMode) => {
  if (portfolioMode) {
    return `You are Pragya AI, the AI Portfolio Assistant for Pragya Gupta.
Pragya is an MCA student at IIIT Bhopal (2024–Present, Expected Graduation: 2027), Full Stack Developer, DSA practitioner in Java, Generative AI & Agentic AI Enthusiast, and GeeksforGeeks Campus Mantri.
Your job is to present one software project in a technical SDE interview pitch format in approximately 30 seconds.
Use ONLY the information provided about the project.
Focus on:
- Technical complexity & engineering decisions
- System architecture & tech stack rationale
- Key algorithms, APIs, or AI/ML implementations
- Problem-solving approach & key learnings
Keep the response strictly between 60 and 80 words.
Be technically accurate, concise, and confident.
Do not invent features, technologies, metrics, or achievements.
Do not use generic corporate jargon.
Make it sound like an ambitious MCA student from IIIT Bhopal presenting their project in an SDE technical interview.`;
  }

  return `You are Pragya AI, the AI Portfolio Assistant for Pragya Gupta.
Pragya is an MCA student at IIIT Bhopal (2024–Present, Expected Graduation: 2027), Full Stack Developer, DSA practitioner in Java, Generative AI & Agentic AI Enthusiast, and GeeksforGeeks Campus Mantri.
Your job is to explain one software project in approximately 30 seconds.
Use ONLY the information provided about the project.
Mention:
- project name
- purpose/problem solved
- technologies used
- important features
- AI/ML implementation when applicable
- practical impact & personal contribution
Keep the response strictly between 60 and 80 words.
Be technically accurate, concise and confident.
Do not invent features, technologies, metrics or achievements.
Do not use unnecessary introductory filler phrases.
Make it sound like a confident IIIT Bhopal MCA student presenting their software engineering portfolio project.`;
};

/**
 * Universal LLM API caller supporting OpenAI & Google Gemini APIs
 */
async function callLLM({ systemPrompt, userPrompt }) {
  const openaiKey = process.env.OPENAI_API_KEY;
  const geminiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;

  if (openaiKey) {
    console.log('🤖 Calling OpenAI LLM API...');
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${openaiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.7,
        max_tokens: 250
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`OpenAI API error (${response.status}): ${errText}`);
    }

    const data = await response.json();
    return data.choices[0]?.message?.content?.trim();
  }

  if (geminiKey) {
    console.log('🤖 Calling Google Gemini LLM API...');
    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`;
    const response = await fetch(geminiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: `${systemPrompt}\n\n${userPrompt}` }]
        }],
        generationConfig: {
          maxOutputTokens: 250,
          temperature: 0.7
        }
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Gemini API error (${response.status}): ${errText}`);
    }

    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
  }

  return null;
}

// Fallback generator for projects
function generateFallbackExplanation(project, recruiterMode) {
  const name = project.name || 'this project';
  const techs = Array.isArray(project.technologies) ? project.technologies.join(', ') : (project.technologies || '');
  const features = Array.isArray(project.features) ? project.features.join(', ') : (project.features || '');
  const problem = project.problem || project.description || '';
  const impact = project.impact || '';
  const aiUsage = project.aiUsage || '';

  if (recruiterMode) {
    if (project.id === 'dev-arena-ai') {
      return `This is DevArena AI, an architected coding interview platform addressing developer skill gaps through real-time code evaluation. Powered by Node.js, Express, React, and MongoDB, it integrates Judge0 for remote code execution and OpenAI, LangChain, and ChromaDB for RAG-based context retrieval. Key engineering highlights include context-aware DSA mentorship, dynamic code reviews, and low-latency vector search, delivering scalable Generative AI integration for technical interview prep.`;
    }
    if (project.id === 'diabetes-prediction-system') {
      return `This is the Diabetes Prediction System, an end-to-end ML platform solving early diagnostic uncertainty. Engineered with Python, Pandas, and Scikit-learn, it compares Random Forest and XGBoost classifiers after rigorous feature scaling and cross-validation. Served via Flask and a React front end, the pipeline automates risk assessment with high evaluation metrics, providing clinicians fast, data-driven medical insights.`;
    }
    if (project.id === 'smart-parking-system') {
      return `This is the Smart Parking System, an embedded IoT solution designed to eliminate urban traffic congestion from parking searches. Built using an ESP32 microcontroller, ultrasonic sensors, servo-actuated gates, and LCD status displays, it processes sensor streams in real time for automated entry and parking availability tracking. This edge-level hardware integration provides instant space telemetry with minimal hardware latency.`;
    }
    if (project.id === 'ai-public-safety-platform') {
      return `This is the AI Public Safety Platform, a full-stack security dashboard combating financial fraud and counterfeit crime. Built on React, Tailwind CSS, Express, and MongoDB, it leverages OpenAI API endpoints for automated complaint analysis and scam pattern detection. The architecture aggregates threat intelligence in real time, delivering actionable fraud analysis and automated insights to safeguard communities.`;
    }

    return `This is ${name}, designed to solve ${problem.toLowerCase()}. Built with ${techs}, the architecture features ${features}. ${aiUsage ? `The system incorporates ${aiUsage} for intelligent processing.` : ''} Key engineering achievements include robust full-stack integration and scalable design, delivering measurable impact: ${impact}.`;
  }

  if (project.id === 'dev-arena-ai') {
    return `This is DevArena AI, an intelligent coding and interview preparation platform designed to help developers improve their programming skills. It is built using React, Node.js, Express, and MongoDB, with AI capabilities using OpenAI, LangChain, and ChromaDB. The platform provides AI code reviews, DSA assistance, code execution, and personalized interview guidance. Its RAG-based assistant provides context-aware support, combining full-stack development with Generative AI.`;
  }
  if (project.id === 'diabetes-prediction-system') {
    return `This is the Diabetes Prediction System, a machine learning platform built to enable early risk diagnosis through clinical data analysis. Developed using Python, Pandas, NumPy, Scikit-learn, Random Forest, XGBoost, Flask, and React, it performs feature scaling and ML model comparison to select optimal predictive accuracy. The web-based solution delivers automated diabetes evaluation, empowering users with proactive health insights.`;
  }
  if (project.id === 'smart-parking-system') {
    return `This is the Smart Parking System, an IoT solution engineered to streamline urban vehicle parking and reduce congestion. Built with ESP32 microcontrollers, ultrasonic sensors, servo motors, and LCD displays, it delivers real-time parking space detection and sensor-based occupancy monitoring. Featuring an automated entry gate and live availability tracking, it brings efficient edge automation to smart city infrastructure.`;
  }
  if (project.id === 'ai-public-safety-platform') {
    return `This is the AI Public Safety Platform, an intelligent safety dashboard created to combat financial scam activity and fake currency threats. Developed with React, Tailwind CSS, Node.js, Express, MongoDB, and the OpenAI API, it provides automated complaint processing and scam detection. Its AI-powered insights enable rapid fraud analysis, empowering citizens and law enforcement with proactive threat intelligence.`;
  }

  return `This is ${name}, a project addressing ${problem}. Built using ${techs}, it features ${features}. ${aiUsage ? `It leverages ${aiUsage} for intelligent insights.` : ''} The platform delivers strong practical results by ${impact}.`;
}

// POST /api/project-explain
app.post('/api/project-explain', async (req, res) => {
  const { project } = req.body;
  const isPortfolioMode = req.body.portfolioMode ?? req.body.recruiterMode ?? false;

  if (!project || !project.name) {
    return res.status(400).json({ error: 'Project data is required' });
  }

  const systemPrompt = getSystemPrompt(isPortfolioMode);
  const userPrompt = `Project Name: ${project.name}
Description: ${project.description || ''}
Problem Solved: ${project.problem || ''}
Technologies: ${Array.isArray(project.technologies) ? project.technologies.join(', ') : project.technologies}
Key Features: ${Array.isArray(project.features) ? project.features.join(', ') : project.features}
AI/ML Usage: ${project.aiUsage || 'N/A'}
Impact/Achievement: ${project.impact || ''}`;

  try {
    const aiResponse = await callLLM({ systemPrompt, userPrompt });
    if (aiResponse) {
      return res.json({ explanation: aiResponse });
    }
  } catch (err) {
    console.error('LLM API Error (Project Explain):', err.message);
  }

  // Graceful fallback
  console.log('ℹ️ Utilizing dynamic presenter fallback engine.');
  const explanation = generateFallbackExplanation(project, isPortfolioMode);
  return res.json({ explanation });
});

// POST /api/certification-explain
app.post('/api/certification-explain', async (req, res) => {
  const { certification } = req.body;
  if (!certification || !certification.title) {
    return res.status(400).json({ error: 'Certification metadata is required' });
  }

  const title = certification.title;
  const issuer = certification.issuer || 'the issuer';
  const skills = Array.isArray(certification.skillsDemonstrated)
    ? certification.skillsDemonstrated.join(', ')
    : (certification.skillsDemonstrated || '');
  const desc = certification.description || '';

  const systemPrompt = `You are Pragya AI, the AI Portfolio Assistant for Pragya Gupta (MCA Student @ IIIT Bhopal).
Your job is to explain what a specific certification represents and what skills/knowledge it demonstrates in approximately 30 seconds (50-70 words).
Use ONLY the provided certification metadata. Be concise, accurate, and professional.`;

  const userPrompt = `Certification Title: ${title}
Issuer: ${issuer}
Category: ${certification.category || 'N/A'}
Date: ${certification.date || ''}
Description: ${desc}
Skills Demonstrated: ${skills}`;

  try {
    const aiResponse = await callLLM({ systemPrompt, userPrompt });
    if (aiResponse) {
      return res.json({ explanation: aiResponse });
    }
  } catch (err) {
    console.error('LLM API Error (Certification Explain):', err.message);
  }

  const fallback = `The ${title} certification issued by ${issuer} validates technical proficiency in ${skills}. ${desc} It demonstrates a strong commitment to continuous learning, software engineering excellence, and domain mastery.`;
  return res.json({ explanation: fallback });
});

// POST /api/coding-journey-analyze
app.post('/api/coding-journey-analyze', async (req, res) => {
  const { profiles } = req.body;
  const list = Array.isArray(profiles) ? profiles : [];
  const active = list.filter(p => p.platform).map(p => p.platform);

  const systemPrompt = `You are Pragya AI, the AI Portfolio Assistant for Pragya Gupta (MCA Student @ IIIT Bhopal).
Your job is to analyze Pragya's competitive programming and coding practice presence across platforms like LeetCode, GeeksforGeeks, CodeChef, HackerRank, Codeforces.
Keep the response between 50 and 70 words. Do NOT invent statistics or numbers if unprovided.`;

  const userPrompt = `Coding Platforms Active: ${active.join(', ')}
Profiles Data: ${JSON.stringify(list)}`;

  try {
    const aiResponse = await callLLM({ systemPrompt, userPrompt });
    if (aiResponse) {
      return res.json({ explanation: aiResponse });
    }
  } catch (err) {
    console.error('LLM API Error (Coding Journey):', err.message);
  }

  const summaryText = `Pragya actively practices competitive coding across ${active.join(', ')}. This practice demonstrates dedication to data structures, algorithmic complexity optimization, dynamic programming, and consistent problem solving.`;
  return res.json({ explanation: summaryText });
});

app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Portfolio backend is running',
    timestamp: new Date().toISOString(),
    backendConnected: true,
    hasOpenAIKey: !!process.env.OPENAI_API_KEY,
    hasGeminiKey: !!(process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY),
    emailConfigured: !!(process.env.EMAIL_USER && process.env.EMAIL_PASS)
  });
});

// Centralized error handling middleware (Requirement 5 & 8)
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Portfolio Backend running on port ${PORT}`);
  console.log(`🔑 API Key Status -> OpenAI: ${process.env.OPENAI_API_KEY ? 'CONFIGURED' : 'NOT SET'}, Gemini: ${process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY ? 'CONFIGURED' : 'NOT SET'}`);
  console.log(`📧 Email Status -> Configured User: ${process.env.EMAIL_USER ? process.env.EMAIL_USER : 'NOT SET'}`);
});
