// import { Status, Level } from "./career";const Status type
// const type Status = ["remote"]
//  type Status = ["open","close","upcoming"];
//  type Level = ["beginner","intermediate", "advance"];

export interface Internship {
  id: string;
  title: string; // NEW
  domain: string;
  status: string;
  mode?: string; // NEW (remote/onsite/hybrid)
  level?: string; // NEW (beginner/intermediate/advanced)
  stipend?: string; // NEW
  certificate?: string; // NEW
  deadline?: string; // NEW
  bgColor: string;
  borderColor: string;
  overview: string;
  eligibility?: string[]; // NEW
  tasks: {
    id: string;
    title: string;
    description: string;
    status: string;
    links?: string[];
  }[];
  technologyStack: string[];
  submissionProcess: string[];
  timeline: string;
  criteria: { name: string; weightage: string; }[];
  interviewCall: string;
}
