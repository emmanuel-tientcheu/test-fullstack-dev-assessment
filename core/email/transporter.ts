import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: "localhost",
  port: 1025, // Port Mailpit (Marmotte)
  secure: false,
  tls: {
    rejectUnauthorized: false,
  },
});
