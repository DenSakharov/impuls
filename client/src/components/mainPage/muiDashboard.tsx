import React from 'react';
import { Card, Typography, Box } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { PieChart, Pie, Tooltip as RechartsTooltip, Cell, Legend as RechartsLegend } from 'recharts';

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

// Тип для элемента данных
interface TaskData {
    name: string; // Название приоритета
    value: number; // Количество задач
}

// Цвета для разных приоритетов
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const MuiDashboard: React.FC = () => {
    // Данные для диаграммы
    const pieData: TaskData[] = [
        { name: 'Низкий', value: 300 },
        { name: 'Средний', value: 200 },
        { name: 'Высокий', value: 150 },
        { name: 'Критический', value: 100 }
    ];
    return (
        <Box>
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
            <Card sx={{ padding: '20px', margin: '20px' }}>
                <Typography variant="h5" gutterBottom>Задачи</Typography>
                <Typography>С низким приоритетом: 300</Typography>
                <Typography>С средним приоритетом: 200</Typography>
                <Typography>С высоким приоритетом: 150</Typography>
                <Typography>С критическим приоритетом: 100</Typography>
                <Box height={400}>
                    <PieChart width={400} height={400}>
                        <Pie
                            dataKey="value"
                            isAnimationActive={false}
                            data={pieData}
                            cx={200}
                            cy={200}
                            outerRadius={80}
                            fill="#8884d8"
                            label
                        >
                            {pieData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <RechartsTooltip />
                        <RechartsLegend />
                    </PieChart>
                </Box>
            </Card>
        </Box>
    );
};

export default MuiDashboard;

