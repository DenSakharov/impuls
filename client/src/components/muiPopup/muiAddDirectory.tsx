import React from 'react';
import './styles/muiAddDirectory.scss';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const MuiAddDirectory: React.FC<ModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>Форма создания новой папки</h2>
                </div>
                <div className="modal-body">
                    <form>
                        <label htmlFor="parent">Родитель</label>
                        <select id="parent" name="parent">
                            {/* Опции должны быть добавлены здесь */}
                        </select>

                        <label htmlFor="name">Название</label>
                        <input id="name" name="name" type="text" />

                        <label htmlFor="type">Тип папки</label>
                        <select id="type" name="type">
                            <option value="0">-</option>
                            <option value="1">Тип 1</option>
                            <option value="2">Тип 2</option>
                        </select>

                        <div className="modal-footer">
                            <button type="submit">Сохранить</button>
                            <button type="button" onClick={onClose}>Отменить</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default MuiAddDirectory;