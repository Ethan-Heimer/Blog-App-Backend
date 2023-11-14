const userController = require("../controllers/userContorller.socket");

const addFollowing = (io, socket) => {
    socket.on("add_follow", (data) => userController.addFollowingSocket(io, socket, data))
}

const removeFollowing = (io, socket) => {
    socket.on("remove_follow", (data) => userController.removeFollowingSocket(io, socket, data))
}

module.exports = {
    addFollowing, removeFollowing
}