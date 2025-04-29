import { transporter } from "./transporter";

interface Course {
  name: string;
  date: Date;
  location: string;
  trainer: {
    name: string;
    email: string;
  };
  trainingSubjects: { id: number; name: string }[];
}

export async function notifyTrainerByEmail(course: any) {
  const {
    name: courseName,
    date,
    location,
    trainer,
    trainingSubjects,
  } = course;

  const trainerName = trainer.name;
  const trainerEmail = trainer.email;

  const courseDate = new Date(date).toLocaleDateString("fr-FR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const subjectsList = trainingSubjects
    .map((s: { name: any }) => `<li>${s.name}</li>`)
    .join("");

  const message = {
    from: '"Cours Manager" <no-reply@coursapp.com>',
    to: trainerEmail,
    subject: `Affectation à un nouveau cours : ${courseName}`,
    html: `
      <p>Bonjour <strong>${trainerName}</strong>,</p>
      <p>Vous avez été affecté au cours suivant :</p>
      <ul>
        <li><strong>Nom du cours :</strong> ${courseName}</li>
        <li><strong>Date :</strong> ${courseDate}</li>
        <li><strong>Lieu :</strong> ${location}</li>
        <li><strong>Sujets de formation :</strong></li>
        <ul>
          ${subjectsList}
        </ul>
      </ul>
      <p>Merci pour votre implication !</p>
    `,
  };

  await transporter.sendMail(message);
}
