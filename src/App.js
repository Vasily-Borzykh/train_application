import React from 'react';
import GanttChart from './GanttChart';
import CounterComponent from './CounterComponent';

const App = () => {
  const ganttData = [
    { train: 'Train 1', start: new Date(2023, 0, 1, 1, 0), end: new Date(2023, 0, 1, 2, 0) },
    { train: 'Train 1', start: new Date(2023, 0, 1, 10, 0), end: new Date(2023, 0, 1, 13, 0) },
    { train: 'Train 3', start: new Date(2023, 0, 1, 10, 0), end: new Date(2023, 0, 1, 12, 0) },
    { train: 'Train 4', start: new Date(2023, 0, 1, 11, 0), end: new Date(2023, 0, 1, 13, 0) },
    { train: 'Train 5', start: new Date(2023, 0, 1, 12, 0), end: new Date(2023, 0, 1, 14, 0) },
    { train: 'Train 6', start: new Date(2023, 0, 1, 13, 0), end: new Date(2023, 0, 1, 15, 0) },
    { train: 'Train 7', start: new Date(2023, 0, 1, 14, 0), end: new Date(2023, 0, 1, 16, 0) },
    { train: 'Train 8', start: new Date(2023, 0, 1, 15, 0), end: new Date(2023, 0, 1, 17, 0) },
    { train: 'Train 9', start: new Date(2023, 0, 1, 16, 0), end: new Date(2023, 0, 1, 18, 0) },
    { train: 'Train 2', start: new Date(2023, 0, 1, 10, 0), end: new Date(2023, 0, 1, 13, 0) },
  ];

  // Добавляем свойство xEnd для записи второго конца прямоугольника
  const formattedGanttData = ganttData.map((item) => ({
    ...item,
    xEnd: item.end,
  }));

  return (
    <div>
      <h1>Gantt Chart</h1>
      <GanttChart data={formattedGanttData} />
    </div>
  );
};

export default App;
