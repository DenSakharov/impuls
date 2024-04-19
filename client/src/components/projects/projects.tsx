import React, { useEffect, useRef } from 'react';
import ProjectsScripts from './projectScripts';
import styles1 from "./styles/material.module.css";
import styles2 from './styles/projects.module.css';
import Header from './header';
import data from './data';
import classNames from 'classnames';

// Объединение стилей в один объект
const styles = { ...styles1, ...styles2 };

function Projects() {
    const projects = data.projects;
    const documents = data.documents;
    const tasks = data.tasks;

    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleEvent = (event: Event) => {
            const target = event.target as HTMLElement;

            if (target && target.tagName === 'BUTTON' && target.matches('.mdl-button') && event.type === 'click') {
                alert(`Клик кнопки: ${target.id}`);
            }

            if (target && target.tagName === 'SELECT' && target.classList.contains('select-class') && event.type === 'change') {
                const selectedOption = (target as HTMLSelectElement).selectedOptions[0];
                alert(`ID списка: ${target.id}, ID выбранной записи: ${selectedOption.value}`);
            }
        };

        const container = containerRef.current;
        container?.addEventListener('change', handleEvent);
        container?.addEventListener('click', handleEvent);

        return () => {
            container?.removeEventListener('change', handleEvent);
            container?.removeEventListener('click', handleEvent);
        };
    }, []);

    return (
        <div className={classNames(styles.mdlLayout, styles.mdlJsLayout, styles.mdlLayoutFixedHeader)} ref={containerRef}>
            <ProjectsScripts />
            <Header />
            <main className={classNames(styles.mdlLayoutContent)}>
                <div className={classNames(styles.pageContent)}>
                    <h4>Проект</h4>
                    <div className={classNames(styles.row)}>
                        <div className={classNames(styles.colS12M6)}>
                            <div className={classNames(styles.selectWrapper)}>
                                <select className={classNames(styles.browserDefault, styles.selectClass)} name="project" id="project">
                                    <option value="" disabled selected>- Выберите проект -</option>
                                    {projects.map((record) => (
                                        <option value={record.id}>{record.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                    <h4>Документы</h4>
                    <table className={classNames(styles.mdlDataTable, styles.mdlJsDataTable, styles.mdlShadow2dp)}>
                        <tbody>
                        {documents.map((record) => (
                            <tr>
                                <td>{record.name}</td>
                                <td>{record.date}</td>
                                <td>{record.author}</td>
                                <td>{record.state}</td>
                                <td>{record.priority}</td>
                                <td>
                                    <button className={classNames(styles.mdlButton, styles.mdlJsButton, styles.mdlButtonRaised, styles.mdlJsRippleEffect, styles.mdlButtonAccent)} id={"updDocumentBtn_" + record.id}>Ред.</button>
                                    <button className={classNames(styles.mdlButton, styles.mdlJsButton, styles.mdlButtonRaised, styles.mdlJsRippleEffect, styles.mdlButtonAccent)} id={"delDocumentBtn_" + record.id}>Удал.</button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <button className={classNames(styles.mdlButton, styles.mdlJsButton, styles.mdlButtonRaised, styles.mdlJsRippleEffect, styles.mdlButtonAccent)} id="addDocumentBtn">
                        Добавить документ
                    </button>
                    <h4>Задачи</h4>
                    <table className={classNames(styles.mdlDataTable, styles.mdlJsDataTable, styles.mdlShadow2dp)}>
                        <tbody>
                        {tasks.map((record) => (
                            <tr>
                                <td>{record.name}</td>
                                <td>{record.dates}</td>
                                <td>{record.executives}</td>
                                <td>{record.priority}</td>
                                <td>
                                    <button className={classNames(styles.mdlButton, styles.mdlJsButton, styles.mdlButtonRaised, styles.mdlJsRippleEffect, styles.mdlButtonAccent)} id={"updTaskBtn_" + record.id}>Ред.</button>
                                    <button className={classNames(styles.mdlButton, styles.mdlJsButton, styles.mdlButtonRaised, styles.mdlJsRippleEffect, styles.mdlButtonAccent)} id={"delTaskBtn_" + record.id}>Удал.</button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <button className={classNames(styles.mdlButton, styles.mdlJsButton, styles.mdlButtonRaised, styles.mdlJsRippleEffect, styles.mdlButtonAccent)} id="addTaskBtn">
                        Добавить задачу
                    </button>
                </div>
            </main>
        </div>
    );
}

export default Projects;
