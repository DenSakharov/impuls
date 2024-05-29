import React, { useEffect, useState } from 'react';
import './styles/muiAddObject.scss';
import { tObjectAttributes } from '#/dtos/tObjectAttributes';
import usePackages from '../../hooks/usePackages';
import axios from 'axios';

interface CreateObjectModalProps {
    parent?: string
    projectId?: string
    isOpen: boolean;
    // onSubmit: (newObject: tObjectAttributes) => void;
    onClose: () => void;    
    onSuccessCallback: (projectId?: string) => void;
}

const MuiAddObject: React.FC<CreateObjectModalProps> = ({ parent,projectId, isOpen, onClose, onSuccessCallback }) => {

    const addObject = (newObject: tObjectAttributes) => {
        console.log(newObject);
        
        axios.post(`http://${window.location.hostname.toString()}:3010/projects/${projectId}/objects`, newObject, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }).then((response) => {
            console.log(response);
            onSuccessCallback(projectId);
        }).catch((error) => {
            console.log(error);
        });
    }

    const packages = usePackages(projectId, isOpen);

    const [objectName, setObjectName] = useState('');
    const [objectType, setObjectType] = useState('');
    const [description, setDescription] = useState('');
    const [parentId, setParentId] = useState(parent);
    const [attachments, setAttachments] = useState<File[]>([]);
    useEffect(() => {
        setParentId(parent);
    }, [packages, parent]);
    const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Обработка данных формы
        const objectData = {
            name: objectName,
            description: description,
            projectId: projectId,
            packageId: parentId ? parentId : null,   
            type: objectType,
            attachments: attachments, 
        } as tObjectAttributes;
        addObject(objectData);
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
                    <h2>Форма создания нового объекта</h2>
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