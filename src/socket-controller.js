// create controller
module.exports = (socket, io) => {


    socket.on('chat message', (message) => {
        io.emit('chat message', {
            ...message,
            userId: socket.id
        });
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });

    socket.on('error', (error) => {
        console.error('Socket error:', error);
    });

};