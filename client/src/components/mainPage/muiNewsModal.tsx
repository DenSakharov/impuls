import React, { useState } from 'react';
import './styles/muiNews.scss';

interface AddNewsModalProps {
    onClose: () => void;
}

const MuiNewsModal: React.FC<AddNewsModalProps> = ({ onClose }) => {
    const [date, setDate] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [file, setFile] = useState<File | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const fileList = event.target.files;
        if (fileList) {
            setFile(fileList[0]);
        }
    };

    const handleSubmit = () => {
        console.log({ date, title, content, file });
        onClose();
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <label>Дата:
                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                </label>
                <label>Заголовок:
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                </label>
                <label>Текст новости:
                    <textarea value={content} onChange={(e) => setContent(e.target.value)}></textarea>
                </label>
                <label>Картинка:
                    <input type="file" onChange={handleFileChange} />
                </label>
                <button onClick={handleSubmit}>Добавить</button>
                <button onClick={onClose}>Отмена</button>
            </div>
        </div>
    );
};

export default MuiNewsModal;