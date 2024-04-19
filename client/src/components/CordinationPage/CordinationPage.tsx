import React, { useState } from 'react';
import jsonData from './data.json';
 //[ {"id":1,"name":"Проект Импульс","DataCreate":"01/04/2024","DataCordination":"01/04/2024","Autohr":"Пихтовников В.В.","Cordinator":"Федоров","Status":"Согласован"} ]
function CordinationPage(props:any) {
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [DataCreate, setDataCreate] = useState('');
    const [DataCordination, setDataCordination] = useState('');
    const [Autohr, setAutohr] = useState('');
    const [Cordinator, setCordinator] = useState('');
    const [Status, setStatus] = useState('');
 
    const changeId = (event:any) => {
        setId(event.target.value);
    };

    const changeName = (event:any) => {
        setName(event.target.value);
    };
    
    
    const changeDataCreate = (event:any) => {
        setDataCreate(event.target.value);
    };

    const changeDataCordination = (event:any) => {
        setDataCordination(event.target.value);
    };

    const changeAutohr = (event:any) => {
        setAutohr(event.target.value);
    };

    const changeCordinator = (event:any) => {
        setCordinator(event.target.value);
    };
    const changeStatus = (event:any) => {
        setStatus(event.target.value);
    };
 
   
    const transferValue = (event:any) => {
        event.preventDefault();
        const val = {
            name,
            DataCreate,
            DataCordination,
            Autohr,
            Cordinator,
            Status,
        };
        props.func(val);
        clearCordinator();
    };
 
    const clearCordinator = () => {
        setName('');
        setDataCreate('');
        setDataCordination('');
        setAutohr('');
        setCordinator('');
        setStatus('');
    };
 
    return (
        <div>
            <label>Наименование проекта</label>
            <input type="text" value={name} onChange={changeName} />
            <label>Дата нач. согласования</label>
            <input type="text" value={DataCreate} onChange={changeDataCreate} />
            <label>Дата окончания. согласования</label>
            <input type="text" value={DataCordination} onChange={changeDataCordination} />
            <label>Автор</label>
            <input type="text" value={Autohr} onChange={changeAutohr} />
            <label>Согласующий</label>
            <input type="text" value={Cordinator} onChange={changeCordinator} />           
            <button onClick={transferValue}> Записать</button>
        </div>
    );
}
 
export default CordinationPage;