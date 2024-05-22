import { HttpStatus } from '@nestjs/common';

interface IMessageStatus {
  status: HttpStatus;
}
interface IMessageError extends IMessageStatus {
  error: string;
}
interface IMessageOk extends IMessageStatus {
  message: string;
  uuid: string;
}

export type TMessage = IMessageError | IMessageOk;
