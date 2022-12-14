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
};

const chartData = (data) => {
  return {
    labels: data.personal.className,
    datasets: [
      {
        fill: true,
        label: "Your score",
        data: data.personal.score,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        fill: true,
        label: "Everyone's score",
        data: data.everyone.score,
        borderColor: "rgb(245, 40, 145)",
        backgroundColor: "rgba(245, 40, 145, 0.5)",
      },
    ],
  };
};

const getScore = async (uid, phpHandler, setData) => {
  const url = phpHandler + `?getScore=${uid}`;
  console.log(url);
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
  console.log(url);
  const resp = await fetch(url);
  const fetchedData = await resp.json();
  const newData = separateData(fetchedData);
  setData({ personal: personalData, everyone: newData });
};

export { getEveryoneScore, getScore, separateData, chartData, options };
