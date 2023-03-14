import mongoose from 'mongoose';

const PatientSchema = new mongoose.Schema({
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
  }
}, {
  timestamps: true,
  versionKey: false,
})

export default mongoose.models.Patient || mongoose.model('Patient', PatientSchema)

