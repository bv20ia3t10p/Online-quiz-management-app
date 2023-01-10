import React, { useEffect, useState } from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend, ArcElement
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useGlobalContext } from "../../setup/Context";
import { useLecContext } from '../LecContext'; import { Pie } from "react-chartjs-2";
import {
    AiOutlineForm,
    AiOutlineBarChart,
    AiOutlineAlert,
} from "react-icons/ai";

const PieChart = ({ data }) => {
    if (!data) return <>Loading</>
    return (
        <Pie
            data={data}
            options={{ responsive: true, maintainAspectRatio: false }}
        />
    );
};

const pieChartData = (data) => {
    if (!data) return;
    const goodScore = data.reduce(
        (sum, n) => (parseFloat(n) > 8 ? sum + 1 : sum),
        0
    );
    const decentScore = data.reduce(
        (sum, n) => (parseFloat(n) > 5 && parseFloat(n) < 8 ? sum + 1 : sum),
        0
    );
    const badScore = data.reduce(
        (sum, n) => (parseFloat(n) < 5 ? sum + 1 : sum),
        0
    );
    const vari = [goodScore, decentScore, badScore]
    return {
        labels: ["Good (8~)", "Decent (5~8)", "Bad(~5)"],
        datasets: [
            {
                labels: "Class average score",
                data: vari,
                backgroundColor: [
                    "rgba(15, 76, 120,1)",
                    "rgba(255, 120, 36,1)",
                    "rgba(190, 3, 30,01",
                ],
                borderColor: [
                    "rgba(95, 15, 64, 1)",
                    "rgba(95, 15, 64, 1)",
                    "rgba(95, 15, 64,1)",
                ],
                borderWidth: 0.5,
            },
        ],
    };
};

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: "bottom",
        },
        title: {
            display: true,
            text: "Exam scores",
        },
    },
    maintainAspectRatio: true,
};

const chartData = (data) => {
    const classNames = data.map((n) => n.className);
    const classAvg = data.map((n) => n.classAvg)
    const maxScores = data.map((n) => n.maxScore);
    const minScores = data.map((n) => n.minScore);
    return {
        labels: classNames,
        datasets: [
            {
                fill: true,
                label: "Average score for class",
                data: classAvg,
                borderColor: "rgb(255, 190, 11)",
                backgroundColor: "rgba(255, 190, 11, 0.5)",
            },
            {
                fill: true,
                label: "Highest score in class",
                data: maxScores,
                borderColor: "rgb(131,56,236)",
                backgroundColor: "rgba(131, 56, 236, 0.2)",
            },
            {
                fill: true,
                label: "Lowest score in class",
                data: minScores,
                borderColor: "rgb(255, 0, 110)",
                backgroundColor: "rgba(255, 0, 110,0.8)",
            },
        ],
    };
};

ChartJS.register(ArcElement,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
);


const LecHomeLineChart = () => {
    const { classes } = useLecContext();
    const { uid } = useGlobalContext();
    const [analysedData, setAnalysedData] = useState({ numExams: 0, avgScore: 0, numClasses: 0 })
    useEffect(() => {
        setAnalysedData({
            numExams: classes.reduce((sum, n) => sum + parseFloat(n.examNumbers), 0),
            avgScore: classes.reduce((sum, n) => sum + parseFloat(n.classAvg), 0) / classes.length,
            numClasses: classes.length,
            variations: classes.map((n) => n.classAvg)
        });
    }, [classes])
    if (!analysedData) return <>Loading</>
    return (
        <div className="stu-stat-page lec">
            <div className="stu-stat-lineChart-container">
                {typeof classes.length && (
                    <Line options={options} data={chartData(classes)} />
                )}
            </div>
            <div className="stu-stat-pieChart-container">
                {typeof analysedData.variations && (
                    <PieChart data={pieChartData(analysedData.variations)} />
                )}
            </div>
            <div className="cards greetings">
                <h1>Welcome to Quizzer</h1>
                <p>Hello, lecturer {uid}, this is your dashboard. Have a great day!</p>
            </div>
            <div className="cards">
                <AiOutlineForm className="ico" />
                <div className="headings">
                    <h1>{analysedData.numExams}</h1>
                    <h2>Exams done</h2>
                </div>
                <p>Number of exams taken by students</p>
            </div>
            <div className="cards">
                <AiOutlineBarChart className="ico" />
                <div className="headings">
                    <h1>{parseFloat(analysedData.avgScore).toFixed(2)}</h1>
                    <h2>Average score</h2>
                </div>
                <p>An average of class results</p>
            </div>
            <div className="cards">
                <AiOutlineAlert className="ico" />
                <div className="headings">
                    <h1>{analysedData.numClasses}</h1>
                    <h2>classes</h2>
                </div>
                <p>Classes under your guidance</p>
            </div>
        </div>
    )
}

export default LecHomeLineChart