const dotenv = require("dotenv");
const ENV = dotenv.config().parsed;

const saveMessage = async (message) => {
  try {
    let response = await fetch(ENV.API_URL + "/api/v1/chat/save_message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(message),
    });
    let resp = response.json();
    return resp;
  } catch (e) {
    console.error(e);
    return false;
  }
};

// create controller
module.exports = (socket, io) => {
  socket.on("chat message", (message) => {
    try {
      saveMessage(message).then((res) => {
        console.log(`laravel resp`, res);
        io.emit("chat message", {
            ...message,
            userId: socket.id,
          });
      });
    } catch (e) {
      console.error(e);
    }

  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });

  socket.on("error", (error) => {
    console.error("Socket error:", error);
  });
};
