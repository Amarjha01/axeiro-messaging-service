import { connectKafka, consumer } from "./kafka.js";
import { sendEmail } from "./emailService.js";

export const startConsumer = async () => {
  console.log("📡 Starting email consumer...");

  await connectKafka();
  await consumer.subscribe({ topic: "user-signup", fromBeginning: false });

  await consumer.run({
    eachMessage: async ({ message }) => {
      const data = JSON.parse(message.value.toString());
      console.log("📨 Message received:", data);

      await sendEmail({
        to: data.email,
        subject: "Welcome to Seradox 🚀",
        text: "Thank you for signing up!",
        html: `<h2>Welcome to <b>Seradox</b></h2><p>We’re excited to have you on board!</p>`,
      });
    },
  });
};
