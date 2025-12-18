import { Internship } from "./Internship";

export type Status = "open" | "close" | "upcoming";
export type Level = "beginner" | "intermediate" | "advance";

export const internships: Internship[] = [
  {
    id: "INT-MERN",
    title: "MERN Full Stack Learning Internship",
    domain: "MERN Full Stack",
    status: "open",
    mode: "Remote",
    level: "intermediate",
    stipend: "Unpaid",
    certificate: "Issue on Completion",
    deadline: "2025-01-10",
    bgColor: "#fdf2f8",
    borderColor: "#db2777",
    overview:
      "Complete one project task in 5 days. Successful submissions will be shortlisted for interviews.",

    eligibility: [
      "Basic understanding of HTML/CSS/JavaScript",
      "Familiarity with React/Node.js is preferred",
      "College students or recent graduates"
    ],

    tasks: [
      {
        id: "TASK-M1",
        title: "Temple Tourism Website",
        description:
          "Create a platform showcasing temples across India with details, galleries, and maps.",
        status: "open"
      },
      {
        id: "TASK-M2",
        title: "Hospital Management System",
        description:
          "Create dashboards for patients, staff, and billing, including authentication.",
        status: "open"
      },
      {
        id: "TASK-M3",
        title: "Custom Jacket Design Website",
        description:
          "Provide real-time jacket customization preview and user design features.",
        status: "upcoming",
        links: ["https://varsitybase.com"]
      },
      {
        id: "TASK-M4",
        title: "NGO Training & Skill Website",
        description:
          "Modern website for NGO programs, volunteer enrollment, and donations.",
        status: "open",
        links: ["https://edunetfoundation.org"]
      },
      {
        id: "TASK-M5",
        title: "Government Skill Portal",
        description:
          "Skill development portal with login, dashboard, and recommendations.",
        status: "close",
        links: ["https://www.naanmudhalvan.tn.gov.in"]
      }
    ],

    technologyStack: [
      "MongoDB",
      "Express.js",
      "React.js",
      "Node.js",
      "GitHub Actions",
      "Vercel / Netlify"
    ],

    submissionProcess: [
      "Upload complete project to GitHub",
      "Deploy on Vercel/Netlify",
      "Submit repo link + live URL",
      "Submit 1–2 page PDF summarizing features and learning outcome"
    ],

    timeline: "5 days",
    criteria: [
      { name: "Innovation & Learning", weightage: "30%" },
      { name: "Timely Completion", weightage: "50%" },
      { name: "Extra Functionality", weightage: "20%" }
    ],
    interviewCall: "Shortlisted candidates will be invited for an online interview."
  },

  {
    id: "INT-GWS",
    title: "Google Workspace + AI Internship",
    domain: "Google Workspace",
    status: "open",
    mode: "Remote",
    level: "beginner",
    stipend: "Unpaid",
    certificate: "Provided upon completion",
    deadline: "2025-01-15",
    bgColor: "#eef2ff",
    borderColor: "#4338ca",
    overview:
      "Build a working project using Google AI and Workspace tools within 5 days.",

    eligibility: [
      "Basic programming understanding",
      "Interest in automation and AI integration",
      "No experience required"
    ],

    tasks: [
      {
        id: "TASK-G1",
        title: "Gemini Study Path Generator",
        description:
          "Generate study roadmaps using Gemini API based on skills and grades.",
        status: "open"
      },
      {
        id: "TASK-G2",
        title: "Assignment Management System",
        description:
          "Allow teachers to create assignments and students to submit digitally.",
        status: "open"
      },
      {
        id: "TASK-G3",
        title: "Exam Proctoring AI",
        description:
          "Detect and flag cheating using camera input and verification.",
        status: "upcoming"
      },
      {
        id: "TASK-G4",
        title: "AI Code Review Assistant",
        description:
          "Review code, detect issues, and suggest improvements using Gemini.",
        status: "close"
      }
    ],

    technologyStack: [
      "Google Workspace API",
      "Google Gemini AI",
      "Frontend + Backend",
      "CI/CD",
      "Vercel Deployment"
    ],

    submissionProcess: [
      "Push code to GitHub",
      "Deploy project",
      "Submit links + short documentation"
    ],

    timeline: "5 days",
    criteria: [
      { name: "Innovation", weightage: "30%" },
      { name: "Completion", weightage: "50%" },
      { name: "Quality & UI", weightage: "20%" }
    ],
    interviewCall: "Selected candidates will receive an interview invitation."
  },

  {
    id: "INT-AIML",
    title: "AI & Machine Learning Internship",
    domain: "AI / ML",
    status: "upcoming",
    mode: "Remote",
    level: "intermediate",
    stipend: "Unpaid",
    certificate: "Issued after submission",
    deadline: "2025-01-20",
    bgColor: "#ecfeff",
    borderColor: "#0891b2",
    overview: "Build a functional AI/ML-based project using real or synthetic datasets.",

    eligibility: [
      "Basic Python knowledge",
      "Familiarity with ML concepts preferred",
      "Open to all students"
    ],

    tasks: [
      {
        id: "TASK-A1",
        title: "Career Recommendation AI",
        description:
          "Predict suitable career paths using skills and personality input.",
        status: "open"
      },
      {
        id: "TASK-A2",
        title: "Job Market Trend Analyzer",
        description:
          "Analyze and predict future job demand and skills based on data.",
        status: "open"
      },
      {
        id: "TASK-A3",
        title: "Resume Screening AI",
        description:
          "Parse resume text and generate job match score.",
        status: "open"
      },
      {
        id: "TASK-A4",
        title: "Student Performance Predictor",
        description:
          "Predict grades using ML model based on input patterns.",
        status: "close"
      }
    ],

    technologyStack: [
      "Python",
      "Scikit-learn",
      "TensorFlow",
      "Flask / FastAPI / Streamlit"
    ],

    submissionProcess: [
      "Upload code to GitHub",
      "Deploy model / notebook",
      "Submit report + live notebooks"
    ],

    timeline: "5 days",
    criteria: [
      { name: "Innovation", weightage: "30%" },
      { name: "Completion", weightage: "50%" },
      { name: "Accuracy & Results", weightage: "20%" }
    ],
    interviewCall: "Shortlisted candidates will be notified."
  }
];
