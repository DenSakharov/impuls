import React from 'react';
import ProjectsScripts from './projectScripts';
import "./styles/material_icons.css";
import "./styles/materialize.min.css";
import "./styles/material.indigo-pink.min.css";
import './styles/projects.css';
import Header from './header';

function Projects() {
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
                                    <option value="1" selected>Импульс</option>
                                    <option value="2">Редактор КПМ</option>
                                    <option value="3">ITOP</option>
                                    <option value="4">OpenProject</option>
                                    <option value="5">DocuWiki</option>
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
                        <tr>
                            <td>Согласование №233</td>
                            <td>12.09.2024</td>
                            <td>Яковлев А.В.</td>
                            <td>на согласовании</td>
                            <td>высокий</td>
                            <td><button className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">Ред.</button>
                                <button className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">Удал.</button></td>
                        </tr>
                        <tr>
                            <td>Макеты для ТЗ</td>
                            <td>13.05.2024</td>
                            <td>Иванов У.А.</td>
                            <td>отклонен</td>
                            <td>средний</td>
                            <td><button className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">Ред.</button>
                                <button className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">Удал.</button></td>
                        </tr>
                        <tr>
                            <td>Договор на оказание услуг</td>
                            <td>14.05.2024</td>
                            <td>Петров У.А.</td>
                            <td>рассматривается</td>
                            <td>высокий</td>
                            <td><button className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">Ред.</button>
                                <button className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">Удал.</button></td>
                        </tr>
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
                        <tr>
                            <td>Разработка макетов</td>
                            <td>11.02.2024 - 16.03.2024</td>
                            <td>Иванов А.В.</td>
                            <td>средний</td>
                            <td><button className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">Ред.</button>
                                <button className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">Удал.</button></td>
                        </tr>
                        <tr>
                            <td>Составление ТЗ</td>
                            <td>01.12.2023 - 19.05.2024</td>
                            <td>Петров И.Б, Анисимова А.Г.</td>
                            <td>средний</td>
                            <td><button className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">Ред.</button>
                                <button className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">Удал.</button></td>
                        </tr>
                        <tr>
                            <td>Верстка макетов</td>
                            <td>12.05.2024 - 18.05.2024</td>
                            <td>Сидянов У.А.</td>
                            <td>высокий</td>
                            <td><button className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">Ред.</button>
                                <button className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">Удал.</button></td>
                        </tr>
                        <tr>
                            <td>Программирование бэкенда</td>
                            <td>12.02.2024 - 17.03.2024</td>
                            <td>Иванов П.В.</td>
                            <td>высокий</td>
                            <td>
                                <button className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">Ред.</button>
                                <button  className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">Удал.</button>
                            </td>
                        </tr>
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