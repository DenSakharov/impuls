import React from 'react';
import './styles/edit_popup_window.css'
import HistRecord from './histRecord';



function HistChanges() {

    
    const records = [{  
        id: 1,
        author: "Сотрудник 1",
        date_changed: new Date("2024-01-01"),
        text: "Объект 1: А изменено на Б ",
        avatar: "https://avatars.mds.yandex.net/get-yapic/23186/enc-fcff59d213e265d10a2cccb679221e95c9b92a7e71c02c7c269cd6e384249449/islands-retina-middle"
    },
    {  
        id: 2,    
        author: "Сотрудник 2",
        date_changed: new Date("2024-01-02"),
        text: "Обект 1: Discription: Имя -> Наименование",
        avatar: "https://cdn.discordapp.com/avatars/1206913485267664947/ea519d3cd94003890fd84eec29d8e720.webp?size=80"
    },
        ]   
    
    const recordArr = records;



    return (
        <>  
            <div id="hist_record">
                    {recordArr.map((record) => (
                        <HistRecord {...record} key={recordArr.indexOf(record)}/>
                    ))}
            </div>
        </>
    );
}

export default HistChanges;