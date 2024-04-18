import React, { useEffect, useRef } from 'react';
import ProjectsScripts from './projectScripts';
import "./styles/material_icons.css";
//import "./styles/materialize.min.css";
//import "./styles/material.indigo-pink.min.css";
import './styles/projects.css';
import Header from './header';
import data from './data'

function Projects() {

    const projects = data.projects
    const documents = data.documents
    const tasks = data.tasks

    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Функция для обработки клика внутри контейнера
        const handleEvent = (event: Event) => {
            const target = event.target as HTMLElement;

            // Проверяем, что клик сделан именно по кнопке с классом 'button-class'
            if (target && target.tagName === 'BUTTON' && target.matches('.mdl-button') && event.type === 'click') {
                alert(`Клик кнопки: ${target.id}`);
            }

            // Обработка изменений в выпадающих списках
            if (target && target.tagName === 'SELECT' && target.classList.contains('select-class') && event.type === 'change') {
                const selectedOption = (target as HTMLSelectElement).selectedOptions[0];
                alert(`ID списка: ${target.id}, ID выбранной записи: ${selectedOption.value}`);
            }
        };

        // Добавляем слушатель событий к контейнеру
        const container = containerRef.current;
        container?.addEventListener('change', handleEvent);
        container?.addEventListener('click', handleEvent);

        // Функция для очистки
        return () => {
            container?.removeEventListener('change', handleEvent);
            container?.removeEventListener('click', handleEvent);
        };
    }, []);

    return(
        <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header" ref={containerRef}>
            <ProjectsScripts />
            <Header />
            <main className="mdl-layout__content">
                <div className="page-content">
                    <h4>Проект</h4>
                    <div className="row">
                        <div className="col s12 m6">
                            <div className="select-wrapper">
                                <select className="browser-default select-class" name="project" id="project">
                                    <option value="" disabled selected>- Выберите проект -</option>
                                    {projects.map((record) => (
                                        <option value={record.id}>{record.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                    <h4>Документы</h4>
                    <table className="mdl-data-table mdl-js-data-table mdl-shadow--2dp">
                        <tbody>
                        <tr>
                            <th>Название</th>
                            <th>Дата создания</th>
                            <th>Автор</th>
                            <th>Статус</th>
                            <th>Приоритет</th>
                            <th>Действия</th>
                        </tr>
                        {documents.map((record) => (
                            <tr>
                                <td>{record.name}</td>
                                <td>{record.date}</td>
                                <td>{record.author}</td>
                                <td>{record.state}</td>
                                <td>{record.priority}</td>
                                <td>
                                    <button className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" id={"updDocumentBtn_" + record.id}>Ред.</button>
                                    <button className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" id={"delDocumentBtn_" + record.id}>Удал.</button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <button className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" id="addDocumentBtn">
                        Добавить документ
                    </button>
                    <h4>Задачи</h4>
                    <table className="mdl-data-table mdl-js-data-table mdl-shadow--2dp">
                        <tbody>
                        <tr>
                            <th>Название</th>
                            <th>Сроки выполнения</th>
                            <th>Исполнители</th>
                            <th>Приоритет</th>
                            <th>Действия</th>
                        </tr>
                        {tasks.map((record) => (
                            <tr>
                                <td>{record.name}</td>
                                <td>{record.dates}</td>
                                <td>{record.executives}</td>
                                <td>{record.priority}</td>
                                <td>
                                    <button className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" id={"updTaskBtn_" + record.id}>Ред.</button>
                                    <button className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" id={"delTaskBtn_" + record.id}>Удал.</button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <button className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" id="addTaskBtn">
                        Добавить задачу
                    </button>
                </div>
            </main>
        </div>
    )
}

export default Projects;