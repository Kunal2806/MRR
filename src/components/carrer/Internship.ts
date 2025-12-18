import { Status, Level } from "./career";


export interface Internship {
  id: string;
  title: string; // NEW
  domain: string;
  status: Status;
  mode?: string; // NEW (remote/onsite/hybrid)
  level?: Level; // NEW (beginner/intermediate/advanced)
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
    status: Status;
    links?: string[];
  }[];
  technologyStack: string[];
  submissionProcess: string[];
  timeline: string;
  criteria: { name: string; weightage: string; }[];
  interviewCall: string;
}
