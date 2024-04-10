interface EditPopupProps {
    id: number;
    name: string;
    desc: string;
    author: string;
    status: string;
    date_created: Date;
    date_changed: Date;
    type: string;
    priority: string;
    path: string;
    links: string[];
    tags: {key:string, value:string | number}[];
  }

  export default EditPopupProps;
  