import React, { useState, useEffect } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  XAxis,
  YAxis,
  Area,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { useGlobalContext } from "../setup/Context";
//  $ npm install recharts
// select sa.ID_class as classID, s.description as classDescription,
//  sa.selection as score
// from student_answer sa
// inner join questions q
// on sa.ID_question = q.id
// inner join classes c
// on sa.ID_class = c.id
// inner join subjects s
// on c.id_subject = s.id
// where sa.ID_student='20521'
// and sa.selection = q.correct
// group by sa.ID_student, sa.ID_class,sa.ID_exam,s.description;
const getScore = async (uid, phpHandler, setData) => {
  const url = phpHandler + `?getScore=${uid}`;
  const resp = await fetch(url);
  const data = await resp.json();
  setData({ ...data, personal: data });
};

const getEveryoneScore = async (uid, phpHandler, setData) => {
  const url = phpHandler + `?getAllScore=$`;
};

const StuStat = () => {
  const [data, setData] = useState({ personal: [], everyone: [] });
  const { uid, phpHandler } = useGlobalContext();
  useEffect(() => {
    getScore(uid, phpHandler, setData);
  }, [phpHandler, uid]);
  return (
    <div>
      <ResponsiveContainer width="80%" height={500}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6b21a8" />
              <stop offset="90%" stopColor="#ec4899" stopOpacity={0.05} />
            </linearGradient>
          </defs>
          <Area
            dataKey="score"
            stroke="#ff1605"
            fill="url(#color)"
            strokeWidth={3}
          />
          <XAxis
            dataKey="classDescription"
            axisLine={false}
            tickLine={true}
            tickCount={data.length + 2}
            interval={0}
          />

          <YAxis
            domain={[0, 10]}
            datakey="score"
            axisLine={false}
            tickLine={false}
            tickCount={10}
          />

          <Tooltip content={<CustomTooltip />} />

          <CartesianGrid opacity={0.4} vertical={false} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
function CustomTooltip({ active, payload, label }) {
  if (active) {
    return (
      <div className="tooltip">
        <h4>{label}</h4>
        <p>{payload[0].value}</p>
        {console.log(payload)}
      </div>
    );
  }
  return null;
}

export default StuStat;
