import React from 'react';
import './styles/edit_popup_window.css'

function EditPopup() {
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
                    <p>№ 100000</p>
                    <p>Документ под названием "Объект 1.2"</p>
                    <span> Дата создания 22/03/24 </span>
                    <span> Дата изменения 28/03/24 </span>
                    <hr/>
                </div>
                <div id="field_attributes">
                    <p><label>Описание</label> <textarea id="large_input"></textarea></p>
                    <p><label>Автор</label> <input id="wide_input"/> </p>
                    <p id="status_p"><label>Статус</label> <input/>
                        <button id="accept_offer_button">На утверждение</button>
                        <button id="rework_button">На доработку</button>
                        <button id="accept_button">Утвердить</button>
                        <button id="inwork_button">В разработке</button>                    
                    </p>
                    <p><label>Тип</label> <input/> <button id="edit_button">Изменить</button></p> 
                    <p><label>Приоритет</label> <input id="wide_input"/></p>

                    <p><label>Вложения</label> <input id="wide_input"/> <button id="edit_button">Изменить</button></p>
                    <p><label>Путь</label> <input id="wide_input"/> <button id="edit_button">Изменить</button></p>
                </div>
                <div id="button_attributes">
                    <div id="add_links">
                        <img src='img/plus_black.png'/> Добавить ссылку
                        <p id="link_attr"><a>https://learn.javascript.ru/</a></p>
                    </div>
                    <div id="add_fields">
                        <img src='img/plus_black.png'/> Добавить новое поле
                        <p id="field_attr"><label></label>Тег <input/></p>
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