export interface IMessage {
  uuid: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IMessageReportEntry {
  uuid: string;
  message: IMessage;
  status: string; // pending, sent, failed
  createdAt: Date;
  updatedAt: Date;
}
