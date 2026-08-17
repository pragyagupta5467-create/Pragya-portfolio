/**
 * Client service for calling backend AI endpoints
 */
export async function generateProjectExplanation(project, portfolioMode = false) {
  try {
    const response = await fetch('/api/project-explain', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ project, portfolioMode, recruiterMode: portfolioMode }),
    });

    if (!response.ok) throw new Error(`Server returned status: ${response.status}`);
    const data = await response.json();
    return data.explanation;
  } catch (error) {
    console.warn('Backend request failed, utilizing dynamic client fallback presentation:', error);
    return fallbackProjectExplanation(project, portfolioMode);
  }
}

export async function generateCertificationExplanation(certification) {
  try {
    const response = await fetch('/api/certification-explain', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ certification }),
    });

    if (!response.ok) throw new Error(`Server status: ${response.status}`);
    const data = await response.json();
    return data.explanation;
  } catch (error) {
    console.warn('Certification API fallback:', error);
    const title = certification.title || 'this certification';
    const issuer = certification.issuer || 'the issuer';
    const skills = Array.isArray(certification.skillsDemonstrated)
      ? certification.skillsDemonstrated.join(', ')
      : (certification.skillsDemonstrated || '');
    return `The ${title} certification issued by ${issuer} validates technical proficiency in ${skills}. ${certification.description || ''} It demonstrates dedication to continuous software engineering learning and practical skill mastery.`;
  }
}

export async function analyzeCodingJourney(profiles = []) {
  try {
    const response = await fetch('/api/coding-journey-analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ profiles }),
    });

    if (!response.ok) throw new Error(`Server status: ${response.status}`);
    const data = await response.json();
    return data.explanation;
  } catch (error) {
    console.warn('Coding journey API fallback:', error);
    const active = profiles.filter(p => p.platform).map(p => p.platform);
    const withStats = profiles.filter(p => (p.solved && p.solved.trim()) || (p.rating && p.rating.trim()) || (p.username && p.username.trim()));

    if (withStats.length === 0) {
      return `Pragya maintains an active problem-solving presence across competitive coding platforms including LeetCode, GeeksforGeeks, CodeChef, HackerRank, and Codeforces. Detailed solved problem counts and contest ratings can be configured in the portfolio configuration.`;
    }

    return `Pragya actively practices competitive coding across ${active.join(', ')}. This practice demonstrates dedication to data structures, algorithmic complexity optimization, dynamic programming, and consistent problem solving.`;
  }
}

function fallbackProjectExplanation(project, portfolioMode) {
  const name = project.name || 'this project';
  const techs = Array.isArray(project.technologies) ? project.technologies.join(', ') : (project.technologies || '');
  const features = Array.isArray(project.features) ? project.features.join(', ') : (project.features || '');
  const problem = project.problem || project.description || '';
  const impact = project.impact || '';

  if (portfolioMode) {
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

    return `This is ${name}, designed to solve ${problem.toLowerCase()}. Built with ${techs}, the architecture features ${features}. Key engineering achievements include robust full-stack integration and scalable design, delivering measurable impact: ${impact}.`;
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

  return `This is ${name}, a project addressing ${problem}. Built using ${techs}, it features ${features}. The platform delivers strong practical results by ${impact}.`;
}
