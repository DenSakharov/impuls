import React from 'react';
import data from '../editPopup/data';
import { Drawer, Box, IconButton } from '@mui/material';
import ChatMessage from '../editPopup/chatMessage';
import { Chat } from '@mui/icons-material';

function MuiChat() {
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
                sx={{ mr: 2 }}>
                    <Chat onClick={() => setisDrawerOpen(true)}/>
                </IconButton>
                <Drawer anchor={'right'} open={isDrawerOpen} onClose={() => setisDrawerOpen(false)}>
                        <Box p={2} width='400px'>
                            <div id="chat_messages">
                                {messageArr.map((message) => (
                                    <ChatMessage {...message} key={messageArr.indexOf(message)}/>
                                ))}
                            </div>
                        </Box>
                        <div id="message_field">
                            <hr id="chat_line"/>
                            <textarea id="chat_input" onKeyDown={(event) => sendMessage(event)}></textarea>
                        </div>           
                </Drawer>

            </>
    );
}

export default MuiChat;