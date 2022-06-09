import React from "react";
import { useSelector } from "react-redux";
import { VictoryBar, VictoryChart, VictoryAxis, VictoryLegend, VictoryGroup, VictoryZoomContainer, VictoryLabel } from "victory";
import GenerateData from "../features/GenerateData";
import './Home.css';

const Home = () => {

    const allDisplayLogic = useSelector((state) => state.displayLogic);
    //generates the data to show in VictoryChart
    const generatedData = GenerateData(false);
    const difficultyRatings = [...generatedData.difficultyRating];
    const funRatings = [...generatedData.funRatings];
    const yAxisLabels = [...generatedData.yAxisLabels];

    let legendData = []; //There HAS to be a better way to make the legend dynamic...
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



    return (
        <main className="app-container__main">
            <h2 className="main__header">All feedback average</h2>
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
                        colorScale={["#69DFDB", "#FA7036"]}
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
                        colorScale={["#69DFDB", "#FA7036"]}
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

export default Home;