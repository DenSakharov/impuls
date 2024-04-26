import  React  from 'react';
import { CreateTodo } from "./create_todo";

const initialTodos = [
  "Ссылка на Figmu проекта ",
  "Ссылка на GitHub проекта ",
  "Ссылка на БД проекта ",
  "Ссылка на проект ",
];

function Favorites() {
    const [todos, setTodos] = React.useState<string[]>(initialTodos);
    const [open, setOpen] = React.useState(false);

    return (
                
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          {/* Your content */}
        
          <h1 id="title" className="text-lg font-bold mb-2">
           Избранное
          </h1>
          <ul aria-labelledby="title" className="list-disc list-inside mb-4">
             {todos.map((todo) => (
              <li key={todo}>{todo}</li>
             ))}
          </ul>
          <button
               onClick={() => setOpen(true)}
               className="bg-black text-white p-2 rounded"
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
