import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const studentFeedbackSlice = createSlice({
    name: "studentFeedback",
    initialState,
    reducers: {
        addStudent: (state, student) => {
            if (!state.some((e) => e.name === student.payload.name)) {
                state.push(student.payload);
            }
        },
        addFeedback: (state, feedbackInput) => {
            let studentName = feedbackInput.payload.name;
            let feedbackObject = {
                course: feedbackInput.payload.course,
                difficulty: feedbackInput.payload.difficulty,
                fun: feedbackInput.payload.fun
            }
            const studentIndex = state.map(e => e.name).indexOf(studentName);
            if (!state[studentIndex].feedback.some((e) => e.course === feedbackInput.payload.course)) {
                state[studentIndex].feedback.push(feedbackObject);
            }
        },
        setStudentSelected: (state, student) => {
            let studentName = student.payload;
            const studentIndex = state.map(e => e.name).indexOf(studentName);
            state[studentIndex].selected = !state[studentIndex].selected;
        }
    }
})

export const { addStudent, addFeedback, setStudentSelected } = studentFeedbackSlice.actions;
export default studentFeedbackSlice.reducer;