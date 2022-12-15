import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useGlobalContext } from "../../setup/Context";
import {
  getScore,
  chartData,
  options,
  analyseData,
  pieChartData,
} from "./stuStatDataHandler";
import PieChart from "./PieChart";
import {
  AiOutlineForm,
  AiOutlineBarChart,
  AiOutlineAlert,
} from "react-icons/ai";
//  $ npm install recharts

// select s.description as subjectDescription,
// c.name as className, score
// from student_exams se
// inner join classes c on se.id_class = c.id
// inner join subjects s on c.id_subject = s.id;

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

//encodeURI
const StuStat = () => {
  const [data, setData] = useState({ personal: [], everyone: [] });
  const [analysedData, setAnalysedData] = useState({
    examCount: 0,
    avgScore: 0,
    aboveAverage: 0,
    variations: [],
  });
  const { uid, phpHandler } = useGlobalContext();
  useEffect(() => {
    if (!uid) return;
    getScore(uid, phpHandler, setData);
  }, [phpHandler, uid]);
  useEffect(() => {
    if (!data.personal.score) return;
    setAnalysedData(analyseData(data.personal.score));
  }, [data]);
  return (
    <div className="stu-stat-page">
      <div className="stu-stat-lineChart-container">
        {typeof data.personal.score && (
          <Line options={options} data={chartData(data)} />
        )}
      </div>
      <div className="stu-stat-pieChart-container">
        {typeof analysedData.variations && (
          <PieChart data={pieChartData(analysedData.variations)} />
        )}
      </div>
      <div className="cards greetings">
        <h1>Welcome to Quizzer</h1>
        <p>Hello, student {uid}, this is your dashboard. Have a great day!</p>
      </div>
      <div className="cards">
        <AiOutlineForm className="ico" />
        <div className="headings">
          <h1>{analysedData.examCount}</h1>
          <h2>Exams done</h2>
        </div>
        <p>All of those you sit through</p>
      </div>
      <div className="cards">
        <AiOutlineBarChart className="ico" />
        <div className="headings">
          <h1>{parseFloat(analysedData.avgScore).toFixed(2)}</h1>
          <h2>Average score</h2>
        </div>
        <p>An average of your results</p>
      </div>
      <div className="cards">
        <AiOutlineAlert className="ico" />
        <div className="headings">
          <h1>{(analysedData.aboveAverage * 100).toFixed(2)}</h1>
          <h2>%</h2>
        </div>
        <p>Chance of getting a score {`>5`}</p>
      </div>
    </div>
  );
};

export default StuStat;
