import type { Resume } from "./types";

export const resume: Resume = {
  experience: [
    {
      title: "Principal Software Engineer",
      employer: "Pegasystems",
      location: "Remote",
      years: { start: 2024, end: "present" },
      highlights: [
        "Architect and lead end-to-end delivery of core product capabilities, guiding engineering teams toward scalable design decisions.",
        "Develop key components of a large-scale data visualization platform, improving product reliability and accelerating release confidence through comprehensive automation.",
        "Mentor engineers in system design, software craftsmanship, and delivery best practices, accelerating skill growth and improving team effectiveness.",
        "Lead technical design reviews, backlog refinement, and Agile planning ceremonies to ensure alignment between engineering execution and product goals.",
        "Influence product strategy by providing technical insight that shaped roadmap decisions and accelerated delivery of high-value features.",
        "Serve as Security Champion, promoting secure development practices and driving continuous improvement of the team's security posture.",
      ],
      skills: ["typescript", "javascript", "react", "d3", "jest", "java"],
    },
    {
      title: "Senior Software Engineer",
      employer: "Pegasystems",
      location: "Remote",
      years: { start: 2021, end: 2024 },
      highlights: [
        "Developed components of a large-scale data visualization platform and accelerated release confidence through comprehensive automation.",
        "Led team technical/design discussions, user story refinement, and other recurring Agile planning meetings.",
        "Collaborated directly with customers to diagnose and resolve production issues, improving product reliability and user satisfaction.",
        "Served as Security Champion, promoting secure development practices and driving continuous improvement of the team's security posture.",
      ],
      skills: ["typescript", "javascript", "react", "d3", "jest", "java"],
    },
    {
      title: "Software Engineer",
      employer: "Pegasystems",
      location: "Bedford, NH",
      years: { start: 2017, end: 2020 },
      highlights: [
        "Developed new Customer Relationship Management (CRM) and Business Process Management (BPM) product capabilities with emphasis on maintainable design and robust automated test coverage.",
        "Collaborated directly with customers to diagnose and resolve production issues, improving product reliability and user satisfaction.",
      ],
      skills: ["javascript", "react", "css", "java"],
    },
    {
      title: "IPSec and IKEv2 Technician",
      employer: "UNH Interoperability Lab",
      location: "Durham, NH",
      years: { start: 2014, end: 2016 },
      highlights: [
        "Designed and administered virtual network environments integrating physical routers, switches, and endpoints to support reliable system connectivity.",
        "Executed interoperability and conformance testing for customer IPSec and IKEv2 implementations to validate compliance with IETF standards.",
      ],
      skills: [],
    },
  ],
  education: [
    {
      degree: "B.S. in Computer Science",
      school: "University of New Hampshire",
      location: "Durham, NH",
      years: { start: 2013, end: 2017 },
    },
  ],
};
