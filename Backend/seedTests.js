const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Test = require('./models/Test');

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected to seed tests');
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const upscQuestions = [
  {
    question_text: "Which of the following describes the fundamental purpose of the Constitution of India?",
    options: ["To distribute land equally", "To establish a legal infrastructure for the governance of India", "To declare independence from British rule", "To dictate economic policies"],
    correct_answer: 1,
    explanation: "The Constitution of India establishes the framework demarcating fundamental political code, structure, procedures, powers, and duties of government institutions."
  },
  {
    question_text: "The term 'Mixed Economy' denotes:",
    options: ["Existence of both rural and urban sectors", "Existence of both private and public sectors", "Existence of both heavy and light industries", "Existence of both developed and underdeveloped sectors"],
    correct_answer: 1,
    explanation: "A mixed economy is an economic system combining private and public enterprise."
  }
];

const sscQuestions = [
  {
    question_text: "If A = 1 and B = 2, what is the value of C?",
    options: ["1", "2", "3", "4"],
    correct_answer: 2,
    explanation: "Following alphabetical order, C is the 3rd letter."
  },
  {
    question_text: "Who is known as the 'Iron Man of India'?",
    options: ["Jawaharlal Nehru", "Mahatma Gandhi", "Sardar Vallabhbhai Patel", "Subhas Chandra Bose"],
    correct_answer: 2,
    explanation: "Sardar Vallabhbhai Patel integrated the princely states into a united, independent nation."
  }
];

const bankingQuestions = [
  {
    question_text: "What does CRR stand for in Banking?",
    options: ["Cash Reserve Ratio", "Current Repo Rate", "Cash Return Ratio", "Credit Reserve Ratio"],
    correct_answer: 0,
    explanation: "CRR is Cash Reserve Ratio, the minimum percentage of deposits a bank must maintain as cash."
  },
  {
    question_text: "Which is the central bank of India?",
    options: ["State Bank of India", "Reserve Bank of India", "Bank of India", "Central Bank of India"],
    correct_answer: 1,
    explanation: "The Reserve Bank of India (RBI) is the central bank and regulatory body."
  }
];

const railwayQuestions = [
  {
    question_text: "Where is the headquarters of Northern Railway?",
    options: ["Mumbai", "Kolkata", "Chennai", "New Delhi"],
    correct_answer: 3,
    explanation: "The headquarters of Northern Railway is in New Delhi."
  },
  {
    question_text: "Which of the following is the longest railway platform in India?",
    options: ["Gorakhpur", "Hubballi", "Kharagpur", "New Delhi"],
    correct_answer: 1,
    explanation: "Hubballi (Shree Siddharoodha Swamiji Hubballi Station) has the longest railway platform in the world."
  }
];

const defenseQuestions = [
  {
    question_text: "What is the highest peacetime gallantry award in India?",
    options: ["Param Vir Chakra", "Maha Vir Chakra", "Ashoka Chakra", "Kirti Chakra"],
    correct_answer: 2,
    explanation: "The Ashoka Chakra is India's highest peacetime military decoration for valour."
  },
  {
    question_text: "Who is the Supreme Commander of the Indian Armed Forces?",
    options: ["Prime Minister", "Defense Minister", "President", "Chief of Defence Staff"],
    correct_answer: 2,
    explanation: "The President of India is the Supreme Commander of the Indian Armed Forces."
  }
];

const statePscQuestions = [
  {
    question_text: "Which article of the Constitution deals with the formation of new states?",
    options: ["Article 1", "Article 2", "Article 3", "Article 4"],
    correct_answer: 2,
    explanation: "Article 3 deals with the formation of new States and alteration of areas, boundaries or names of existing States."
  },
  {
    question_text: "Panchayati Raj represents:",
    options: ["Centralization of power", "Decentralization of power", "Dictatorship", "Oligarchy"],
    correct_answer: 1,
    explanation: "Panchayati Raj is a system of local self-government indicating decentralization of power."
  }
];

const mockTestsData = [
  {
    exam_type: 'upsc',
    title: 'UPSC Full Mock Test 1',
    level: 'hard',
    duration: 120,
    total_marks: 10,
    language: 'English',
    questions: upscQuestions
  },
  {
    exam_type: 'ssc',
    title: 'SSC CGL Tier 1 Mock',
    level: 'moderate',
    duration: 60,
    total_marks: 10,
    language: 'English',
    questions: sscQuestions
  },
  {
    exam_type: 'banking',
    title: 'IBPS PO Prelims',
    level: 'moderate',
    duration: 60,
    total_marks: 10,
    language: 'English',
    questions: bankingQuestions
  },
  {
    exam_type: 'railway',
    title: 'RRB NTPC CBT 1',
    level: 'easy',
    duration: 90,
    total_marks: 10,
    language: 'English',
    questions: railwayQuestions
  },
  {
    exam_type: 'defense',
    title: 'NDA Mathematics Paper 1',
    level: 'hard',
    duration: 150,
    total_marks: 10,
    language: 'English',
    questions: defenseQuestions
  },
  {
    exam_type: 'state-psc',
    title: 'UPPSC Prelims GS 1',
    level: 'moderate',
    duration: 120,
    total_marks: 10,
    language: 'English',
    questions: statePscQuestions
  }
];

const importData = async () => {
  try {
    await connectDB();
    await Test.deleteMany(); // Clear existing
    await Test.insertMany(mockTestsData);
    console.log('Unique Tests and Questions Imported!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

importData();
