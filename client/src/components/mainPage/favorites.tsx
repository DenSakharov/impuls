import  React  from 'react';
import { CreateTodo } from "./create_todo";
//const [links, setLinks] = React.useState(props.links)

const initialTodos = [
  "Figma проекта ",
  "GitHub проекта ",
  "БД проекта ",
  "Задачи проекта ",
];

function Favorites() {
    const [todos, setTodos] = React.useState<string[]>(initialTodos);
    const [open, setOpen] = React.useState(false);

    return (
                
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          {/* Your content */}
        
          <h1 id="title" className="text-lg font-bold mb-2">
           Ссылки
          </h1>
          <ul aria-labelledby="title" className="list-disc list-inside mb-4">
             {todos.map((todo) => (
               <li key= {todo}> {todo} </li> 
              // <li key= {todos.indexOf(todo)} > <a href={todo} key={todos.indexOf(todo)}> </a> </li> 
              // <li key= {todo}> <a href={todo} key={todo}> </a> </li> 

            //   {links.map((link) => (
            //     <Typography  key={links.indexOf(link)} ><a href={link} key={links.indexOf(link)}>{link}</a></Typography>
            // ))}

             ))}
          </ul>
          <button
               onClick={() => setOpen(true)}              
               className="bg-gray-900 text-white p-2 rounded rounded-md px-3 py-2 text-sm font-medium"
            >
             Добавить
            </button>
            <CreateTodo
               open={open}
               onClose={(value) => {
               setOpen(false);
                if (value) setTodos([...todos, value]);
                }}
            />
          </div>         
        
    );
  }

  export default Favorites;
