import React, {useState} from 'react';
import { SimpleTreeView, TreeItem  } from '@mui/x-tree-view';
import { Container, Menu, MenuItem } from '@mui/material';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DeleteIcon from '@mui/icons-material/Delete';
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import ContentCopy from "@mui/icons-material/ContentCopy";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import PostAddIcon from '@mui/icons-material/PostAdd';
import MuiAddDirectory from "./muiAddDirectory";
import MuiAddObject from "./muiAddObject";
import MuiAddDocument from "./muiAddDocument"
import SettingsSystemDaydreamIcon from '@mui/icons-material/SettingsSystemDaydream';
import { tPackageAttributes, tObjectWithDocuments, tDocumentAttributes } from '#/dtos';
import axios from 'axios';
import MuiDeleteElement from './muiDeleteElement';

export type MuiTreeProps = {
    projectId?: string,
    header?: string,
    data: tPackageAttributes[],
    handleOpenForm: () => void,
    setPopupData: (node: tDocumentAttributes)=>void,
    updateTree?: (string)=>void
}

export default function MuiTree({projectId, header = "Header", data, handleOpenForm, setPopupData, updateTree} : MuiTreeProps) {
    
    const treeUpdateHandler = (projectId?: string) => {
        projectId && updateTree && updateTree(projectId);
    }

    const openPopup = (node: tDocumentAttributes) => {
        setPopupData(node)        

        if (node) {
            handleOpenForm()    
            return
        }

        return null
    }
    
    const initialState = {
        mouseX: null,
        mouseY: null,
      };
      
    const [state, setState] = React.useState<{
        mouseX: null | number;
        mouseY: null | number;
    }>(initialState);
      
    const [selectedElement, setSelectedElement] = React.useState<tPackageAttributes|tDocumentAttributes|tObjectWithDocuments|undefined>(undefined);
    const selectedId = (() => {
        if(selectedElement && "object" in selectedElement){
            return selectedElement.object.objectId;
        }else if(selectedElement && "docId" in selectedElement){
            return selectedElement.docId;
        }else if(selectedElement && "packageId" in selectedElement){
            return selectedElement.packageId;
        }else{
            return "";
        }
    })();

    
    const editElementHandler = () => {
        if(selectedElement && "object" in selectedElement){
            openModalUpdateObject();
        }else if(selectedElement && "docId" in selectedElement){
            
        }else if(selectedElement && "packageId" in selectedElement){
            openModalUpdateDirectory();
        }else{
            
        }
    }
    const onHandleRightClick = (event: React.MouseEvent<HTMLLIElement>, object?: tObjectWithDocuments | tPackageAttributes | tDocumentAttributes) => {
        event.preventDefault();
        event.stopPropagation();
        console.log(object)
        setSelectedElement(object);
        setState({
            mouseX: event.clientX - 2,
            mouseY: event.clientY - 4,
        });
    };

    const handlemyClose = () => {
        setState(initialState);
    }

    // addDirectory
    const [isModalAddDirectoryOpen, setModalAddDirectoryOpen] = useState(false);
    const [isModalUpdateDirectoryOpen, setModalUpdateDirectoryOpen] = useState(false);

    const openModalAddDirectory = () => setModalAddDirectoryOpen(true);
    const openModalUpdateDirectory = () => setModalUpdateDirectoryOpen(true);
    
    const closeModalAddDirectory = () => setModalAddDirectoryOpen(false);
    const closeModalUpdateDirectory = () => setModalUpdateDirectoryOpen(false);

    // addObject
    const [isModalAddObjectOpen, setModalAddObjectOpen] = useState(false);
    const openModalAddObject = () => setModalAddObjectOpen(true);
    const closeModalAddObject = () => setModalAddObjectOpen(false);

    const [isModalUpdateObjectOpen, setModalUpdateObjectOpen] = useState(false);
    const openModalUpdateObject = () => setModalUpdateObjectOpen(true);
    const closeModalUpdateObject = () => setModalUpdateObjectOpen(false);
    

    // addDocument
    const [isModalAddDocumentOpen, setModalAddDocumentOpen] = useState(false);
    const openModalAddDocument = () => setModalAddDocumentOpen(true);
    const closeModalAddDocument = () => setModalAddDocumentOpen(false);

    const [isModalDeleteElementOpen, setModalDeleteElementOpen] = useState(false);
    const openModalDeleteElement = () => setModalDeleteElementOpen(true);
    const closeModalDeleteElement = () => setModalDeleteElementOpen(false);

    const renderTree = (node: tPackageAttributes|tObjectWithDocuments) => {
        if ("packageId" in node) {
            return (
                <TreeItem 
                itemId={node.packageId}        
                label={node.name} 
                key={node.packageId} 
                sx={{textAlign:"left"}}
                onContextMenu={(e)=>onHandleRightClick(e,node)}
                >
                    {Object.keys(node).map(key => Array.isArray(node[key]) ? node[key].map((child: tPackageAttributes|tObjectWithDocuments) => renderTree(child)) : null)}
                </TreeItem>
                
            )
        } else if ("object" in node) {
            return (
            <TreeItem 
                itemId={node.object.objectId}        
                label={node.object.name} 
                key={node.object.objectId} 
                sx={{textAlign:"left"}}
                onContextMenu={(e)=>onHandleRightClick(e,node)}
                >
                    {node.documents?.map(
                        (doc) => (                            
                            <TreeItem 
                            itemId={doc.docId}        
                            label={doc.docname} 
                            key={doc.docId} 
                            sx={{textAlign:"left", textDecoration: doc.docId ? "underline" : "none", cursor: 'context-menu'}}
                            onClick={() => doc.docId? openPopup(doc) : null}
                            onContextMenu={(e)=>onHandleRightClick(e,doc)}>
                            </TreeItem>
                        )
                    )}
                                        
                </TreeItem>
            )
            
        }
    }
    
    const menuItem = (
        <Menu
            keepMounted
            open={state.mouseY !== null}
            onClose={handlemyClose}
            anchorReference="anchorPosition"
            anchorPosition={
            state.mouseY !== null && state.mouseX !== null
                ? { top: state.mouseY, left: state.mouseX }
                : undefined
            }>       
                <MenuItem onClick={handlemyClose}>
                    <ListItemIcon>
                        <SettingsSystemDaydreamIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Свойства"/>
                </MenuItem>
                <MenuItem onClick={handlemyClose}>
                    <ListItemIcon>
                        <CreateNewFolderIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Редактировать"  onClick={editElementHandler}/>
                </MenuItem>
                <MenuItem onClick={handlemyClose}>
                    <ListItemIcon>
                        <CreateNewFolderIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Создать папку"  onClick={openModalAddDirectory}/>
                </MenuItem>

                <MenuItem onClick={handlemyClose}>
                <ListItemIcon>
                        <NoteAddIcon fontSize="small" />
                    </ListItemIcon>
                <ListItemText primary="Создать объект" onClick={openModalAddObject}/>
                </MenuItem>
                
                <MenuItem onClick={handlemyClose}>
                        <ListItemIcon>
                                <PostAddIcon fontSize="small" />
                            </ListItemIcon>
                        <ListItemText primary="Создать документ" onClick={openModalAddDocument}/>
                </MenuItem>
                <MenuItem onClick={handlemyClose}>
                        <ListItemIcon>
                                <ContentCopy fontSize="small" />
                            </ListItemIcon>
                        <ListItemText primary="Создать копию" />
                        </MenuItem>
                        <MenuItem onClick={handlemyClose}>
                        <ListItemIcon>
                                <DeleteIcon fontSize="small" />
                            </ListItemIcon>
                        <ListItemText primary="Удалить" onClick={openModalDeleteElement}/>
                        </MenuItem>
                </Menu>
    )
  
    return (
        <Container disableGutters>
            {menuItem}
            <SimpleTreeView 
                defaultExpandedItems={[header]}
                sx={{ flexGrow: 1, overflowY: 'auto' }}
            >
                {data.map((item: tPackageAttributes) => renderTree(item))}
            </SimpleTreeView>
            <MuiAddObject parent={selectedId} projectId={projectId} onSuccessCallback={treeUpdateHandler} isOpen={isModalAddObjectOpen} onClose={closeModalAddObject} />
            <MuiAddDirectory parent={selectedId} projectId={projectId} onSuccessCallback={treeUpdateHandler} isOpen={isModalAddDirectoryOpen} onClose={closeModalAddDirectory} />
            <MuiAddDocument parent={selectedId} projectId={projectId} onSuccessCallback={treeUpdateHandler} isOpen={isModalAddDocumentOpen} onClose={closeModalAddDocument}></MuiAddDocument>
            <MuiAddDirectory 
                title="Редактировать папку"
                oldPackage={selectedElement && !("object" in selectedElement) && !("docId" in selectedElement) ? selectedElement : undefined} 
                parent={selectedElement && !("object" in selectedElement) && !("docId" in selectedElement) ? selectedElement.parentId : undefined} 
                projectId={projectId} 
                onSuccessCallback={treeUpdateHandler} 
                isOpen={isModalUpdateDirectoryOpen} 
                onClose={closeModalUpdateDirectory} 
            />
            <MuiAddObject
                title="Редактировать объект"
                oldObject={selectedElement && "object" in selectedElement ? selectedElement.object : undefined} 
                parent={selectedElement && ("object" in selectedElement) ? selectedElement.object.packageId : undefined} 
                projectId={projectId} 
                onSuccessCallback={treeUpdateHandler} 
                isOpen={isModalUpdateObjectOpen}
                onClose={closeModalUpdateObject} 
            />
            <MuiDeleteElement
                title="Удалить элемент" 
                element={selectedElement}
                projectId={projectId}
                onSuccessCallback={treeUpdateHandler}
                isOpen={isModalDeleteElementOpen}
                onClose={closeModalDeleteElement}
            />
        </Container>
    
  );
}