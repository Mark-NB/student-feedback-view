import { createSlice } from "@reduxjs/toolkit";

const initialState =
{
    showDifficulty: true,
    showFun: true,
    sortDifficulty: false,
    sortFun: false,
    studentSelector: "",
    studentProfileSelector: "",
    currentProfile: "",
    currentTimeAndDate: "",
    currentQuote: ""
};


export const displayLogicSlice = createSlice({
    name: "displayLogic",
    initialState,
    reducers: {
        changeFilter: (state, change) => {
            let filterToChange = change.payload;
            if (filterToChange === "showDifficulty") {
                state.showDifficulty = !state.showDifficulty;
            }
            if (filterToChange === "showFun") {
                state.showFun = !state.showFun;
            }
            if (filterToChange === "sortDifficulty") {
                state.sortDifficulty = !state.sortDifficulty;
                if (state.sortFun) {
                    state.sortFun = !state.sortFun;
                }
            }
            if (filterToChange === "sortFun") {
                state.sortFun = !state.sortFun;
                if (state.sortDifficulty) {
                    state.sortDifficulty = !state.sortDifficulty;
                }
            }
        },
        setStudentSelector: (state, student) => {
            state.studentSelector = student.payload;
        },
        setStudentProfileSelector: (state, student) => {
            state.studentProfileSelector = student.payload;
        },
        setCurrentProfile: (state, studentObject) => {
            state.currentProfile = studentObject.payload;
        },
        setCurrentTimeAndDate: (state, timeAndDate) => {
            state.currentTimeAndDate = timeAndDate.payload;
        },
        setCurrentQuote: (state, quote) => {
            state.currentQuote = quote.payload;
        }
    }
})

export const {
    changeFilter,
    setStudentSelector,
    setStudentProfileSelector,
    setCurrentProfile,
    setCurrentTimeAndDate,
    setCurrentQuote
} = displayLogicSlice.actions;

export default displayLogicSlice.reducer;