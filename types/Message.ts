export interface IMessage {
  uuid: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface IMessageReportEntry {
  uuid: string;
  message: IMessage;
  status: string; // pending, sent, failed
  createdAt: string;
  updatedAt: string;
}
