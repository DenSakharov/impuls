import React from 'react';
import { SimpleTreeView, TreeItem  } from '@mui/x-tree-view';
import { Container, Menu, MenuItem } from '@mui/material';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DeleteIcon from '@mui/icons-material/Delete';
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import ContentCopy from "@mui/icons-material/ContentCopy";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";

export default function MuiTree({data, handleOpenForm, setPopupData} : any) {
    
    const openPopup = (node: any) => {
        setPopupData(node.object)
        if (node.object && window.innerWidth < 700) {
            window.open('/Popup?id=' + node.object.id,"_self")
            return
        }

        if (node.object) {
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

    const renderTree = (node: any) => (
        <TreeItem 
        itemId={node.name} 
        label={node.name} 
        key={node.name}
        sx={{textAlign:"left", textDecoration: node.object ? "underline" : "none", cursor: 'context-menu'}}
        onClick={() => node.object? openPopup(node) : null}
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
                        <CreateNewFolderIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Добавить папку" />
                </MenuItem>
                <MenuItem onClick={handlemyClose}>
                <ListItemIcon>
                        <NoteAddIcon fontSize="small" />
                    </ListItemIcon>
                <ListItemText primary="Добавить объект" />
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
        {Object.keys(node).map((key) => Array.isArray(node[key]) ? node[key].map((child: any) => renderTree(child)) : null)}
        </TreeItem>
    )
  return (
    <Container disableGutters>
        <SimpleTreeView 
        defaultExpandedItems={[data.name]}
        sx={{ flexGrow: 1, overflowY: 'auto' }}>
            {renderTree(data)}
        </SimpleTreeView>
    </Container>
    
  );
}
