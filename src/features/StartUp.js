import Papa from 'papaparse';
import feedbackInputCSV from '../recources/Winc Eindopdracht – Studenten Mock data – Frontend Cursus Opdrachten - Blad1.csv';
import mockarooData from '../recources/winc_student.json';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addFeedback, addStudent } from './studentFeedback/studenFeedbackSlice';

const CSVParse = [];
const studentNamesAdded = [];
const MockarooDataJSON = mockarooData;
let mockarooDataCount = 0;

//papaparse used to parse provided CSV file
const papaConfig = {
  complete: (results, file) => {
    console.log('Parsing complete:', results, file);
    CSVParse.push(results.data);
    if (CSVParse[0][0][0] === "Wie ben je?") {
      CSVParse[0].splice(0, 1);
    }
  },
  download: true,
  error: (error, file) => {
    console.log('Error while parsing:', error, file);
  },
};
Papa.parse(feedbackInputCSV, papaConfig);

//generates students for state
const generateStartupStudent = (parse) => {
  const mockarooData = MockarooDataJSON[mockarooDataCount];
  mockarooDataCount++;
  const [name] = parse;
  let student = {
    name: name,
    feedback: [],
    last_name: mockarooData.last_name,
    age: mockarooData.age,
    phone: mockarooData.phone,
    email: mockarooData.email,
    avatar: mockarooData.avatar,
    selected: false
  }
  return student;
};

//generates feedback for state
const generateStartupFeedback = (parse) => {
  const [name, course, difficulty, fun] = parse;
  let feedback = {
    name: name,
    course: course,
    difficulty: parseInt(difficulty),
    fun: parseInt(fun)
  }
  return feedback;
};


//itterates over parsed CSV file and adds students and feedback to state
const StartUp = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    CSVParse[0].forEach((parse) => {
      let name = parse[0];
      if (!studentNamesAdded.some((e) => e === name)) {
        const newStudent = generateStartupStudent(parse);
        dispatch(addStudent(newStudent));
        studentNamesAdded.push(parse[0]);
      }
      const feedback = generateStartupFeedback(parse);
      dispatch(addFeedback(feedback));
    })
  }, [])
  return null;
};

export default StartUp;