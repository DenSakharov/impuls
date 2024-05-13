import React from 'react';
import record from '#/components/interfaces/recordProps';
import { Avatar, Container, TextField} from '@mui/material';

export default function MuiHistRecord(props: record) {

//    const author = 'Илья Красненков';
    const style = {
        message: {
            marginLeft: '8px',
            width: '100%',
            marginRight: 'none',
        }
    }


    return (
        <Container sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        }}> 

            <Avatar src={props.avatar} alt={props.author}/>       
            <TextField           
            id="outlined-multiline-static"
            label={props.author}
            multiline
            margin="normal"
            color='secondary'
            value={props.text}
            helperText={props.date_changed.toLocaleDateString()}
            sx={style.message}
            />
        </Container>
    );
}

