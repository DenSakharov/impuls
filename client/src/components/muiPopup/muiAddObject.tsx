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
    const [attachments, setAttachments] = useState<File[]>([]);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        // Обработка данных формы
        onClose(); // Закрыть модальное окно после отправки формы
    };

    const handleAttachment = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setAttachments([...attachments, ...Array.from(event.target.files)]);
        }
    };

    if (!isOpen) {
        return null;
    }

    return (
        <div className="modal-overlay">
            <div className="modal">
                <div className="modal-header">
                    <h2>Форма создания нового объекта</h2>
                </div>
                <form onSubmit={handleSubmit} className="form-create-object">
                    <label htmlFor="name">Название</label>
                    <input
                        id="name"
                        type="text"
                        value={objectName}
                        onChange={(e) => setObjectName(e.target.value)}/>

                    <label htmlFor="type">Тип объекта</label>
                    <select
                        id="type"
                        value={objectType}
                        onChange={(e) => setObjectType(e.target.value)}>
                        <option value="0">-</option>
                        <option value="1">Документ</option>
                        <option value="2">Задача</option>
                    </select>

                    <label htmlFor="description">Описание</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}/>

                    <div className="attachments">
                        <label htmlFor="file-upload" className="add-attachment-button">+</label>
                        <input
                            id="file-upload"
                            type="file"
                            style={{ display: 'none' }}
                            onChange={handleAttachment} />
                        <div className="attachment-names">
                            {attachments.map((file, index) => (
                                <div key={index} className="attachment-name">{file.name}</div>
                            ))}
                        </div>
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