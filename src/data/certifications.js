/**
 * Data configuration for Certificates
 * Arranged strictly by date (Newest first: 2026 -> 2025 -> 2024 -> 2021)
 */

import womenWhoMasterImg from '../assets/certificates/photo_2026-08-17_01-21-07.jpg';
import sihImg from '../assets/certificates/photo_2026-08-17_01-10-17.jpg';
import promptEngImg from '../assets/certificates/photo_2026-08-17_01-10-21.jpg';
import pythonTrainingImg from '../assets/certificates/photo_2026-08-17_01-10-25.jpg';
import smartParkingImg from '../assets/certificates/photo_2026-08-17_01-10-28.jpg';
import onlineEnquiryImg from '../assets/certificates/photo_2026-08-17_01-10-32.jpg';

export const certificationsData = [
  // 2026 Certificates
  {
    id: "women-who-master-hackathon",
    year: "2026",
    title: "Women Who Master Hackathon – Certificate of Participation",
    issuer: "Logitech & Aspire For Her",
    date: "27 July 2026",
    image: womenWhoMasterImg,
    category: "Hackathons",
    description: "Certificate of participation in Women Who Master Hackathon, an all-women national initiative by Logitech and Aspire For Her."
  },

  // 2025 Certificates
  {
    id: "smart-india-hackathon",
    year: "2025",
    title: "Smart India Hackathon 2025 – Participation",
    issuer: "Smart India Hackathon 2025 / IIIT Bhopal",
    date: "September 19, 2025",
    image: sihImg,
    category: "Hackathons",
    description: "Certificate of participation in Smart India Hackathon 2025 organized at Indian Institute of Information Technology, Bhopal."
  },
  {
    id: "smart-parking",
    year: "2025",
    title: "Smart Parking System – Certificate of Achievement",
    issuer: "Indian Institute of Information Technology, Bhopal",
    date: "2025",
    image: smartParkingImg,
    category: "Projects & IoT",
    description: "Certificate of achievement awarded for building an automated Smart Parking System project using IoT at IIIT Bhopal."
  },

  // 2024 Certificates
  {
    id: "prompt-engineering",
    year: "2024",
    title: "Introduction to Prompt Engineering for Generative AI",
    issuer: "LinkedIn Learning",
    date: "August 14, 2024",
    image: promptEngImg,
    category: "AI & Generative AI",
    description: "Specialized certification covering Generative AI fundamentals, prompt structure optimization, and LLM interaction patterns."
  },

  // 2021 Certificates
  {
    id: "online-enquiry",
    year: "2021",
    title: "Project Training – Online Enquiry and Mail System",
    issuer: "Axpino Technologies / Dayanand Academy of Management Studies",
    date: "2021",
    image: onlineEnquiryImg,
    category: "Software Development",
    description: "Project training completion certificate for designing and implementing an Online Enquiry and Mail System."
  },
  {
    id: "python-training",
    year: "2021",
    title: "Summer Training – Python",
    issuer: "Dayanand Academy of Management Studies",
    date: "August 30, 2021",
    duration: "80 hours",
    image: pythonTrainingImg,
    category: "Programming",
    description: "80-hour intensive summer training certificate in Python programming, covering core logic, data handling, and scripting."
  }
];
