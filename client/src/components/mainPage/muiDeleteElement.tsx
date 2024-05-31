import React from 'react';
import './styles/muiAddObject.scss';
import { tDocumentAttributes, tObjectWithDocuments, tPackageAttributes, tProjectAttributes } from '#/dtos';
import axios from 'axios';

interface CreateObjectModalProps {
    title?: string
    projectId?: string
    isOpen: boolean;
    onClose: () => void;    
    onSuccessCallback: (projectId?: string) => void;
    element?: tProjectAttributes|tObjectWithDocuments|tPackageAttributes|tDocumentAttributes;
}

const MuiDeleteElement = ({title, projectId, isOpen, onClose, onSuccessCallback, element}: CreateObjectModalProps) => {
    if (!isOpen || !element) {
        return null;
    }
    const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Обработка данных формы
        
        let path;
        if(elementType === "объект"){
            path = `http://${window.location.hostname}:3010/projects/${projectId}/objects/${elementId}`;
        }else if(elementType === "документ"){
            path = `http://${window.location.hostname}:3010/documents/${elementId}`;
        }else if(elementType === "пакет"){
            path = `http://${window.location.hostname}:3010/projects/${projectId}/packages/${elementId}`
        }else if(elementType === "проект"){
            path = `http://${window.location.hostname}:3010/projects/${elementId}`
        }else{
            return;
        }
        axios.delete(path, 
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem(
                    "token"
                )}`,
            },
        }).then(() => {
            onSuccessCallback(projectId);
            onClose(); // Закрыть модальное окно после отправки формы
        }).catch((err) => {
            console.log(err);
        })       

    };


    const [elementId, elementType, elementName] = (() => {
        if(!element){
            return ["","",""];
        }else if( "object" in element){
            return [element.object.objectId, "объект", element.object.name || "" ];
        }else if("docId" in element){
            return [element.docId, "документ", element.docname || "" ];
        }else if("packageId" in element){
            return [element.packageId, "пакет", element.name || "" ];
        }else{
            return [element.projectId, "проект", element.name || "" ];
        }
    })()
   
    
    return (
        <div className="modal-overlay">
            <div className="modal"  style={{ width: 500 }}>
                { title && 
                <div className="modal-header">
                    <h2>{title}</h2>
                </div>
                }
                <form onSubmit={onSubmitHandler} className="form-create-object">
                    <div className="modal-body">
                        <p>Вы действительно хотите удалить {elementType} {elementName}?</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="cancel-button" onClick={onClose}>Отменить</button>
                        <button type="submit" className="delete-button">Удалить</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default MuiDeleteElement;