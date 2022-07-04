import amqplib from 'amqplib'

const connectionString = process.env.RABBITMQ_CONNECTION_STRING || 'amqp://fila-soo:Grupo05-SOO@localhost:5672'

const getChannel = async (queue) => {
    console.log(`Connecting to ${connectionString} queue ${queue}`)
    const connection = await amqplib.connect(connectionString, "heartbeat=60")
    const channel = await connection.createChannel()
    await connection.createChannel()
    await channel.assertQueue(queue, { durable: true })
    return { connection, channel }
}

const consume = async (queue, action) => {
    const { connection, channel } = await getChannel(queue)
    await channel.consume(queue, async (msg) => {
        console.log(`Message received: ${msg.content}`)
        channel.ack(msg)
        await action(msg)
    })
    setTimeout(() => {
        channel.close()
        connection.close()
    }, 500)
}

const publish = async (queue, object) => {
    const { connection, channel } = await getChannel(queue)
    channel.publish("", "", Buffer.from(object))
    console.log(`Message ${object} published to queue ${queue}`)
    setTimeout(() => {
        channel.close()
        connection.close()
    }, 500)
}

export {
    consume,
    publish
}
