var amqp = require('amqplib/callback_api');

const url = 'amqp://localhost';
const queueName = 'queue';

amqp.connect(url, async (err, conn) => {
    if(err) throw err;
    
    var channel = await conn.createChannel();
    await channel.assertQueue(queueName);

    console.log('Waiting for messages');

    channel.consume(queueName, (msg) => {
        console.log("Received %s", msg.content.toString());
    }, {
        noAck: true
    });
});