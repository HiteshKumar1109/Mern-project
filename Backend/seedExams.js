const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Exam = require('./models/Exam');

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected to seed exams');
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const examData = [
  {
    examType: 'upsc',
    name: 'UPSC',
    icon: 'fa-crown',
    color: '#ff7a00',
    description: 'Union Public Service Commission - Civil Services Examination',
    syllabus: [
      { title: 'General Studies Paper I', topics: ['History of India', 'Indian and World Geography', 'Indian Polity and Governance', 'Economic and Social Development'] },
      { title: 'General Studies Paper II (CSAT)', topics: ['Comprehension', 'Logical reasoning and analytical ability', 'Decision making and problem solving', 'General mental ability'] },
      { title: 'Optional Subjects', topics: ['Agriculture', 'Anthropology', 'Botany', 'Chemistry', 'Civil Engineering'] }
    ],
    mockTests: [
      { title: 'UPSC Full Mock Test 1', date: '10 Apr 2024', duration: '120 mins', questions: 100 },
      { title: 'UPSC Previous Year 2023', date: '15 Mar 2024', duration: '120 mins', questions: 100 },
    ],
    currentAffairs: [
      { title: 'April 2024 Complete Review', category: 'Monthly Update', date: '01 Apr 2024' },
    ]
  },
  {
    examType: 'ssc',
    name: 'SSC',
    icon: 'fa-users',
    color: '#ff9500',
    description: 'Staff Selection Commission - CGL, CHSL, MTS',
    syllabus: [
      { title: 'Tier I Syllabus', topics: ['General Intelligence & Reasoning', 'General Awareness', 'Quantitative Aptitude', 'English Comprehension'] },
    ],
    mockTests: [
      { title: 'SSC CGL Tier 1 Mock', date: '22 Apr 2024', duration: '60 mins', questions: 100 },
    ],
    currentAffairs: []
  },
  {
    examType: 'banking',
    name: 'Banking',
    icon: 'fa-university',
    color: '#ff6b00',
    description: 'IBPS, SBI, RBI & Other Banking Exams',
    syllabus: [
      { title: 'Quantitative Aptitude', topics: ['Data Interpretation', 'Number Series', 'Quadratic Equations', 'Simplified Calculations'] },
      { title: 'Reasoning Ability', topics: ['Puzzles', 'Seating Arrangement', 'Syllogism', 'Blood Relations'] },
    ],
    mockTests: [
      { title: 'IBPS PO Prelims', date: '05 May 2024', duration: '60 mins', questions: 100 },
    ],
    currentAffairs: []
  },
  {
    examType: 'railway',
    name: 'Railway',
    icon: 'fa-train',
    color: '#ff8c00',
    description: 'Railway Recruitment Board - NTPC, Group D',
    syllabus: [
      { title: 'General Awareness', topics: ['Current Affairs', 'Indian Geography', 'History', 'Polity'] },
      { title: 'General Science', topics: ['Physics', 'Chemistry', 'Life Sciences'] },
    ],
    mockTests: [
      { title: 'RRB NTPC CBT 1', date: '12 May 2024', duration: '90 mins', questions: 100 },
    ],
    currentAffairs: []
  },
  {
    examType: 'defense',
    name: 'Defense',
    icon: 'fa-shield-alt',
    color: '#ff5a00',
    description: 'NDA, CDS, AFCAT & Defense Services',
    syllabus: [
      { title: 'Mathematics (NDA)', topics: ['Algebra', 'Calculus', 'Matrices'] },
      { title: 'General Ability Test', topics: ['English', 'General Knowledge'] },
    ],
    mockTests: [
      { title: 'NDA Mathematics Paper 1', date: '20 May 2024', duration: '150 mins', questions: 120 },
    ],
    currentAffairs: []
  },
  {
    examType: 'state-psc',
    name: 'State PSC',
    icon: 'fa-map',
    color: '#ff7f11',
    description: 'UPPSC, BPSC, MPPSC and other State Civil Services Exams',
    syllabus: [
      { title: 'General Studies I', topics: ['State Specific History', 'Geography of State', 'Economy'] },
      { title: 'General Studies II', topics: ['State Polity', 'Local Governance'] },
    ],
    mockTests: [
      { title: 'UPPSC Prelims GS 1', date: '25 May 2024', duration: '120 mins', questions: 150 },
      { title: 'BPSC Prelims', date: '10 Jun 2024', duration: '120 mins', questions: 150 },
    ],
    currentAffairs: [
      { title: 'State Budget 2024 Summary', category: 'Economy', date: '01 Mar 2024'}
    ]
  }
];

const importData = async () => {
  try {
    await connectDB();
    await Exam.deleteMany(); // Clear existing
    await Exam.insertMany(examData);
    console.log('All Exams Imported!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

importData();
