import React, { useEffect, useState } from 'react';
import './styles/muiAddDirectory.scss';
import { tPackageAttributes } from '#/dtos/tPackageAttributes';
import usePackages from '../../hooks/usePackages';
import axios from 'axios';

interface ModalProps {
    parent?: string;
    projectId?: string;
    isOpen: boolean;
    onClose: () => void;
    onSuccessCallback: (projectId?: string) => void;
}

const MuiAddDirectory: React.FC<ModalProps> = ({ isOpen, onClose, onSuccessCallback, projectId, parent }) => {
    const packages = usePackages(projectId, isOpen);
    const [parentId, setParentId] = useState(parent);
    useEffect(() => {
        setParentId(parent);
    }, [packages, parent]);

    const addDirectory = (newPackage: tPackageAttributes) => {
        axios.post(`http://${window.location.hostname.toString()}:3010/projects/${projectId}/packages`, newPackage, {
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
            name: formJson.name,
            projectId: projectId,
            parentId: formJson.parent ? formJson.parent : null,            
        } as tPackageAttributes;
        addDirectory(packageData);
        onClose();
    }
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal" style={{ width: 500 }} onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>Форма создания новой папки</h2>
                </div>
                <div className="modal-body">
                    <form onSubmit={onSubmitHandler}>
                        <label htmlFor="parent">Родитель</label>
                        <select id="parent" name="parent" value={parentId} onChange={(e) => setParentId(e.target.value)}>
                            <option value="">-</option>
                            {packages.map((item) => (
                                <option key={item.packageId} value={item.packageId}>{item.name}</option>
                            ))}                            
                        </select>

                        <label htmlFor="name">Название</label>
                        <input id="name" name="name" type="text" />

                        <label htmlFor="type">Тип папки</label>
                        <select id="type" name="type">
                            <option value="0">-</option>
                            <option value="1">Simple</option>
                            <option value="2">Component</option>
                            <option value="3">System</option>
                            <option value="4">Private</option>
                        </select>

                        <div className="modal-footer">
                            <button type="button" onClick={onClose}>Отменить</button>
                            <button type="submit">Сохранить</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default MuiAddDirectory;