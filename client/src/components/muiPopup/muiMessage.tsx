import React from 'react';
import '../editPopup/styles/edit_popup_window.css'
import message from '../interfaces/messageProps';
import { Container, TextField} from '@mui/material';

export default function MuiMessage(props: message) {

    const author = 'Илья Красненков';
    const style = {
        message: {
            marginLeft: author !== props.author ? '8px' : 'none',
            width: '100%',
            marginRight: author !== props.author ? 'none' : '8px',
        }
    }


    return (
        <Container sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        }}> 

            {author !== props.author ? <img className="avatar" src={props.avatar} alt="avatar" id="avatar"/> : null}       
            <TextField           
            id="outlined-multiline-static"
            label={props.author}
            multiline
            margin="normal"
            color='secondary'
            value={props.text}
            helperText={props.date_sent.toLocaleDateString()}
            sx={style.message}
            />
            {author !== props.author ? null : <img className="avatar" src={props.avatar} alt="avatar" id="avatar"/>}
        </Container>
    );
}

