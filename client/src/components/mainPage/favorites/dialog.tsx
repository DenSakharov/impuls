// Кожевников СЮ шаблон диалога для создания компонентов страницы избранное
import { ComponentPropsWithoutRef, useCallback, useEffect, useRef } from "react";

export type DialogProps = Omit<
  ComponentPropsWithoutRef<"dialog">,
  "onClose"
> & {
  open: boolean; // required
  onClose: (returnValue?: string) => void; // override
};

export default function Dialog(props: DialogProps) {
  const { open, children, onClose, ...rest } = props;
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (open) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [open]);

  const handleClose = useCallback(() => {
    onClose(dialogRef.current?.returnValue);
  }, [onClose]);

  return (
    <dialog ref={dialogRef} onClose={handleClose} {...rest}>
      {children}
    </dialog>

  );
}
