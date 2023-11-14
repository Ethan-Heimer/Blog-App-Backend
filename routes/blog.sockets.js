const blogController = require("../controllers/blogController.socket");

const addComent = (io, socket) => {
    socket.on("post_comment", async (data) => blogController.addComment(io, socket, data))
}

const showTyping = (io, socket) => {
    socket.on("typing", async (data) => blogController.displayTyping(io, socket, data))
}

const removeTyping = (io, socket) => {
    socket.on("remove_typing", async (data) => blogController.removeTyping(io, socket, data))
}

const join = (io, socket) => {
    socket.on("join_blog", (data) => {
        socket.join(data.blogId);
    })
}

module.exports = {
    addComent,
    showTyping,
    removeTyping,
    join
}