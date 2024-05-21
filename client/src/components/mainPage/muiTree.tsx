import React from 'react';
<<<<<<< HEAD
import { SimpleTreeView, TreeItem  } from '@mui/x-tree-view';
import { Container, Menu, MenuItem } from '@mui/material';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DeleteIcon from '@mui/icons-material/Delete';
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import ContentCopy from "@mui/icons-material/ContentCopy";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";

export default function MuiTree({data, handleOpenForm, setPopupData} : any) {
    
=======
import { SimpleTreeView, TreeItem } from '@mui/x-tree-view';
import { Container } from '@mui/material';


export default function MuiTree({data, handleOpenForm, setPopupData} : any) {

>>>>>>> abd075049a8ea3e42f7512c2a5e76efc5447b4b6
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
<<<<<<< HEAD
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

=======
    }   
    const tree = data
>>>>>>> abd075049a8ea3e42f7512c2a5e76efc5447b4b6
    const renderTree = (node: any) => (
        <TreeItem 
        itemId={node.name} 
        label={node.name} 
        key={node.name}
<<<<<<< HEAD
        sx={{textAlign:"left", textDecoration: node.object ? "underline" : "none", cursor: 'context-menu'}}
        onClick={() => openPopup(node)}
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
=======
        sx={{textAlign:"left", textDecoration: node.object ? "underline" : "none"}}
        onClick={() => openPopup(node)}
        >
            {Object.keys(node).map((key) => Array.isArray(node[key]) ? node[key].map((child: any) => renderTree(child)) : null)}
>>>>>>> abd075049a8ea3e42f7512c2a5e76efc5447b4b6
        </TreeItem>
    )
  return (
    <Container disableGutters>
        <SimpleTreeView 
<<<<<<< HEAD
        defaultExpandedItems={[data.name]}
        sx={{ flexGrow: 1, overflowY: 'auto' }}>
            {renderTree(data)}
=======
        defaultExpandedItems={[tree.name]}
        sx={{ flexGrow: 1, overflowY: 'auto' }}>
            {renderTree(tree)}
>>>>>>> abd075049a8ea3e42f7512c2a5e76efc5447b4b6
        </SimpleTreeView>
    </Container>
    
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> abd075049a8ea3e42f7512c2a5e76efc5447b4b6
