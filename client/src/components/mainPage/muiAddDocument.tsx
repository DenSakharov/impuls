import React, { useEffect, useState } from 'react';
import './styles/muiAddDirectory.scss';
import { tDocumentAttributes, tObjectAttributes } from '#/dtos';
import usePackages from '../../hooks/usePackages';
import axios from 'axios';

interface ModalProps {
    parent?: string;
    projectId?: string;
    isOpen: boolean;
    onClose: () => void;
    onSuccessCallback: (projectId?: string) => void;
}

const MuiAddDocument: React.FC<ModalProps> = ({ isOpen, onClose, onSuccessCallback, projectId, parent }) => {
    const [objects, setObject] = useState<tObjectAttributes[]>()
    const [docName, setDocName] = useState('');
    const [description, setDescription] = useState('');
    const [parentId, setParentId] = useState(parent);
    
    useEffect(() => {
        setParentId(parent);
    }, [objects, parent]);

    useEffect(() => {
        if(!isOpen) return
        if(!projectId) return
        axios.get(
                "http://" + window.location.hostname + ":3010/projects/" + projectId + "/objects/",                
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                }
            ).then(({ data }: {data: tObjectAttributes[]}) => {
                setObject(data);
            }).catch((err) => console.log(err));

    }, [isOpen, parent]);

    
    const addDocument = (newDocument: tDocumentAttributes) => {
        axios.post(`http://${window.location.hostname.toString()}:3010/documents/`, newDocument, {
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
    if (!isOpen) return null;

   

    const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formJson = Object.fromEntries(formData.entries());
        const packageData = {
            docname: docName,
            description: description,
            objectId: parentId
        } as tDocumentAttributes;
        addDocument(packageData);
        onClose();
    }
    return (
        <div className="modal-overlay">
            <div className="modal"  style={{ width: 500 }}>
                <div className="modal-header">
                    <h2>Форма создания нового документа</h2>
                </div>
                <form onSubmit={onSubmitHandler} className="form-create-object">
                    <label htmlFor="parent">Родитель</label>
                    <select id="parent" name="parent" value={parentId} onChange={(e) => setParentId(e.target.value)}>
                        <option value="">-</option>
                        {objects?.map((item) => (
                                
                                <option key={item.objectId} value={item.objectId}>{item.name}</option>
                            ))}      
                    </select>
                    <label htmlFor="name">Название</label>
                    <input
                        id="name"
                        type="text"
                        value={docName}
                        onChange={(e) => setDocName(e.target.value)}/>

                    <label htmlFor="description">Описание</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}/>

                    <div className="modal-footer">
                        <button type="button" className="cancel-button" onClick={onClose}>Отменить</button>
                        <button type="submit" className="save-button">Сохранить</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default MuiAddDocument;