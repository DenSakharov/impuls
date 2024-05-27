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


export default function MuiTree({header, data, handleOpenForm, setPopupData} : any) {
    
    const openPopup = (node: any) => {
        setPopupData(node)
        if (node && window.innerWidth < 700) {
            window.open('/Popup?id=' + node.id,"_self")
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
      
    const onHandleRightClick = (event: React.MouseEvent<HTMLLIElement>) => {
        event.preventDefault();
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
    const renderTree = (node: any,isObject: boolean, packages: any = [], objects: any = []) => 
        <TreeItem 
        itemId={node.objectId || node.packageId} 
        label={node.name} 
        key={node.objectId || node.packageId} 
        sx={{textAlign:"left", textDecoration: isObject ? "underline" : "none", cursor: 'context-menu'}}
        onClick={() => isObject? openPopup(node) : null}
        onContextMenu={onHandleRightClick}
        >
        <Menu
        keepMounted
        open={state.mouseY !== null}
        onClose={handlemyClose}
        anchorReference="anchorPosition"
        anchorPosition={
          state.mouseY !== null && state.mouseX !== null
            ? { top: state.mouseY, left: state.mouseX }
            : undefined
        }


        >       <MenuItem onClick={handlemyClose}>
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
        {/* {Object.keys(node).map((key) => Array.isArray(node[key]) ? node[key].map((child: any) => renderTree(child)) : null)} */}
        {packages.map((child: any) => renderTree(child.packageObject, false, child.children, child.objects))}
        {objects.map((child: any) => renderTree(child, true))}
        </TreeItem>
    
    
  return (
    <Container disableGutters>
        <SimpleTreeView 
        defaultExpandedItems={[header]}
        sx={{ flexGrow: 1, overflowY: 'auto' }}>
            {data.map((item: any) => renderTree(item.packageObject, false, item.children, item.objects))}
        </SimpleTreeView>
        <MuiAddObject isOpen={isModalAddObjectOpen} onClose={closeModalAddObject} />
        <MuiAddDirectory isOpen={isModalAddDirectoryOpen} onClose={closeModalAddDirectory} />
    </Container>
    
  );
}
