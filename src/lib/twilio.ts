import twilioLib from "twilio";

export async function sendSmsOtp(phoneNumber: string, otp: string) {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_NUMBER;

  if (!accountSid || !authToken || !from) {
    throw new Error("Twilio is not configured");
  }

  const client = twilioLib(accountSid, authToken);
  await client.messages.create({
    body: `Jackpotrush: Your verification code is ${otp}. It expires in 3 minutes. Do not share this code with anyone.`,
    from,
    to: phoneNumber,
  });
}
