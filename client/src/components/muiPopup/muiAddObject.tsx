import React, { useState } from 'react';
import './styles/muiAddObject.scss';

interface CreateObjectModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const MuiAddObject: React.FC<CreateObjectModalProps> = ({ isOpen, onClose }) => {
    const [objectName, setObjectName] = useState('');
    const [objectType, setObjectType] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        // Обработка данных формы
        onClose(); // Закрыть модальное окно после отправки формы
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal">
                <form onSubmit={handleSubmit} className="form-create-object">
                    <label htmlFor="name">Название</label>
                    <input
                        id="name"
                        type="text"
                        value={objectName}
                        onChange={(e) => setObjectName(e.target.value)}
                    />

                    <label htmlFor="type">Тип объекта</label>
                    <select
                        id="type"
                        value={objectType}
                        onChange={(e) => setObjectType(e.target.value)}
                    >
                        {/* Здесь должны быть ваши варианты для типа объекта */}
                    </select>

                    <label htmlFor="description">Описание</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />

                    <div className="attachments">
                        <button type="button" className="add-attachment-button">+</button>
                    </div>

                    <div className="modal-footer">
                        <button type="submit" className="save-button">Сохранить</button>
                        <button type="button" className="cancel-button" onClick={onClose}>Отменить</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default MuiAddObject;