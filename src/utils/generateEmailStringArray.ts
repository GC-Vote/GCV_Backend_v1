export const generateEmailStringArray = (emailAddresses: any): string[] => {
  let emailString: string[] = [];
  for (let i = 0; i < emailAddresses.length; i++)
    // emailString += emailAddresses[i].email_address + ",";
    emailString.push(emailAddresses[i].email_address)
  return emailString;
};
