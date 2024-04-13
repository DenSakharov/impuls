import React from 'react';
import './styles/edit_popup_window.css'
import ChatMessage from './chatMessage';
import data from './data'


function Chat() {

    const messages = data.messages
    
    const [messageArr, setMessages] = React.useState(messages);
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
               <div id="chat_log">
                    <div id="chat_messages">
                        {messageArr.map((message) => (
                            <ChatMessage {...message} key={messageArr.indexOf(message)}/>
                        ))}
                    </div>
                </div>
                <div id="message_field">
                    <hr id="chat_line"/>
                    <textarea id="chat_input" onKeyDown={(event) => sendMessage(event)}></textarea>
                </div>
            </>
    );
}

export default Chat;