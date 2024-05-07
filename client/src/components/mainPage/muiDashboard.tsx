import React from 'react';
import { Card, Typography, Box } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
const data = {
    labels: ['Январь', 'Февраль', 'Март'],
    datasets: [
        {
            label: 'Количество проектов',
            data: [6, 3, 1],
            backgroundColor: 'rgba(136, 132, 216, 0.5)',
        },
        {
            label: 'Количество задач',
            data: [1, 1, 1],
            backgroundColor: 'rgba(130, 202, 157, 0.5)',
        },
        {
            label: 'Количество документов',
            data: [13, 8, 7],
            backgroundColor: 'rgba(255, 198, 88, 0.5)',
        }
    ]
};

const options = {
    scales: {
        y: {
            beginAtZero: true,
            ticks: {
                precision: 0  // Убедитесь, что значения тиков на оси Y являются целыми числами.
            }
        }
    },
    plugins: {
        legend: {
            display: true  // Включает или отключает легенду диаграммы.
        }
    }
};

const MuiDashboard: React.FC = () => {
    return (
        <Card sx={{ padding: '20px', margin: '20px' }}>
            <Typography variant="h5" gutterBottom>Ключевые показатели</Typography>
            <Typography>Количество проектов: 34</Typography>
            <Typography>Количество задач: 14</Typography>
            <Typography>Количество документов: 67</Typography>
            <Typography>&nbsp;</Typography>
            <Typography>Динамика по месяцам:</Typography>
            <Box height={300}>
                <Bar data={data} options={options} />
            </Box>
        </Card>
    );
};

export default MuiDashboard;
