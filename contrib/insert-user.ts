import mongoose from 'mongoose';

import User from '../models/User'

if (!process.env.MONGODB_URI) {
  console.error(`env MONGODB_URI is not set`)
  process.exit(1)
}

mongoose
  .connect(process.env.MONGODB_URI, {
  })
  .then(() => console.log("DB connected"))
  .catch((error) => console.log("DB connection failed", error.message));

async function main() {

  // check if we have email from env
  const email = process.env.EMAIL;
  if (!email) {
    console.error(`env EMAIL is not set to an email`)
    process.exit(1)
  }

  const userPayload = {
    email,
    status: 'active'
  };

  const user = await User.create(userPayload)
  console.log(user)

  console.log('done inserting user')
  process.exit(0);
}

main()



