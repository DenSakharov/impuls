import React from 'react';
import './styles/muiAddDirectory.scss';
import { tPackageAttributes } from '#/dtos/tPackageAttributes';
import usePackages from '../../hooks/usePackages';

interface ModalProps {
    projectId?: string
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (newPackage: tPackageAttributes) => void;
}

const MuiAddDirectory: React.FC<ModalProps> = ({ isOpen, onClose, onSubmit, projectId }) => {
    const packages = usePackages(projectId, isOpen);
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
        onSubmit(packageData);
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
                        <select id="parent" name="parent">
                            {/* Опции должны быть добавлены здесь */}
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