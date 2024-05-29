import React, { useEffect, useState } from 'react';
import './styles/muiAddDirectory.scss';
import { tPackageAttributes } from '#/dtos/tPackageAttributes';
import usePackages from '../../hooks/usePackages';
import axios from 'axios';

interface ModalProps {
    title? : string;
    parent?: string;
    projectId?: string;
    isOpen: boolean;
    onClose: () => void;
    onSuccessCallback: (projectId?: string) => void;
    oldPackage?: tPackageAttributes;
}

const MuiAddDirectory: React.FC<ModalProps> = ({ title = "Форма создания новой папки", isOpen, onClose, onSuccessCallback, projectId, parent, oldPackage }) => {
    const packages = usePackages(projectId, isOpen);
    const [parentId, setParentId] = useState(oldPackage?.parentId ?? parent);
    const [packageName, setPackageName] = useState(oldPackage?.name ?? "");
    const [packageType, setPackageType] = useState(oldPackage?.packageType ?? '');

    useEffect(() => {
        setParentId(parent);
    }, [packages, parent]);

    useEffect(() => {
        if(!oldPackage)return;
        setPackageName(oldPackage.name||'');
        setParentId(oldPackage.parentId);
        setPackageType(oldPackage.packageType||'');
    }, [oldPackage])

    const addDirectory = (newPackage: tPackageAttributes) => {
        axios.post(`http://${window.location.hostname.toString()}:3010/projects/${projectId}/packages`, newPackage, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }).then((_) => {
            onSuccessCallback(projectId);
        }).catch((error) => {
            console.log(error);
        });
    }
    const updateDirectory = (newPackage: tPackageAttributes) => {
        axios.put(`http://${window.location.hostname.toString()}:3010/projects/${projectId}/packages/${newPackage.packageId}`, newPackage, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }).then((_) => {
            onSuccessCallback(projectId);
        }).catch((error) => {
            console.log(error);
        });
    }
    if (!isOpen) return null;
    const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const packageData = {
            name: packageName,
            projectId: projectId,
            parentId: parentId ? parentId : null,
            packageType: packageType,            
        } as tPackageAttributes;
        if(oldPackage){
            updateDirectory({...oldPackage,  ...packageData})
        }else{
            addDirectory(packageData);
        }
        onClose();
    }
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal" style={{ width: 500 }} onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>{title}</h2>
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
                        <input id="name" name="name" type="text" value={packageName} onChange={(e) => setPackageName(e.target.value)}/>

                        <label htmlFor="type">Тип папки</label>
                        <select id="type" name="type" value={packageType} onChange={(e) => setPackageType(e.target.value)}>
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