import React from 'react';
import data from '../editPopup/data';
import { Drawer, IconButton, Container, Divider, TextField, Typography } from '@mui/material';
import MuiMessage from './muiMessage';
import { Chat } from '@mui/icons-material';



export default function MuiChat() {
    const [isDrawerOpen, setisDrawerOpen] = React.useState(false);
    const [messageArr, setMessages] = React.useState(data.messages);
    const sendMessage = (event: any) => {
        if (event.key === "Enter" && event.target.value !== "") {
            event.preventDefault();
            setMessages([...messageArr, {
                id: messageArr.length + 1,
                author: "Илья Красненков",
                date_sent: new Date(),
                text: event.target.value,
                avatar: "https://avatars.mds.yandex.net/get-yapic/23186/enc-fcff59d213e265d10a2cccb679221e95c9b92a7e71c02c7c269cd6e384249449/islands-retina-middle"
            }])
            event.target.value = "";
        }
    }
    return (    
            <>
                <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                onClick={() => setisDrawerOpen(true)}>
                <Chat/>
                <Typography sx={{display: {md: 'none', xs: 'block'}, ml: 2}}>Открыть чат</Typography>
                </IconButton>
                <Drawer anchor={'right'} PaperProps={{ sx:{width: {md:'30%', sm: '70%'}}}} open={isDrawerOpen} onClose={() => setisDrawerOpen(false)}>
                        <Container disableGutters sx={{
                            paddingLeft: '10px',
                            overflowY: 'auto',
                            display: 'block',
                            margin: 0,
                                '&::-webkit-scrollbar-track':{
                                    'background-color': '#147ccc00',
                                },
                                '&::-webkit-scrollbar': {
                                    width: '10px',
                                },
                                
                                '&::-webkit-scrollbar-thumb': {
                                    'border-radius': '0px',
                                    backgroundColor: '#15739800',
                                    'border-right': '0.1px solid #157398',
                                }            
                        }}>
                            <Container disableGutters >
                                {messageArr.map((message) => (
                                    <MuiMessage {...message} key={messageArr.indexOf(message)}/>
                                ))}
                            </Container>
                        </Container>
                        <Container sx={{marginTop: 'auto', marginBottom: '10px'}}>
                            <Divider orientation='horizontal' variant='fullWidth' flexItem/>
                            <TextField 
                                onKeyDown={(event) => sendMessage(event)}
                                id="standard-textarea"
                                placeholder="Введите сообщение"
                                multiline
                                fullWidth
                                variant="outlined">
                                </TextField>
                        </Container>           
                </Drawer>

            </>
    );
}

 