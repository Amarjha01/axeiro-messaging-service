// kafka.js
import { Kafka, Partitioners } from "kafkajs";

const kafka = new Kafka({
  clientId: "seradox-mail-service",
  brokers: ["10.149.30.114:9092"], 
});


export const producer = kafka.producer({
  createPartitioner: Partitioners.LegacyPartitioner,
});
export const consumer = kafka.consumer({ groupId: "mail-service-group" });

export const connectKafka = async () => {
  await producer.connect();
  await consumer.connect();
};
