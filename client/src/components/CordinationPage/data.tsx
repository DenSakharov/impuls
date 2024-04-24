export interface RecordI {
    id:number;
    name:string;
    DataCreate:string;
    Autohr:string;
    DataCordination:string;
    Cordinator:string;
    Status:string;
}

export const records: RecordI[] = [
    {
        id:1, name:"Проект Импульс",
        DataCreate:"01/04/2024",
        Autohr: "Пихтовников В.В.",
        DataCordination:"01/04/2024",
        Cordinator:"Федоров",
        Status:"Согласован"
    },
    {
        id:2, name:"Проект Импульс",
        DataCreate:"01/04/2024",
        Autohr: "Пихтовников В.В.",
        DataCordination:"01/04/2024",
        Cordinator:"Федоров",
        Status:"Согласован"
    },
    {
        id:3, name:"Проект Импульс",
        DataCreate:"01/04/2024",
        Autohr: "Пихтовников В.В.",
        DataCordination:"01/04/2024",
        Cordinator:"Федоров",
        Status:"Согласован"
    },        
]