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
  getEveryoneScore,
  getScore,
  chartData,
  options,
} from "./stuStatDataHandler";

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
  const { uid, phpHandler } = useGlobalContext();
  useEffect(() => {
    getScore(uid, phpHandler, setData);
  }, [phpHandler, uid]);
  return (
    <div className="stu-stat-lineChart-container">
      {typeof data.personal.score && (
        <Line options={options} data={chartData(data)} />
      )}
    </div>
  );
};

export default StuStat;
