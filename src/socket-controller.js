// create controller
module.exports = (socket, io) => {

    socket.on('chat message', (data) => {
        console.log(`${data.name}: ${data.msg}`);
        io.emit('chat message', data);
    });

};