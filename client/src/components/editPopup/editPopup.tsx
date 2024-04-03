import React from 'react';
import './styles/edit_popup_window.css'
import EditPopupProps from '../interfaces/editPopupProps';
import { link } from 'fs';

function EditPopup(props: EditPopupProps) {
    const [status, setStatus] = React.useState(props.status);
    const changeStatus = (value: string) => {
        setStatus((status) => status = value);
    }

    const [tags, setTags] = React.useState(props.tags);
    const addTags = (value: {key:string, value:string | number}[]) => {
        setTags((tags) => tags = value);
        console.log(tags)
    }

    const updateTag = (value: {key:string, value:string | number}, event: any) => {
        setTags(tags.map(tag => {
            if (tag.key === value.key) {
                return {key: value.key, value: event.target.value}
            } else {
                return tag;
            }
        }));
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
                    <p><label>Автор</label> <input id="wide_input" value={props.author}/> </p>
                    <p id="status_p"><label>Статус</label> <input value={status}/>
                        <button onClick={() =>changeStatus("На утверждение")} id="accept_offer_button">На утверждение</button>
                        <button onClick={() =>changeStatus("На доработку")} id="rework_button">На доработку</button>
                        <button onClick={() =>changeStatus("Утвердить")} id="accept_button">Утвердить</button>
                        <button onClick={() =>changeStatus("В разработке")} id="inwork_button">В разработке</button>                    
                    </p>
                    <p><label>Тип</label> <input value={props.type}/> <button id="edit_button">Изменить</button></p> 
                    <p><label>Приоритет</label> <input id="wide_input" value={props.priority}/></p>

                    <p><label>Вложения</label> <input id="wide_input"/> <button id="edit_button">Изменить</button></p>
                    <p><label>Путь</label> <input id="wide_input" value={props.path}/> <button id="edit_button">Изменить</button></p>
                </div>
                <div id="button_attributes">
                    <div id="add_links">
                        <img src='img/plus_black.png'/> Добавить ссылку
                        {props.link.map((link) => (
                            <p id="link_attr"><a>{link}</a></p>
                        ))}
                    </div>
                    <div id="add_fields">
                        <div onClick={() => addTags([...tags, {key: 'Тэг'+(tags.length+1), value: ""}])}><img src='img/plus_black.png'/> Добавить новое поле</div>
                        {tags.map((tag) => (
                            <p id="field_attr"><label></label> 
                            {tag.key}
                            <input 
                                value={tag.value}
                                onChange={(event) => updateTag(tag, event)}
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
                    <p>Обсуждение</p>
                    <hr/>
                </div>
                <div id="chat_log">

                </div>
                <div id="message_field">
                    <hr/>
                    <textarea id="chat_input"></textarea>
                </div>
            </div>

        </div>
    </div>
  );
}

export default EditPopup;