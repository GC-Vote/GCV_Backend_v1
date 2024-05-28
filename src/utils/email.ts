import sgMail from "@sendgrid/mail";
import { Logger } from "./logger";
import "dotenv/config";

export const sendVerifyEmail = async (email: string, verifyCode: number) => {
  try {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to: email,
      from: process.env.SENDER_EMAIL,
      subject: "Code Verify",
      text: `Verify your email with verification code:\n
            ${verifyCode}`,
    };
    await sgMail.send(msg).then(() => {
      Logger.log("Email sent");
    });
  } catch (err: any) {
    Logger.error(err);
    Logger.error(err.body);
  }
};
