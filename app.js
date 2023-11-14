const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const {Server} = require("socket.io");

const blogContoller = require("./routes/blog.sockets")
const userContorller = require("./routes/user.socket");

require("dotenv").config();

const app = express();

const server = require('http').createServer(app)
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
})

const PORT = process.env.PORT;

console.log(process.env.EMAIL);
console.log

const blogRouter = require("./routes/blogRoutes");
const userRouter = require("./routes/userRoutes");

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(cors());
app.use(bodyParser.json());

app.use("/blog", blogRouter);
app.use("/user", userRouter);

mongoose.connect(`mongodb+srv://Ethan:${process.env.PASSWORD}@database.iqvpvxu.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`)
.then(() => {
    console.log("Connected to Database 🎉")
}).catch(error => {
    console.log("error in database: " + error);
})

io.on("connection", (socket) => {
    console.log("new connection");

    blogContoller.addComent(io, socket);
    blogContoller.showTyping(io, socket);
    blogContoller.removeTyping(io, socket);
    blogContoller.join(io, socket);

    userContorller.addFollowing(io, socket);
    userContorller.removeFollowing(io, socket);

   
})


server.listen(PORT, () => {
    console.log("Sever Up");
})
