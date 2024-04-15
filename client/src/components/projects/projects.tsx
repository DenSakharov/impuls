import React from 'react';
import ProjectsScripts from './projectScripts';
import "./styles/material_icons.css";
import "./styles/materialize.min.css";
import "./styles/material.indigo-pink.min.css";
import './styles/projects.css';
import Header from './header';
import data from './data'

function Projects() {

    const projects = data.projects
    const documents = data.documents
    const tasks = data.tasks

    return(
        <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
            <ProjectsScripts />
            <Header />
            <main className="mdl-layout__content">
                <div className="page-content">
                    <h4>Проект</h4>
                    <div className="row">
                        <div className="col s12 m6">
                            <div className="select-wrapper">
                                <select className="browser-default" name="project">
                                    <option value="" disabled selected>- Выберите проект -</option>
                                    {projects.map((record) => (
                                        <option value="{record.id}">{record.name}</option>
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
                                    <button className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">Ред.</button>
                                    <button className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">Удал.</button>
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
                                    <button className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">Ред.</button>
                                    <button className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">Удал.</button>
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