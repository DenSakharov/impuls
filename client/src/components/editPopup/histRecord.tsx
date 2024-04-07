import React from 'react';
import './styles/edit_popup_window.css'
import record from '../interfaces/recordProps';



function HistRecord(props: record) {

    const author = 'Илья Красненков';
    const style = {
        header: {
            marginLeft: author !== props.author ? '10%' : 'none',
            width: author !== props.author ? '85%' : '85%',
        },
        message: {
            marginLeft: author !== props.author ? '20%' : '10%',
            width: author !== props.author ? '75%' : '75%',
        }
    }


    return (
        <div className="message">
            <div className="messageHeader" style={style.header}>
                <img className="avatar" src={props.avatar} alt="avatar" id="avatar"/>
                    <div className="author">{props.author}</div>
                        {props.date_changed.toLocaleDateString()}
                    </div>
            <div className="text" style={style.message}>{props.text}</div>
            
        </div>
    );
}

export default HistRecord;