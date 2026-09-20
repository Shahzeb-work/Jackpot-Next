import sgMail from "@sendgrid/mail";

export async function sendEmailOtp(to: string, otp: string) {
  const apiKey = process.env.SENDGRID_API_KEY_NEW || process.env.SENDGRID_API_KEY;
  const from = process.env.SENDGRID_EMAIL_FROM;
  const templateId = process.env.VERIFY_TEMPLATE;

  if (!apiKey || !from || !templateId) {
    throw new Error("SendGrid is not configured");
  }

  sgMail.setApiKey(apiKey);

  await sgMail.send({
    from: { name: "JackpotRush", email: from },
    templateId,
    personalizations: [
      {
        to: { email: to },
        dynamicTemplateData: { OTP: otp },
      },
    ],
  });
}
