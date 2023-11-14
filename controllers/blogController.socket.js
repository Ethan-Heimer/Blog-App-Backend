const blogController = require("../controllers/blogController");

const addComment = async (io, socket, data) => {
    console.log(data.BlogId);
    await blogController.PostComment(data.BlogId, data.UserId, data.Comment);

    io.sockets.emit("comment_posted");
}

const displayTyping = async (io, socket, data) => {
    console.log(data.username);

    io.to(data.blogId).emit("new_typer", {username: data.username})
    //io.sockets.emit("new_typer_"+data.blogId, {username: data.username});
}

const removeTyping = async (io, socket, data) => {
    console.log("remove");

    io.to(data.blogId).emit("remove_typer", {username: data.username})
    //io.sockets.emit("remove_typer_"+data.blogId, {username: data.username});
}

module.exports = {
    addComment,
    displayTyping,
    removeTyping
}