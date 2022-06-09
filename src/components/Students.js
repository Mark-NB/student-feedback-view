import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { VictoryBar, VictoryChart, VictoryAxis, VictoryLegend, VictoryGroup, VictoryZoomContainer, VictoryLabel } from "victory";
import { setStudentSelector } from "../features/displayLogic/displayLogicSlice";
import GenerateData from "../features/GenerateData";
import { setStudentSelected } from "../features/studentFeedback/studenFeedbackSlice";
import './Students.css';


const Student = () => {

    const dispatch = useDispatch();
    const allFeedback = useSelector((state) => state.studentFeedback);
    const allDisplayLogic = useSelector((state) => state.displayLogic);
    const allStudents = allFeedback.map(entry => entry.name);
    //generates the data to show in VictoryChart
    const generatedData = GenerateData(true);
    const difficultyRatings = [...generatedData.difficultyRating];
    const funRatings = [...generatedData.funRatings];
    const yAxisLabels = [...generatedData.yAxisLabels];

    let legendData = []; //AGAIN with the legend...
    if (allDisplayLogic.showDifficulty && allDisplayLogic.showFun) {
        legendData = [
            { name: "Difficulty" },
            { name: "Fun" }
        ];
    };
    if (!allDisplayLogic.showDifficulty && allDisplayLogic.showFun) {
        legendData = [
            { name: "Fun" }
        ];
    };
    if (allDisplayLogic.showDifficulty && !allDisplayLogic.showFun) {
        legendData = [
            { name: "Difficulty" }
        ];
    };
    if (!allDisplayLogic.showDifficulty && !allDisplayLogic.showFun) {
        legendData = [];
    };

    //changes state to toggle student "selected" for individual/grouped view
    const handleAddStudent = (event) => {
        let selectedStudent = event.target.value;
        dispatch(setStudentSelector("select a student"));
        dispatch(setStudentSelected(selectedStudent));
    };

    //changes state to untoggle student "selected"
    const handleRemoveStudent = (student) => {
        dispatch(setStudentSelected(student));
    }

    return (
        <main className="app-container__main">
            <div className="main__top-container">
                <div className="top-container__select">
                    <select
                        value={allDisplayLogic.studentSelector}
                        onChange={(e) => handleAddStudent(e)}
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
                    <p>Select students for individual or combined feedback</p>
                </div>
                <h2 className="main__header">Selected student feedback</h2>
                <div className="top-container__selected">
                    <ul>
                        {allFeedback.map((student) => {
                            if (student.selected) {
                                return <li
                                    value={student.name}
                                    key={`selected${student.name}`}
                                    onClick={(e) => handleRemoveStudent(student.name)}
                                >{student.name}</li>
                            } else {
                                return ""
                            }
                        })}
                    </ul>
                    <p>Students currently selected (click to remove)</p>
                </div>
            </div>
            <div className="main__victory">
                <VictoryChart
                    padding={{ top: 35, left: 20, right: 20, bottom: 80 }}
                    containerComponent={<VictoryZoomContainer
                        zoomDimension="x" />}
                >
                    <VictoryLabel
                        x={365}
                        y={30}
                        text="(use scrollwheel to zoom)"
                        style={{
                            fontSize: 6,
                            fontFamily: 'Dosis',
                            fontWeight: 600,
                        }}
                    />
                    <VictoryLegend
                        x={25}
                        y={15}
                        orientation="horizontal"
                        gutter={20}

                        style={{
                            labels: {
                                fontSize: "10",
                                fontFamily: 'Dosis',
                                fontWeight: 600,
                            }
                        }}
                        colorScale={["#D17FD6", "#75D9A0"]}
                        data={legendData}
                    />
                    <VictoryAxis
                        tickFormat={yAxisLabels}
                        offset={3}
                        style={{
                            tickLabels: {
                                fontSize: 6,
                                fontFamily: 'Dosis',
                                fontWeight: 600,
                                padding: 0,
                                angle: 300,
                                verticalAnchor: "middle",
                                textAnchor: 'end'
                            }
                        }}
                    />
                    <VictoryAxis
                        dependentAxis
                        tickFormat={[1, 2, 3, 4, 5]}
                        style={{
                            grid: { stroke: "lightgrey" },
                            tickLabels: {
                                fontSize: 8,
                                fontFamily: 'Dosis',
                                fontWeight: 600,
                                padding: 5
                            }
                        }}
                    />
                    <VictoryGroup
                        offset={3}
                        colorScale={["#D17FD6", "#75D9A0"]}
                    >
                        <VictoryBar
                            data={allDisplayLogic.showDifficulty ? difficultyRatings : []}
                            x="course"
                            y="difficulty"
                            barWidth={3}
                        />
                        <VictoryBar
                            data={allDisplayLogic.showFun ? funRatings : []}
                            x="course"
                            y="fun"
                            barWidth={3}
                        />
                    </VictoryGroup>
                </VictoryChart>
            </div>
        </main>
    )
};

export default Student;