import React from 'react';
import './styles/edit_popup_window.css'
import EditPopupProps from '../interfaces/editPopupProps';
import ChatMessage from './chatMessage';


function EditPopup(props: EditPopupProps) {
    const messages = [{  
        id: 1,
        author: "Илья Красненков",
        date_sent: new Date("2024-01-01"),
        text: "Текст сообщения 1",
        avatar: "https://avatars.mds.yandex.net/get-yapic/23186/enc-fcff59d213e265d10a2cccb679221e95c9b92a7e71c02c7c269cd6e384249449/islands-retina-middle"
    },
    {  
        id: 2,    
        author: "Кожевников Сергей",
        date_sent: new Date("2024-01-02"),
        text: "Текст сообщения 2",
        avatar: "https://cdn.discordapp.com/avatars/1206913485267664947/ea519d3cd94003890fd84eec29d8e720.webp?size=80"
    },
    {  
        id: 3,    
        author: "Илья Красненков",
        date_sent: new Date("2024-01-03"),
        text: "Текст сообщения 3",
        avatar: "https://avatars.mds.yandex.net/get-yapic/23186/enc-fcff59d213e265d10a2cccb679221e95c9b92a7e71c02c7c269cd6e384249449/islands-retina-middle"
    }
]


    const [status, setStatus] = React.useState(props.status);
    const changeStatus = (value: string) => {
        setStatus((status) => status = value);
    }
    const [tags, setTags] = React.useState(props.tags);

    const addTags = (value: {key:string, value:string | number}[]) => {
        setTags((tags) => tags = value);
    }


    const [messageArr, setMessages] = React.useState(messages)
    const sendMessage = (event: any) => {
        if (event.key === "Enter" && event.target.value !== "") {
            event.preventDefault();
            setMessages([...messageArr, {
                id: messageArr.length + 1,
                author: "Илья Красненков",
                date_sent: new Date(),
                text: event.target.value,
                avatar: "https://avatars.mds.yandex.net/get-yapic/23186/enc-fcff59d213e265d10a2cccb679221e95c9b92a7e71c02c7c269cd6e384249449/islands-retina-middle"
            }])
            event.target.value = "";
            console.log(messageArr)
            return messageArr
        }
    }

  return (
    <div id="edit_popup_window">
        <div id="popup_top_panel"> 
            <img id = "down_arrow" src='img/nav_arrow_white.png'/>
            <img id = "up_arrow" src='img/nav_arrow_white.png'/>
            <img id = "cross" src='img/cross.png'/>
        </div>

        <div id="main_block">
            <div id="attr_block">
                <div id="attr_header">
                    <p>№ {props.id}</p>
                    <p>{props.name}</p>
                    <span> Дата создания {props.date_created.toLocaleDateString()} </span>
                    <span> Дата изменения {props.date_changed.toLocaleDateString()} </span>
                    <hr/>
                </div>
                <div id="field_attributes">
                    <p><label>Описание</label> <textarea id="large_input">{props.desc}</textarea></p>
                    <p><label>Автор</label> <input id="wide_input" defaultValue={props.author}/> </p>
                    <p id="status_p"><label>Статус</label> <input value={status}/>
                        <button onClick={() =>changeStatus("На утверждение")} id="accept_offer_button">На утверждение</button>
                        <button onClick={() =>changeStatus("На доработку")} id="rework_button">На доработку</button>
                        <button onClick={() =>changeStatus("Утвердить")} id="accept_button">Утвердить</button>
                        <button onClick={() =>changeStatus("В разработке")} id="inwork_button">В разработке</button>                    
                    </p>
                    <p><label>Тип</label> <input defaultValue={props.type}/> <button id="edit_button">Изменить</button></p> 
                    <p><label>Приоритет</label> <input id="wide_input" defaultValue={props.priority}/></p>
                    <p><label>Вложения</label> <input id="wide_input"/> <button id="edit_button">Изменить</button></p>
                    <p><label>Путь</label> <input id="wide_input" defaultValue={props.path}/> <button id="edit_button">Изменить</button></p>
                </div>
                <div id="button_attributes">
                    <div id="add_links">
                        <img src='img/plus_black.png'/> Добавить ссылку
                        {props.link.map((link) => (
                            <p id="link_attr"><a>{link}</a></p>
                        ))}
                    </div>
                    <div id="add_fields">
                    <div 
                        onClick={() => addTags([...tags, {key: 'Тэг'+(tags.length+1), value: ""}])}>
                            <img src='img/plus_black.png'/> Добавить новое поле
                        </div>

                        {tags.map((tag) => (
                            <p id="field_attr"><label></label> 
                            {tag.key}
                            <input 
                                defaultValue={tag.value}
                                /></p>
                        ))}
                    </div>
                    <div id="doc_dependencies">
                        <img src='img/plus_black.png'/> Зависимости
                        <p id="dependency_attr"><input id="large_input"/></p>
                    </div>
                </div>
            </div>

            <div id="chat_block">
                <div id="chat_header">
                    <p id="header_text">Обсуждение</p>
                    <hr id="chatLine"/>
                </div>
               
                <div id="chat_log">
                    {messageArr.map((message) => (
                        <ChatMessage {...message} />
                    ))}
                </div>
                <div id="message_field">
                    <hr id="chatLine"/>
                    <textarea id="chat_input" onKeyDown={(event) => sendMessage(event)}></textarea>
                </div>
            </div>

        </div>
    </div>
  );
}

export default EditPopup;