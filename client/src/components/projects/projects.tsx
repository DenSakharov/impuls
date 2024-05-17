import React, { useEffect, useRef, useState } from 'react';
import ProjectsScripts from './projectScripts';
import "./styles/material_icons.css";
import "./styles/materialize.css";
import "./styles/material.indigo-pink.css";
import './styles/projects.css';
import Header from './header';
import data from './data'
import TaskModal from './taskModal';

function Projects() {

    const projects = data.projects
    const documents = data.documents
    const tasks = data.tasks

    const containerRef = useRef<HTMLDivElement>(null);

    // Функция для обработки клика внутри контейнера
    useEffect(() => {

        // on window resize => collapse tables
        const handleResize = () => {
            const tables = document.querySelectorAll('.mdl-data-table');
            tables.forEach(table => {

                const cellsHdrs = table.querySelectorAll('th');
                const cells = table.querySelectorAll('th, td');
                const cellsCnt = cellsHdrs.length;

                if (window.innerWidth < 1000) {
                    // Скрываем все колонки, кроме первой
                    cells.forEach((cell, index) => {
                        // Приведение к типу HTMLElement для доступа к свойству style
                        const htmlCell = cell as HTMLElement;
                        htmlCell.style.display = (index % cellsCnt && (index + 1) % cellsCnt ? 'none' : '');
                    });
                } else {
                    // Показываем все колонки, если ширина больше
                    cells.forEach(cell => {
                        const htmlCell = cell as HTMLElement;
                        htmlCell.style.display = '';
                    });
                }
            });
        };

        // Вызов функции при монтировании компонента
        handleResize();

        // Добавление слушателя изменения размера окна
        window.addEventListener('resize', handleResize);

        const handleEvent = (event: Event) => {
            const target = event.target as HTMLElement;

            // Проверяем, что клик сделан именно по кнопке с классом 'button-class'
            if (target && target.tagName === 'BUTTON' && target.matches('.mdl-button') && event.type === 'click') {
                if(target.id == "addTaskBtn") {
                    openModal();
                } else {
                    alert(`Клик кнопки: ${target.id}`);
                }
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
            window.removeEventListener('resize', handleResize); // Очистка слушателя при размонтировании компонента
        };
    }, []);

    const [modalOpen, setModalOpen] = useState(false);
    const [currentTask, setCurrentTask] = useState<any>(null);

    const openModal = (task?: any) => {
        setCurrentTask(task);
        setModalOpen(true);
    };

    return(
        /*TODO @nujensait думаю стоит поместить вызов компонента на кнопку которая открывает список проектов на главное странице client\src\components\mainPage\muiMenu.tsx*/
        <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header" ref={containerRef} id="projects">
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
                                    <button className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" id={"updDocumentBtn_" + record.id}>
                                        <i className="material-icons">edit</i>
                                    </button>
                                    <button className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" id={"delDocumentBtn_" + record.id}>
                                        <i className="material-icons">delete</i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <button className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" id="addDocumentBtn">
                        <i className="material-icons">add</i>
                    </button>

                    <hr />

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
                                    <button className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent"
                                            id={"updTaskBtn_" + record.id}
                                            onClick={() => openModal({ name: record.name, executor: '1', priority: record.priority })}>
                                        <i className="material-icons">edit</i>
                                    </button>
                                    <button className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" id={"delTaskBtn_" + record.id}>
                                        <i className="material-icons">delete</i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <button className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" id="addTaskBtn" onClick={() => openModal()}>
                        <i className="material-icons">add</i>
                    </button>
                    <TaskModal isOpen={modalOpen} onClose={() => setModalOpen(false)} task={currentTask} />
                </div>
            </main>
        </div>
    )
}

export default Projects;