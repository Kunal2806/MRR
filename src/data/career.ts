export type Status = "open" | "close" | "upcoming";

export interface Internship {
  id: string;
  domain: string;
  status: Status;
  bgColor: string;
  borderColor: string;
  overview: string;
  tasks: {
    id: string;
    title: string;
    description: string;
    status: Status;
    links?: string[];
  }[];
  technologyStack: string[];
  submissionProcess: string[];
  timeline: string;
  criteria: { name: string; weightage: string }[];
  interviewCall: string;
}

export const internships: Internship[] = [
  {
    id: "INT-MERN",
    domain: "MERN Full Stack",
    status: "open",
    bgColor: '#fdf2f8',
    borderColor: '#db2777',
    overview:
      "Students must complete one task in 5 days. This will be used for shortlisting candidates.",
    tasks: [
      {
        id: "TASK-M1",
        title: "Temple Tourism Website",
        description:
          "Create an informative tourism website showcasing temples across India.",
        status: "open"
      },
      {
        id: "TASK-M2",
        title: "Hospital Management System",
        description:
          "Build a patient, staff, and billing management system with modular dashboards.",
        status: "open"
      },
      {
        id: "TASK-M3",
        title: "Custom Jacket Design Website",
        description:
          "Users can design jackets with live preview and customization.",
        status: "upcoming",
        links: ["https://varsitybase.com"]
      },
      {
        id: "TASK-M4",
        title: "NGO Training & Skill Website",
        description:
          "Create a modern website for NGO program details, volunteer signup, and donations.",
        status: "open",
        links: ["https://edunetfoundation.org"]
      },
      {
        id: "TASK-M5",
        title: "Government Skill Portal",
        description:
          "A skill development portal for students including login and course recommendations.",
        status: "close",
        links: ["https://www.naanmudhalvan.tn.gov.in"]
      }
    ],
    technologyStack: [
      "MERN Stack",
      "HTML/CSS/JS/PHP",
      "GitHub CI/CD",
      "Vercel/Netlify Deployment"
    ],
    submissionProcess: [
      "Upload project to GitHub",
      "Deploy on Vercel/Netlify",
      "Submit live link + repository link",
      "Submit short PDF explaining features & learning"
    ],
    timeline: "5 days",
    criteria: [
      { name: "Innovation & Learning", weightage: "30%" },
      { name: "Timely Completion", weightage: "50%" },
      { name: "Extra Features", weightage: "20%" }
    ],
    interviewCall: "Shortlisted candidates will be invited for online interview."
  },
  {
    id: "INT-GWS",
    domain: "Google Workspace",
    status: "open",
    bgColor: '#eef2ff',
    borderColor: '#4338ca',
    overview:
      "Students must build a Google AI-powered project in 5 days.",
    tasks: [
      {
        id: "TASK-G1",
        title: "Gemini Study Path Generator",
        description:
          "Generate study plans using Gemini API based on student performance.",
        status: "open"
      },
      {
        id: "TASK-G2",
        title: "Assignment Management System",
        description:
          "Faculty can create assignments and students can submit digitally.",
        status: "open"
      },
      {
        id: "TASK-G3",
        title: "Exam Proctoring AI System",
        description:
          "AI verifies identity and detects cheating using camera/video.",
        status: "upcoming"
      },
      {
        id: "TASK-G4",
        title: "AI Code Review Assistant",
        description:
          "Gemini analyzes code, detects bugs, and suggests improvements.",
        status: "close"
      }
    ],
    technologyStack: [
      "Google Workspace API",
      "Frontend + Backend",
      "GitHub CI/CD",
      "Vercel Deployment"
    ],
    submissionProcess: [
      "Push code to GitHub",
      "Deploy live",
      "Submit PDF + links"
    ],
    timeline: "5 days",
    criteria: [
      { name: "Innovation", weightage: "30%" },
      { name: "Completion", weightage: "50%" },
      { name: "Quality", weightage: "20%" }
    ],
    interviewCall: "Selected students will get interview invite."
  },
  {
    id: "INT-AIML",
    domain: "AI / ML",
    status: "upcoming",
    bgColor: '#ecfeff',
    borderColor: '#0891b2', 
    overview:
      "Build an AI/ML-powered project using real or synthetic datasets.",
    tasks: [
      {
        id: "TASK-A1",
        title: "Career Recommendation AI",
        description:
          "Suggests career paths based on skills, interests, and personality.",
        status: "open"
      },
      {
        id: "TASK-A2",
        title: "Job Market Trend Analyzer",
        description:
          "Analyze future jobs demand and skill gap using datasets.",
        status: "open"
      },
      {
        id: "TASK-A3",
        title: "Resume Screening AI",
        description:
          "Extracts resume content and suggests job match score.",
        status: "open"
      },
      {
        id: "TASK-A4",
        title: "Student Performance Predictor",
        description:
          "Predicts academic performance using ML model.",
        status: "close"
      }
    ],
    technologyStack: [
      "Python",
      "Scikit-learn / TensorFlow",
      "Flask / FastAPI / Streamlit",
      "Dataset-based modeling"
    ],
    submissionProcess: [
      "Upload code",
      "Deploy model",
      "Submit report and links"
    ],
    timeline: "5 days",
    criteria: [
      { name: "Innovation", weightage: "30%" },
      { name: "Completion", weightage: "50%" },
      { name: "ML Accuracy & Features", weightage: "20%" }
    ],
    interviewCall: "Shortlisted candidates will be notified."
  }
];