import { IPatient } from "./Patient";

export interface IMessage {
  uuid: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface IMessageReportEntry {
  uuid: string;
  message: IMessage;
  patient?: IPatient;
  date?: string;
  status: string; // pending, sent, failed
  createdAt: string;
  updatedAt: string;
}
