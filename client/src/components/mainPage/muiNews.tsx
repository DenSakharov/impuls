import React, { useState } from 'react';
import MuiNewsModal from "./muiNewsModal";
import './styles/muiNews.scss';

interface NewsItem {
    date: string;
    title: string;
    content: string;
}

const newsData: NewsItem[] = [
    { date: '12.03.2024', title: 'Новые технологии внедряются постоянно', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...' },
    { date: '02.01.2024', title: 'Как работает продвижение Альфа', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...' },
    { date: '01.01.2024', title: 'Кто управляет системой изнутри?', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...' }
];

const MuiNews: React.FC = () => {
    const [showModal, setShowModal] = useState(false);

    return (
        <div className="news-container">
            <h1>Новости</h1>
            {newsData.map((item, index) => (
                <div key={index} className="news-item">
                    <h2>{item.date}</h2>
                    <h3>{item.title}</h3>
                    <p>{item.content}</p>
                </div>
            ))}
            <button className="add-button" onClick={() => setShowModal(true)}>+</button>
            {showModal && <MuiNewsModal onClose={() => setShowModal(false)} />}
        </div>
    );
};

export default MuiNews;