import  React  from 'react';
import { useState } from "react";
import Dialog, { DialogProps } from "./dialog";
import Snackbar from '@mui/material/Snackbar';

export function CreateTodo({
  open,
  onClose,
}: Pick<DialogProps, "open" | "onClose">) {

  const [value, setValue] = useState("");

  const [open1, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };



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

          <Snackbar
              open={open}
              autoHideDuration={5000}
              onClose={handleClose}
              message="Отменено добавление новой ссылки "
            />


          <button
            value={value}
            disabled={!value}
            className="flex-1 rounded border p-2 bg-black text-white disabled:opacity-50"
          >
            Добавить
          </button>
          <Snackbar
              open={open}
              autoHideDuration={5000}
              onClose={handleClose}
              message="Новая ссылка добавлена и сохранена"
            />

        </div>
      </form>
    </Dialog>
  );
}
