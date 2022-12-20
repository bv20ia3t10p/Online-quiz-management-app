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
  maintainAspectRatio: false,
};

const chartData = (data) => {
  return {
    labels: data.personal.className,
    datasets: [
      {
        fill: true,
        label: "Your score",
        data: data.personal.score,
        borderColor: "rgb(230, 30, 0)",
        backgroundColor: "rgba(255, 0, 0, 0.5)",
      },
      {
        fill: true,
        label: "Class average",
        data: data.everyone.score,
        borderColor: "rgb(0, 30, 230)",
        backgroundColor: "rgba(0, 0, 255, 0.5)",
      },
    ],
  };
};

const getScore = async (uid, phpHandler, setData) => {
  const url = phpHandler + `?getScore=${uid}`;
  const resp = await fetch(url);
  const fetchedData = await resp.json();
  const newData = separateData(fetchedData);
  getEveryoneScore(newData.className, phpHandler, setData, newData);
};

const separateData = (data) => {
  if (!data) return {};
  const className = data.map((n) => n.className);
  const score = data.map((n) => n.score);
  const subjectDescription = data.map((n) => n.subjectDescription);
  return { className, score, subjectDescription };
};
const getEveryoneScore = async (
  classList,
  phpHandler,
  setData,
  personalData
) => {
  const url = encodeURI(
    phpHandler +
      `?getAllScore=${classList.map((n, index) => {
        if (index < classList.length - 1) return `"${n}"`;
        return `"${n}"`;
      })}`
  );
  const resp = await fetch(url);
  const fetchedData = await resp.json();
  const newData = separateData(fetchedData);
  setData({ personal: personalData, everyone: newData });
};

const analyseData = (data) => {
  const examCount = data.length;
  const avgScore =
    data.reduce((sum, n) => {
      return sum + parseFloat(n);
    }, 0) / examCount;
  const aboveAverage =
    data.reduce((sum, n) => {
      return parseFloat(n) >= 5 ? sum + 1 : sum;
    }, 0) / examCount;
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
  return {
    examCount,
    avgScore,
    aboveAverage,
    variations: [goodScore, decentScore, badScore],
  };
};
const pieChartData = (data) => {
  return {
    labels: ["Good (8~)", "Decent (5~8)", "Bad(~5)"],
    datasets: [
      {
        labels: "Score",
        data: data,
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
export {
  analyseData,
  getEveryoneScore,
  getScore,
  separateData,
  chartData,
  pieChartData,
  options,
};
