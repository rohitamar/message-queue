var amqp = require('amqplib/callback_api'); 

const url = 'amqp://localhost';
const queueName = 'queue';

amqp.connect(url, async (err, conn) => {
    if(err) throw err;

    var channel = await conn.createChannel();
    await channel.assertQueue(queueName);

    setInterval(async () => {
        var message = {
            'company': 'AAPL',
            'price': 130
        };
        var serialized = JSON.stringify(message);
        await channel.sendToQueue(queueName, Buffer.from(serialized));
        console.log('[x] sent %s', message);
    }, 0);
});