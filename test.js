const mqtt = require('mqtt');

// MQTT over SSL
const mqttOptions = {
  host: 'dev.mstcontrol.com',
  port: 443,
  protocol: 'mqtts',
  username: 'your_username',
  password: 'your_password',
  rejectUnauthorized: false, // This is needed if you are using self-signed certificates
};

const mqttClient = mqtt.connect(mqttOptions);

mqttClient.on('connect', () => {
  console.log('Connected to MQTT over SSL');
  mqttClient.subscribe('test/topic', (err) => {
    if (!err) {
      mqttClient.publish('test/topic', Buffer.from('Hello MQTT over SSL!'));
    }
  });
});

mqttClient.on('message', (topic, message) => {
  console.log(`Received message: ${message.toString()} on topic: ${topic}`);
});

mqttClient.on('error', (error) => {
    console.error('Error:', error);
});

// Web MQTT over WebSockets
const webMqttOptions = {
  host: 'dev.mstcontrol.com',
  port: 443,
  protocol: 'wss',
  path: '/web_mqtt',
  username: 'your_username',
  password: 'your_password',
  rejectUnauthorized: false, // This is needed if you are using self-signed certificates
};

const webMqttClient = mqtt.connect(webMqttOptions);

webMqttClient.on('connect', () => {
  console.log('Connected to Web MQTT over WebSockets');
  webMqttClient.subscribe('test/web_topic', (err) => {
    if (!err) {
      webMqttClient.publish('test/web_topic', Buffer.from('Hello Web MQTT over WebSockets!'));
    }
  });
});

webMqttClient.on('message', (topic, message) => {
  console.log(`Received message: ${message.toString()} on topic: ${topic}`);
});

webMqttClient.on('error', (error) => {
    console.error('Error:', error);
});