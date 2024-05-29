import React, { useEffect, useState } from 'react';
import './styles/muiAddObject.scss';
import { tObjectAttributes } from '#/dtos/tObjectAttributes';
import usePackages from '../../hooks/usePackages';
import axios from 'axios';

interface CreateObjectModalProps {
    title?: string
    parent?: string
    projectId?: string
    isOpen: boolean;
    // onSubmit: (newObject: tObjectAttributes) => void;
    onClose: () => void;    
    onSuccessCallback: (projectId?: string) => void;
    oldObject?: tObjectAttributes;
}

const MuiAddObject: React.FC<CreateObjectModalProps> = ({ title = "Форма создания нового объекта", parent,projectId, isOpen, onClose, onSuccessCallback, oldObject }) => {

    const addObject = (newObject: tObjectAttributes) => {
        axios.post(`http://${window.location.hostname.toString()}:3010/projects/${projectId}/objects`, newObject, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }).then((response) => {
            onSuccessCallback(projectId);
        }).catch((error) => {
            console.log(error);
        });
    }
    const updateObject = (newObject: tObjectAttributes) => {
        axios.put(`http://${window.location.hostname.toString()}:3010/projects/${projectId}/objects`, newObject, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }).then((response) => {
            onSuccessCallback(projectId);
        }).catch((error) => {
            console.log(error);
        });
    }

    const packages = usePackages(projectId, isOpen);

    const [objectName, setObjectName] = useState(oldObject?.name ?? '');
    const [objectType, setObjectType] = useState(oldObject?.type ?? '');
    const [description, setDescription] = useState(oldObject?.note ?? '');
    const [parentId, setParentId] = useState(oldObject?.packageId ?? parent);
    const [attachments, setAttachments] = useState<File[]>(oldObject?.attachments ?? []);
    useEffect(() => {
        setParentId(parent);
    }, [packages, parent]);
    useEffect(() => {
        if(!oldObject)return;
        setObjectName(oldObject.name||'');
        setObjectType(oldObject.type||'');
        setDescription(oldObject.note||'');
        setParentId(oldObject.packageId);
        setAttachments(oldObject.attachments||[]);
    }, [oldObject])
    const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Обработка данных формы
        const objectData = {
            name: objectName,
            note: description,
            projectId: projectId,
            packageId: parentId ? parentId : null,   
            type: objectType,
            attachments: attachments, 
        } as tObjectAttributes;
        if(oldObject){
            updateObject({...oldObject,  ...objectData})
        }else{
            addObject(objectData);
        }
        onClose(); // Закрыть модальное окно после отправки формы
    };

    const handleAttachment = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setAttachments([...attachments, ...Array.from(event.target.files)]);
        }
    };

    if (!isOpen) {
        return null;
    }

    return (
        <div className="modal-overlay">
            <div className="modal"  style={{ width: 500 }}>
                <div className="modal-header">
                    <h2>{title}</h2>
                </div>
                <form onSubmit={onSubmitHandler} className="form-create-object">
                    <label htmlFor="parent">Родитель</label>
                    <select id="parent" name="parent" value={parentId} onChange={(e) => setParentId(e.target.value)}>
                        <option value="">-</option>
                        {packages.map((item) => (
                            <option key={item.packageId} value={item.packageId}>{item.name}</option>
                        ))}
                    </select>
                    <label htmlFor="name">Название</label>
                    <input
                        required
                        id="name"
                        type="text"
                        value={objectName}
                        onChange={(e) => setObjectName(e.target.value)}/>

                    <label htmlFor="description">Описание</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}/>

                    <div className="attachments">
                        <label htmlFor="file-upload" className="add-attachment-button">+</label>
                        <input
                            id="file-upload"
                            type="file"
                            style={{ display: 'none' }}
                            onChange={handleAttachment} />
                        <div className="attachment-names"  style={{ height: 50 }}>
                            {attachments.map((file, index) => (
                                <div key={index} className="attachment-name">{file.name}</div>
                            ))}
                        </div>
                    </div>

                    <div className="modal-footer">
                        <button type="button" className="cancel-button" onClick={onClose}>Отменить</button>
                        <button type="submit" className="save-button">Сохранить</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default MuiAddObject;