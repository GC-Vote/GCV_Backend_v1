export const generateEmailStringArray = (email_addresses: any): string[] => {
  let email_string: string[] = [];
  for (let i = 0; i < email_addresses.length; i++)
    // email_string += email_addresses[i].email_address + ",";
    email_string.push(email_addresses[i].email_address)
  return email_string;
};
