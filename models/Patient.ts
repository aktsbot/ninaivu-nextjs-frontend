import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const PatientSchema = new mongoose.Schema({
  uuid: {
    type: String,
    required: true, default: () => uuidv4()
  },
  patientId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  mobileNumbers: [{
    type: String,
    required: true,
  }],
  notes: {
    type: String
  },
  messagesEvery: [{
    type: String,   // sunday, monday, tuesday, wednesday, thursday, friday, saturday
    required: true,
  }]
}, {
  timestamps: true,
  versionKey: false,
})

export default mongoose.models.Patient || mongoose.model('Patient', PatientSchema)

