import { useSelector } from "react-redux";

// generates 3 arrays for victoryChart based on filters set in DisplayLogic state
// takes in a true or false argument to either render total(home) or individual(students) data
const GenerateData = (isIndivudalStudents) => {

    const allFeedback = useSelector((state) => state.studentFeedback);
    const allDisplayLogic = useSelector((state) => state.displayLogic);
    const difficultyRatings = [];
    const funRatings = [];
    const yAxisLabels = [];

    //itterates over students in state and either adds new course rating object
    //or adds rating to already made course object found in corresponding array
    if (isIndivudalStudents) {
        allFeedback.forEach(student => {
            if (student.selected) {
                student.feedback.forEach(feedback => {
                    const currentCourse = feedback.course;
                    if (!yAxisLabels.some((e) => e === feedback.course)) {
                        yAxisLabels.push(feedback.course);
                    }
                    if (!difficultyRatings.some((e) => e.course === currentCourse)) {
                        let difficultyRatingObject = {
                            course: currentCourse,
                            difficulty: [feedback.difficulty]
                        }
                        difficultyRatings.push(difficultyRatingObject);
                    } else {
                        let difficultyIndex = difficultyRatings.findIndex((e) => e.course === currentCourse);
                        difficultyRatings[difficultyIndex].difficulty.push(feedback.difficulty);
                    }
                    if (!funRatings.some((e) => e.course === currentCourse)) {
                        let funRatingObject = {
                            course: currentCourse,
                            fun: [feedback.fun]
                        }
                        funRatings.push(funRatingObject);
                    } else {
                        let funIndex = funRatings.findIndex((e) => e.course === currentCourse);
                        funRatings[funIndex].fun.push(feedback.fun);
                    }
                })
            }
        });
    } else {
        allFeedback.forEach(student => {
            student.feedback.forEach(feedback => {
                const currentCourse = feedback.course;
                if (!yAxisLabels.some((e) => e === feedback.course)) {
                    yAxisLabels.push(feedback.course);
                }
                if (!difficultyRatings.some((e) => e.course === currentCourse)) {
                    let difficultyRatingObject = {
                        course: currentCourse,
                        difficulty: [feedback.difficulty]
                    }
                    difficultyRatings.push(difficultyRatingObject);
                } else {
                    let difficultyIndex = difficultyRatings.findIndex((e) => e.course === currentCourse);
                    difficultyRatings[difficultyIndex].difficulty.push(feedback.difficulty);
                }
                if (!funRatings.some((e) => e.course === currentCourse)) {
                    let funRatingObject = {
                        course: currentCourse,
                        fun: [feedback.fun]
                    }
                    funRatings.push(funRatingObject);
                } else {
                    let funIndex = funRatings.findIndex((e) => e.course === currentCourse);
                    funRatings[funIndex].fun.push(feedback.fun);
                }
            })
        });
    };

    //calcualtes averages based on all entries
    difficultyRatings.forEach((entry, index) => {
        let averageDifficulty = entry.difficulty.reduce((a, b) => a + b, 0) / entry.difficulty.length;
        difficultyRatings[index].difficulty = averageDifficulty;
    })
    funRatings.forEach((entry, index) => {
        let averageFun = entry.fun.reduce((a, b) => a + b, 0) / entry.fun.length;
        funRatings[index].fun = averageFun;
    })

    //sorting based on filter settings
    if (allDisplayLogic.sortDifficulty) {
        let sortDifficultyList = [];
        for (let i = 0; i < difficultyRatings.length; i++) {
            sortDifficultyList.push({ course: yAxisLabels[i], difficulty: difficultyRatings[i].difficulty, fun: funRatings[i].fun });
        };
        sortDifficultyList.sort((a, b) => (a.difficulty > b.difficulty) ? 1 : ((b.difficulty > a.difficulty) ? -1 : 0));
        difficultyRatings.splice(0, difficultyRatings.length);
        funRatings.splice(0, funRatings.length);
        yAxisLabels.splice(0, yAxisLabels.length);
        for (let j = 0; j < sortDifficultyList.length; j++) {
            difficultyRatings[j] = { course: sortDifficultyList[j].course, difficulty: sortDifficultyList[j].difficulty };
            funRatings[j] = { course: sortDifficultyList[j].course, fun: sortDifficultyList[j].fun };
            yAxisLabels[j] = sortDifficultyList[j].course;
        }
    };
    if (allDisplayLogic.sortFun) {
        let sortFunList = [];
        for (let i = 0; i < funRatings.length; i++) {
            sortFunList.push({ course: yAxisLabels[i], difficulty: difficultyRatings[i].difficulty, fun: funRatings[i].fun });
        };
        sortFunList.sort((a, b) => (a.fun > b.fun) ? 1 : ((b.fun > a.fun) ? -1 : 0));
        difficultyRatings.splice(0, difficultyRatings.length);
        funRatings.splice(0, funRatings.length);
        yAxisLabels.splice(0, yAxisLabels.length);
        for (let j = 0; j < sortFunList.length; j++) {
            difficultyRatings[j] = { course: sortFunList[j].course, difficulty: sortFunList[j].difficulty };
            funRatings[j] = { course: sortFunList[j].course, fun: sortFunList[j].fun };
            yAxisLabels[j] = sortFunList[j].course;
        }
    };

    //returns object with the 3 needed arrays
    return { difficultyRating: difficultyRatings, funRatings: funRatings, yAxisLabels, yAxisLabels };
}


export default GenerateData;