import mongoose from 'mongoose'

// next auth handles users and sessions
// this collection only keeps track of users who can 
// login and use the app - basically admins

// if the email from nextauth signIn callback is not
// present in this collection, we dont allow the user to login

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Please provide email for this user'],
  },
  status: {
    type: String,
    default: 'active' // active, inactive - to prevent logins if set to inactive
  }
}, {
  timestamps: true,
  versionKey: false,
})

export default mongoose.models.User || mongoose.model('User', UserSchema)

