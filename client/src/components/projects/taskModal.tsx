import React, { useState } from 'react';

interface TaskModalProps {
    isOpen: boolean;
    onClose: () => void;
    task?: any; // Тип данных задачи можно определить подробнее в зависимости от вашей модели данных
}

const TaskModal: React.FC<TaskModalProps> = ({ isOpen, onClose, task }) => {
    if (!isOpen) return null;

    // Функция для обработки отправки формы
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        // Здесь можно добавить логику обработки данных формы
        console.log('Form submitted');
        onClose(); // Закрыть модальное окно после отправки
    };

    return (
        <div className="modal-overlay" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-content" style={{ backgroundColor: 'white', padding: 20, borderRadius: 5, maxWidth: 500, margin: '40px auto' }}>
                <form onSubmit={handleSubmit}>
                    <h4>Задача</h4>
                    <label>Название:</label>
                    <input type="text" defaultValue={task?.name} />
                    <label>Сроки выполнения:</label>
                    <input type="date" defaultValue={task?.startDate} /> - <input type="date" defaultValue={task?.endDate} />
                    <label>Исполнители:</label>
                    <select defaultValue={task?.executor}>
                        <option value="1">Иванов И.В.</option>
                        <option value="2">Петров П.П.</option>
                    </select>
                    <label>Приоритет:</label>
                    <select defaultValue={task?.priority}>
                        <option value="high">Высокий</option>
                        <option value="medium">Средний</option>
                        <option value="low">Низкий</option>
                    </select>
                    <button type="submit">Сохранить</button>
                    <button type="button" onClick={onClose}>Отмена</button>
                </form>
            </div>
        </div>
    );
};

export default TaskModal;
