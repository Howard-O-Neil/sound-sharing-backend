import * as nm from "nodemailer"

let transporter = nm.createTransport({
  host: process.env["SMTP_SERVER"],
  port: Number.parseInt(process.env["SMTP_PORT"] as string),
  auth: {
    user: process.env["SMTP_USERNAME"],
    pass: process.env["SMTP_PASSWORD"],
  }
})

interface EmailPayload {
  from: string;
  to: string;
  subject: string;
  text: string;
}

export const sendMail = async (data: EmailPayload) => {
  await transporter.sendMail(data)
}
