import nodemailer from "nodemailer";
import "dotenv/config";

export const transporter = nodemailer.createTransport({
  host: process.env.BREVO_SMTP_HOST,
  port: Number(process.env.BREVO_SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.BREVO_SMTP_USER,
    pass: process.env.BREVO_SMTP_PASS,
  },
});

transporter.verify((err, success) => {
  if (err) {
    console.error("Erreur SMTP", err.message);
  } else console.log("SMTP connecté");
});


// Gère la confirmation par mail
export const sendVerificationMail = async (email, token) => {
  await transporter.sendMail({
    from: "Authentification API <leobaradeldev@gmail.com>",
    to: email,
    subject: "Confirmer votre email",
    html: `<h2> Welcome ${email} to the new website <h2/>
    <p>Merci pour votre inscription , veuiller cliquez sur le lien ci -dessous pour vérifier votre email : </p> <br/>
    <a href="http://localhost:3000/api/auth/verify?token=${token}">Vérifier mon email</a>
    `,
  });
};

// Gère le reset password 
export const sendResetPasswordEmail = async (email, token) => {

  await transporter.sendMail({
    from: "Authentification API <leobaradeldev@gmail.com>",
    to: email,
    subject: "Réinitialiser mot de passe",
    html: `<h2> Welcome ${email} to the new website <h2/>
    <p>Alors ont a plus de mot de passe ? pas de soucis clique ici : </p> <br/>
    <a href="http://localhost:3000/api/auth/reset-password-request?token=${token}">Réinitialiser votre mot de passe</a>
    `,
  });
};

