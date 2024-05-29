import React, {useState} from 'react';
import { SimpleTreeView, TreeItem  } from '@mui/x-tree-view';
import { Container, Menu, MenuItem } from '@mui/material';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DeleteIcon from '@mui/icons-material/Delete';
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import ContentCopy from "@mui/icons-material/ContentCopy";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import MuiAddDirectory from "./muiAddDirectory";
import MuiAddObject from "./muiAddObject";
import SettingsSystemDaydreamIcon from '@mui/icons-material/SettingsSystemDaydream';
import { tPackageAttributes, tObjectWithDocuments, tDocumentAttributes } from '#/dtos';

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
        console.log(node)
        if (node && window.innerWidth < 700) {
            window.open('/Popup?id=' + node.docId,"_self")
            return
        }

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
      
    const [selectedId, setSelectedId] = React.useState<string>("");
    const onHandleRightClick = (event: React.MouseEvent<HTMLLIElement>, id?: string) => {
        event.preventDefault();
        event.stopPropagation();
        id && setSelectedId(id);
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
    const openModalAddDirectory = () => setModalAddDirectoryOpen(true);
    const closeModalAddDirectory = () => setModalAddDirectoryOpen(false);

    // addObject
    const [isModalAddObjectOpen, setModalAddObjectOpen] = useState(false);
    const openModalAddObject = () => setModalAddObjectOpen(true);
    const closeModalAddObject = () => setModalAddObjectOpen(false);
    const renderTree = (node: tPackageAttributes|tObjectWithDocuments) => {
        if ("packageId" in node) {
            return (
                <TreeItem 
                itemId={node.packageId}        
                label={node.name} 
                key={node.packageId} 
                sx={{textAlign:"left"}}
                onContextMenu={(e)=>onHandleRightClick(e,node.packageId)}
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
                onContextMenu={(e)=>onHandleRightClick(e,node.object.objectId)}
                >
                    {node.documents?.map(
                        (doc) => (                            
                            <TreeItem 
                            itemId={doc.docId}        
                            label={doc.docname} 
                            key={doc.docId} 
                            sx={{textAlign:"left", textDecoration: doc.docId ? "underline" : "none", cursor: 'context-menu'}}
                            onClick={() => doc.docId? openPopup(doc) : null}
                            onContextMenu={(e)=>onHandleRightClick(e,doc.docId)}>
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
                }>       <MenuItem onClick={handlemyClose}>
                            <ListItemIcon>
                                <SettingsSystemDaydreamIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText primary="Свойства"/>
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
                                <ContentCopy fontSize="small" />
                            </ListItemIcon>
                        <ListItemText primary="Создать копию" />
                        </MenuItem>
                        <MenuItem onClick={handlemyClose}>
                        <ListItemIcon>
                                <DeleteIcon fontSize="small" />
                            </ListItemIcon>
                        <ListItemText primary="Удалить" />
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
        </Container>
    
    );
}