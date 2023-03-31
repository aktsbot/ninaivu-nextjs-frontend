export interface IPatient {
  uuid?: string;
  patientId: string;
  name: string;
  mobileNumbers: string[];
  notes: string;
  messagesEvery: string[];
}
