export const isEmailInAllowedList = ({ email }: { email: string }) => {
  if (!process.env.ALLOWED_EMAILS) {
    return false; // allow no one to use the platform unless this is set  
  }
  const allowedList = process.env.ALLOWED_EMAILS.split(',')
  return allowedList.includes(email);
}

