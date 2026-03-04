import type { TeamMember } from '../types';
import teamMinjin from '../assets/team_minjin.svg';
import teamPaul from '../assets/team_paul.svg';
import teamHojin from '../assets/team_hojin.svg';
import teamYunhee from '../assets/team_yunhee.svg';

export const teamMembers: TeamMember[] = [
  {
    name: 'Minjin Gu',
    image: teamMinjin,
    achievements: [
      'Winner of multiple competitions (e.g. 1st Runner Up in Cathay Hackathon)',
      'Founder of Pinocchio (student-led mental health organization in HKUST)',
    ],
  },
  {
    name: 'Sungwoo Paul Kim',
    image: teamPaul,
    achievements: [
      'Frontend Developer at a Startup (1 year)',
      'Co-founder & CTO at a SaaS Development Company',
    ],
  },
  {
    name: 'Hojin Ryu',
    image: teamHojin,
    achievements: [
      'Deep learning model for visual data (autonomous RC racing)',
      'Founder of ASTRIX (HKUST rocket club)',
    ],
  },
  {
    name: 'Yunhee Kim',
    image: teamYunhee,
    achievements: [
      'Senior Analyst of HKUST KSA Research and Investment Strategy Society',
      'Strategic Planning & Research Intern at LX International',
    ],
  },
];
