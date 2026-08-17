import smartParkingWebImg from '../assets/Projects/SmartParkingSystem/photo_2026-08-17_13-37-59.jpg';
import smartParkingTeamImg from '../assets/Projects/SmartParkingSystem/photo_2026-08-17_13-37-56.jpg';
import smartParkingGroupImg from '../assets/Projects/SmartParkingSystem/photo_2026-08-17_13-37-53.jpg';

export const projectsData = [
  {
    id: "diabetes-prediction-system",
    name: "Diabetes Prediction System",
    tagline: "Predictive Machine Learning Health Diagnostics Platform",
    description: "A full-stack machine learning application that predicts diabetes risk using patient health metrics, feature scaling, and comparative model evaluation.",
    problem: "Late diagnosis of diabetes leads to severe long-term complications. Patient data often goes unanalyzed until symptoms worsen.",
    technologies: [
      "Python",
      "Pandas",
      "NumPy",
      "Scikit-learn",
      "Random Forest",
      "XGBoost",
      "Flask",
      "React",
      "Tailwind CSS"
    ],
    features: [
      "Data preprocessing & normalization",
      "Feature scaling & selection",
      "ML model comparison (Random Forest vs XGBoost)",
      "Diabetes risk prediction",
      "Model performance evaluation",
      "Interactive web-based prediction interface"
    ],
    aiUsage: "Scikit-learn, Random Forest, XGBoost Machine Learning Models",
    impact: "Enables proactive health monitoring and early diagnostic intervention with high predictive precision.",
    category: "Machine Learning / HealthTech",
    badgeColor: "from-blue-500 to-indigo-600",
    stats: {
      accuracy: "94.2%",
      models: "Random Forest & XGBoost",
      speed: "< 50ms Inference"
    }
  },
  {
    id: "dev-arena-ai",
    name: "DevArena AI",
    tagline: "Intelligent Coding & Interview Preparation Platform",
    description: "An AI-powered interview prep workspace combining full-stack developer tooling with Generative AI and retrieval-augmented context generation.",
    problem: "Traditional coding prep platforms lack real-time personalized guidance, instant code feedback, and context-aware mentorship.",
    technologies: [
      "MongoDB",
      "Express.js",
      "React.js",
      "Node.js",
      "Judge0 API",
      "OpenAI API",
      "LangChain",
      "ChromaDB"
    ],
    features: [
      "AI Code Review & Optimization",
      "DSA Problem-Solving Assistance",
      "RAG-based Context Assistant",
      "Remote Multi-language Code Execution",
      "AI Personalized Interview Mentor",
      "Interactive Practice Arena"
    ],
    aiUsage: "RAG Architecture, OpenAI API, LangChain, Vector Embeddings with ChromaDB",
    impact: "Combines full-stack development with Generative AI to deliver context-aware, low-latency interview support.",
    category: "Full Stack & Generative AI",
    badgeColor: "from-purple-500 to-pink-600",
    stats: {
      ragLatency: "< 120ms Vector Retrieval",
      execution: "Judge0 Multi-Language API",
      mentor: "GPT-4o / LangChain RAG"
    }
  },
  {
    id: "smart-parking-system",
    name: "Smart Parking System",
    subtitle: "IIIT Bhopal · MCA Group Project",
    tagline: "IoT-Powered Real-Time Urban Parking Automation",
    description: "A smart IoT-based parking solution that monitors parking slot availability in real time using sensors and provides users with up-to-date information about available spaces. The system is designed to reduce parking search time, improve space utilization and contribute to smoother traffic flow in crowded urban areas.",
    goal: "The goal of this project is to reduce urban traffic congestion caused by vehicles searching for available parking spaces. In busy cities, drivers often spend significant time finding parking, which increases unnecessary traffic, fuel consumption and waiting time. Our Smart Parking System provides real-time parking slot availability and helps drivers identify available spaces efficiently, making the parking process faster, smarter and more convenient.",
    role: "System Architecture & Development Support",
    roleContributions: [
      "Helping with the project development and coding.",
      "Designing/planning the overall system architecture and data flow.",
      "Supporting the frontend/UI design decisions and deciding what components/features should be included.",
      "Helping with the integration of the different project components.",
      "Contributing to testing and fixing issues during development."
    ],
    problem: "In busy cities, drivers often spend significant time finding parking, which increases unnecessary traffic, fuel consumption and waiting time.",
    technologies: [
      "ESP32",
      "Ultrasonic Sensors",
      "Servo Motor",
      "LCD",
      "IoT",
      "HTML",
      "CSS",
      "JavaScript",
      "Node.js"
    ],
    features: [
      "Real-time parking slot availability",
      "Ultrasonic sensor-based slot detection",
      "Automated entry/exit gate",
      "LCD-based availability display",
      "Efficient parking-space management",
      "Reduced waiting time and congestion"
    ],
    gallery: [
      {
        id: "web-interface",
        title: "Smart Parking Web Interface",
        image: smartParkingWebImg,
        caption: "Smart Parking Web Interface"
      },
      {
        id: "project-team",
        title: "Project Team",
        image: smartParkingTeamImg,
        caption: "Project Team"
      },
      {
        id: "team-photo",
        title: "Team Photo",
        image: smartParkingGroupImg,
        caption: "Team Photo"
      }
    ],
    demoUrl: "https://youtu.be/pM6JhnGrUBE?si=C4ZRKA5tF5Tc8KDk",
    impact: "Reduces parking search time and automates entry/exit flow with seamless hardware-software integration.",
    category: "IoT & Embedded Systems",
    badgeColor: "from-emerald-500 to-teal-600"
  }
];
