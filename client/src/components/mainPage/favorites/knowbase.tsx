// Кожевников СЮ компонент для создание ссылок на базы знаний на закладке избранное
import  React  from 'react';
import { CreateTodo } from "./create_todo";

const initialTodos = [
  "Рекорд 2.0 ",
  "ATOM Space",
  "NormaCS Online",
  "Консультант Online",
];

function Knowbase() {
    const [todos, setTodos] = React.useState<string[]>(initialTodos);
    const [open, setOpen] = React.useState(false);

    return (
                
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          {/* Your content */}
        
          <h1 id="title" className="text-lg font-bold mb-2">
           Базы знаний
          </h1>
          <ul aria-labelledby="title" className="list-disc list-inside mb-4">
             {todos.map((todo) => (
              <li key={todo}>{todo}</li>
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

  export default Knowbase;
