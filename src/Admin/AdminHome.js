
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
import { useGlobalContext } from "../setup/Context";
import { Pie } from "react-chartjs-2";
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
  const vari = [data.studentsCount, data.lecturersCount]
  return {
    labels: ["Students", "Lecturers"],
    datasets: [
      {
        labels: "Users",
        data: vari,
        backgroundColor: [
          "rgba(15, 76, 120,1)",
          "rgba(190, 3, 30,01",
        ],
        borderColor: [
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

const getDashboardData = async (phpHander, setData) => {
  const url = phpHander + `?getDashboardDataForAdmin`;
  console.log(url);
  try {
    const resp = await (fetch(url));
    const data = await resp.json();
    if (!data) throw new Error('Failed to get data');
    else setData(data);
  } catch (e) {
    alert(e)
  }
}

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


const getClassesStatForAdmin = async (phpHandler, setClasses) => {
  const url = phpHandler + `?getAllClassStatForAdmin`;
  console.log(url);
  try {
    const resp = await (fetch(url));
    const data = await resp.json();
    if (!data) throw new Error('Failed to get classes information');
    setClasses(data);
  } catch (e) {
    alert(e)
  }
}


const AdminHome = () => {
  const { phpHandler } = useGlobalContext();
  const [data, setData] = useState();
  const { uid } = useGlobalContext();
  const [classes, setClasses] = useState();
  useEffect(() => {
    if (!data) getDashboardData(phpHandler, setData);
    if (!classes) getClassesStatForAdmin(phpHandler, setClasses)
  }, [data, phpHandler])
  if (!data || !classes) return <div className="">Loading</div>
  return <div>
    <div className="stu-stat-page lec adm">
      <div className="stu-stat-lineChart-container">
        {typeof classes.length && (
          <Line options={options} data={chartData(classes)} />
        )}
      </div>
      <div className="stu-stat-pieChart-container">
        {typeof data.variations && (
          <PieChart data={pieChartData(data)} />
        )}
      </div>
      <div className="cards greetings">
        <h1>Welcome to Quizzer</h1>
        <p>Hello, admin {uid}, this is your dashboard. Have a great day!</p>
      </div>
      <div className="cards">
        <AiOutlineForm className="ico" />
        <div className="headings">
          <h1>{data.usersCount}</h1>
          <h2>Users</h2>
        </div>
        <p>Number of users in the system</p>
      </div>
      <div className="cards">
        <AiOutlineBarChart className="ico" />
        <div className="headings">
          <h1>{data.studentExamCount}</h1>
          <h2>Student exams</h2>
        </div>
        <p>Student submissions</p>
      </div>
      <div className="cards">
        <AiOutlineAlert className="ico" />
        <div className="headings">
          <h1>{data.examCounts}</h1>
          <h2>Exams</h2>
        </div>
        <p>Number of created exams</p>
      </div>
    </div>
  </div>;
};

export default AdminHome;
