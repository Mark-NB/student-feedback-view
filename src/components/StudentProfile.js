import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentProfile, setStudentProfileSelector } from "../features/displayLogic/displayLogicSlice";
import './StudentProfile.css';

const StudentProfile = () => {

    const dispatch = useDispatch();
    const allFeedback = useSelector((state) => state.studentFeedback);
    const allDisplayLogic = useSelector((state) => state.displayLogic);
    const allStudents = allFeedback.map(entry => entry.name);
    const { name, feedback, last_name, age, phone, email, avatar } = allDisplayLogic.currentProfile;

    const setStudentProfileObject = (selectedStudent) => {
        let studentIndex = allFeedback.findIndex((e) => e.name === selectedStudent);
        let studentProfileObject = { ...allFeedback[studentIndex] };
        dispatch(setCurrentProfile(studentProfileObject));
    }

    const handleStudentProfileSelector = (e) => {
        const selectedStudent = e.target.value;
        if (e.target.value !== "select a student") {
            dispatch(setStudentProfileSelector(selectedStudent));
            setStudentProfileObject(selectedStudent);
        }
    };

    return (
        <main className="app-container__main">
            <h2 className="main__header">Student profile</h2>
            <div className="main__student-select">
                <span>Select student</span>
                <select
                    value={allDisplayLogic.studentProfileSelector}
                    onChange={(e) => handleStudentProfileSelector(e)}
                    name="studentList">
                    <option
                        value="select a student"
                        key="select a student"
                    >select a student</option>
                    {allStudents.map((student) => {
                        return <option
                            value={student}
                            key={`option${student}`}
                        >{student}</option>
                    })}
                </select>
            </div>
            {allDisplayLogic.currentProfile ?
                <div className="main__student-profile">
                    <img
                        src={avatar}
                        alt="user avatar"
                        width="150"
                        height="150"
                        className="student-profile__img" />
                    <div className="student-profile__info">
                        <p>{`First name: ${name}`}</p>
                        <p>{`Last name: ${last_name}`}</p>
                        <p>{`Age: ${age}`}</p>
                        <p>{`Phone number: ${phone}`}</p>
                        <p>{`E-Mail: ${email}`}</p>
                    </div>
                    <select
                        className="student-profile__feedback"
                        name="studentFeedbackList"
                        value="feedbackList"
                        readOnly>
                        <option
                            value="feedbackList"
                            key="feedbackList"
                        >Feedback given</option>
                        {allDisplayLogic.currentProfile.feedback.map((feedback) => {
                            return <option
                                value={feedback.course}
                                key={`feedback${feedback.course}`}
                            >{`=== Course: ${feedback.course} === Difficulty: ${feedback.difficulty} === Fun: ${feedback.fun} ===`}</option>
                        })}
                    </select>
                </div>
                : ""}
        </main>
    )
};

export default StudentProfile;