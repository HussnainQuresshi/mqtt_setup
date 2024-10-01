const mqtt = require('mqtt');

// MQTT over SSL
const mqttOptions = {
  host: 'mstcontrol.com',
  port: 8883,
  protocol: 'mqtts',
  username: 'your_username',
  password: 'your_password',
  rejectUnauthorized: false, // This is needed if you are using self-signed certificates
  secureProtocol: 'TLSv1_2_method',

};

const mqttClient = mqtt.connect(mqttOptions);

mqttClient.on('connect', () => {
  console.log('Connected to MQTT over SSL');
  mqttClient.subscribe('topic', (err) => {
    if (!err) {
      mqttClient.publish('topic', Buffer.from(JSON.stringify({ message: 'Hello Web MQTT over WebSockets!' })));
    }
  });
});

mqttClient.on('message', (topic, message) => {
  console.log(`Received message: ${message.toString()} on topic: ${topic}`);
});

mqttClient.on('error', (error) => {
    console.error('Error:', error);
});

// // Web MQTT over WebSockets
// const webMqttOptions = {
//   host: 'mstcontrol.com',
//   port: 443,
//   protocol: 'wss',
//   path: '/ws',
//   username: 'your_username',
//   password: 'your_password',
//   rejectUnauthorized: false, // This is needed if you are using self-signed certificates
//   protocolVersion: 4,
//   secureProtocol: 'TLSv1_2_method',

// };

// const webMqttClient = mqtt.connect(webMqttOptions);

// webMqttClient.on('connect', () => {
//   console.log('Connected to Web MQTT over WebSockets');
//   webMqttClient.subscribe('web_topic', (err) => {
//     if (!err) {
//       webMqttClient.publish('web_topic', Buffer.from(JSON.stringify({ message: 'Hello Web MQTT over WebSockets!' })));
//     }
//   });
// });

// webMqttClient.on('message', (topic, message) => {
//   console.log(`Received message: ${message.toString()} on topic: ${topic}`);
// });

// webMqttClient.on('error', (error) => {
//     console.error('Error:', error);
// });