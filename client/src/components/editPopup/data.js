const data = {
    object :{
    id: 10000,
    name: "Документ под названием “Объект 1.2”",
    desc: "Описание документа 10000 для создания папапа при создании документа",
    author: "Красненков Илья",
    status: "В разработке",
    date_created: new Date("2024-01-01"),
    date_changed: new Date("2024-03-01"),
    type: "Основной документ",
    priority: "всевышний",
    path: "S://impuls/client/src/components/testPage/testPage.tsx",
    links: ["https://learn.javascript.ru/","https://google.com"],
    tags: [{ key: "Тэг1", value: "Значение тэга" }, { key: "Тэг2", value: 2 }],
  },
  hist : [{  
    id: 1,
    author: "Сотрудник 1",
    date_changed: new Date("2024-01-01"),
    text: "Объект 1: А изменено на Б ",
    avatar: "https://avatars.mds.yandex.net/get-yapic/23186/enc-fcff59d213e265d10a2cccb679221e95c9b92a7e71c02c7c269cd6e384249449/islands-retina-middle"
},
{  
    id: 2,    
    author: "Сотрудник 2",
    date_changed: new Date("2024-01-02"),
    text: "Обект 1: Discription: Имя -> Наименование",
    avatar: "https://cdn.discordapp.com/avatars/1206913485267664947/ea519d3cd94003890fd84eec29d8e720.webp?size=80"
},],
    messages : [{  
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
}]
}

export default data;