import React from 'react';
import { Line } from 'react-chartjs-2';

const LineChart = () => {
    // Данные для графика (заглушка)
    const data = {
        labels: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн'],
        datasets: [
            {
                label: 'Продажи',
                data: [12, 19, 3, 5, 2, 3], // Данные для оси Y
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1,
            },
        ],
    };

    // Опции для настройки внешнего вида графика
const options = {
    scales: {
        y: {
          beginAtZero: true
        }
    }
};

return (
    <div>
        <h2>График продаж за год</h2>
        <Line data={data} options={options} />
        </div>
    );
};

export default LineChart;
