import { useState } from "react";
import Dialog, { DialogProps } from "./dialog";

export function CreateTodo({
  open,
  onClose,
}: Pick<DialogProps, "open" | "onClose">) {
  const [value, setValue] = useState("");
  
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="todo-title"
      aria-describedby="todo-description"
      className="modal rounded mt-40 p-4"
    >
      <h3 id="todo-title" className="font-bold text-lg mb-2">
        Создать запись
      </h3>
      <p id="todo-description" className="mb-2">
       Введите описание
      </p>
      <form method="dialog">
        <div className="mb-4">
          <label htmlFor="todo-name" className="sr-only">
            Запись
          </label>
          <input
            id="todo-name"
            className="border rounded p-1 w-full"
            value={value}
            autoFocus
            onChange={(e) => {
              setValue(e.target.value);
            }}
          />
        </div>
        <div className="flex gap-2">
          <button formMethod="dialog" className="flex-1 rounded border p-2">
            Отмена
          </button>
          <button
            value={value}
            disabled={!value}
            className="flex-1 rounded border p-2 bg-black text-white disabled:opacity-50"
          >
            Добавить
          </button>
        </div>
      </form>
    </Dialog>
  );
}
