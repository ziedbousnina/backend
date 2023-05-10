const mqtt = require('mqtt');
const fs = require('fs');

const options = {
  port: 8883,
  host: 'URL 9942400369fe41cea9a3c9bb8e6d23d5.s2.eu.hivemq.cloud',
  username: 'amaltlili',
  password: 'Amaltlili91',
  ca: fs.readFileSync('path/to/certificate.pem'),
};

const client = mqtt.connect(options);

client.on('connect', () => {
  console.log('Connected to MQTT broker');
});

client.on('error', (error) => {
  console.error('Error:', error);
});

client.on('message', (topic, message) => {
  console.log(`Received message on topic "${topic}": ${message.toString()}`);
});

client.subscribe('my/topic');

client.publish('my/topic', 'Hello, MQTT!');