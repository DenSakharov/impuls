import React from 'react';
import './styles/edit_popup_window.css'
import message from '../interfaces/messageProps';
import ChatMessage from './chatMessage';



function Chat() {

    const messages = [{  
        id: 1,
        author: "Илья Красненков",
        date_sent: new Date("2024-01-01"),
        text: "Текст сообщения 1",
        avatar: "https://avatars.mds.yandex.net/get-yapic/23186/enc-fcff59d213e265d10a2cccb679221e95c9b92a7e71c02c7c269cd6e384249449/islands-retina-middle"
    },
    {  
        id: 2,    
        author: "Кожевников Сергей",
        date_sent: new Date("2024-01-02"),
        text: "Текст сообщения 2",
        avatar: "https://cdn.discordapp.com/avatars/1206913485267664947/ea519d3cd94003890fd84eec29d8e720.webp?size=80"
    },
    {  
        id: 3,    
        author: "Илья Красненков",
        date_sent: new Date("2024-01-03"),
        text: "Текст сообщения 3",
        avatar: "https://avatars.mds.yandex.net/get-yapic/23186/enc-fcff59d213e265d10a2cccb679221e95c9b92a7e71c02c7c269cd6e384249449/islands-retina-middle"
    }

    ]
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
        <div id="chat_header">
                    <p id="header_text">Обсуждение</p>
                    <hr id="chat_line"/>
                </div>
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