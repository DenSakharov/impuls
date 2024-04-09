import React from 'react';
import './styles/edit_popup_window.css'
import EditPopupProps from '../interfaces/editPopupProps';
import Chat from './chat';
import HistChanges from './histChanges';
import data from './data.js';


function EditPopup(props: EditPopupProps = data.object){
    
    const statusButtons = [{value: 'На утверждение', style: 'accept_offer_button'},
                           {value: 'На доработку', style: 'rework_button'},
                           {value: 'Утвердить', style: 'accept_button'},
                           {value: 'В разработке', style: 'inwork_button'}]
    const [tags, setTags] = React.useState(props.tags);
    const [links, setLinks] = React.useState(props.links)
    const [file, setFile] = React.useState(null)
    const [status, setStatus] = React.useState(props.status);
    const [chatOrHistFlag, setFlag] = React.useState(true);

    const changeStatus = (value: string) => {
        setStatus(value);
    }
    
    const addTags = (value: {key:string, value:string | number}) => {
        setTags([...tags, value]);
    }

    const addLinks = () => {
        let newLink = prompt('Добавьте ссылку', 'https://');
        if (newLink && (newLink.includes('https://') || newLink.includes('http://') )) {
            setLinks([...links, newLink]);
        } else if (newLink) {
            setLinks([...links, 'https://'.concat(newLink)])
        }
    }

    
    const handleFileChange = (event: any) => {
        const files = event.target.files;
        if (files.length > 0) {
            const file = files[0];
            setFile(file);
            console.log(file);
        } else {
            setFile(null);
        }
    };

    const inputRef = React.useRef<HTMLInputElement | null>(null)
    const handleButtonClick = () => {
        inputRef.current?.click(); 
    };

  return (
    <div id="edit_popup_window">
        <div id="popup_top_panel"> 
            <img id = "down_arrow" src='img/nav_arrow_white.png' alt='arrow'/>
            <img id = "up_arrow" src='img/nav_arrow_white.png' alt='arrow'/>
            <img id = "cross" src='img/cross.png' alt='cross'/>
        </div>
        <div id="main_block">
            <div id="attr_block">
                <div id="attr_header">
                    <p id='p_epw'>№ {props.id}</p>
                    <p id='p_epw'>{props.name}</p>
                    <div id='header_date'>
                    <span> Дата создания {props.date_created.toLocaleDateString()} </span>
                    <span> Дата изменения {props.date_changed.toLocaleDateString()} </span>
                    </div>
                    <hr id='header_hr'/>
                </div>
                <div id="attr_body">
                    <div id="field_attributes">
                        <p id='p_epw'><label id='label_epw'>Описание</label> <textarea id="large_input" defaultValue={props.desc}></textarea></p>
                        <p id='p_epw'><label id='label_epw'>Автор</label> <input id="wide_input" defaultValue={props.author}/> </p>
                        <p id="status_p"><label id='label_epw'>Статус</label> <input id='input_epw'value={status} readOnly={true}/>
                            {statusButtons.map((button)=> <button id={button.style} key={statusButtons.indexOf(button)} onClick={() =>changeStatus(button.value)} hidden={status===button.value}>{button.value}</button>)}        
                        </p>
                        <p id='p_epw'><label id='label_epw'>Тип</label> <input id='input_epw'defaultValue={props.type}/> <button  id="edit_button">Изменить</button></p> 
                        <p id='p_epw'><label id='label_epw'>Приоритет</label> <input id="wide_input" defaultValue={props.priority}/></p>
                        <p id='p_epw'><label id='label_epw'>Вложения</label> <input id="wide_input" defaultValue={file ? file['name'] : ''} readOnly={true}/> <input id='input_epw'type="file"  ref={inputRef} onChange={handleFileChange} style={{display: 'none'}} defaultValue={file ? file['name'] : ''}/> 
                        <button  onClick={handleButtonClick} id="edit_button">Изменить</button></p>
                        <p id='p_epw'><label id='label_epw'>Путь</label> <input id="wide_input" defaultValue={props.path} /> 
                        <button  id="edit_button">Изменить</button></p>
                    </div>

                    <div id="button_attributes" >
                        <div id="add_links">

                            <div id="plus_with_text" onClick={addLinks}> <img src='img/plus_black.svg' alt='plus'/> Добавить ссылку</div>
                            {links.map((link) => (
                                <p className="link_attr" key={links.indexOf(link)} ><a href={link} key={links.indexOf(link)}>{link}</a></p>
                            ))}
                        </div>
                        <div id="add_fields">
                            <div id="plus_with_text" onClick={() => addTags({key: 'Тэг'+(tags.length+1), value: ""})}>
                                    <img src='img/plus_black.svg' alt='plus'/> Добавить новое поле
                            </div>
                            {tags.map((tag) => (
                                <p className="field_attr" key={tags.indexOf(tag)}  >
                                    {tag.key}
                                    <input id='input_epw'defaultValue={tag.value} />
                                </p>
                            ))}
                        </div>
                        <div id="doc_dependencies">
                            <div id="plus_with_text"><img src='img/plus_black.svg' alt='plus'/> Зависимости</div>
                            <p id="dependency_attr"><input id="large_input"/></p>
                        </div>
                    </div>
                </div>
            </div>
            <div id="chat_block">
                        <div id="chat_buttons">
                            <button id="button_chat" onClick={() => setFlag(true)}> Обсуждение </button>
                            <button id="button_hist" onClick={() => setFlag(false)}> Изменения  </button>
                            <hr id="chat_line"/>
                        </div>
                        {chatOrHistFlag ? <Chat/> : <HistChanges/>}
            </div>

        </div>
    </div>
  );
}

export default EditPopup;