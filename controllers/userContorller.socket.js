const userModel = require("../models/userModel");
const sendEmail = require("../utils/emailer");

const addFollowingSocket = async(io, socket, data) => {
    const uuid = data.UUID; 
    const followingUUID = data.followingUUID;

    let email = ""
    let username = ""

    await userModel.findOneAndUpdate({UUID: followingUUID}, {$push: {Followers: uuid}});
    await userModel.findOne({UUID: followingUUID}).then(result => {
        emitFollowers(io, result.Followers.length, followingUUID);
        email = result.Email;
    })

    await userModel.findOneAndUpdate({UUID: uuid}, {$push: {Following: followingUUID}});
    await userModel.findOne({UUID: uuid}).then(result => {
        emitFollowing(io, result.Following.length, uuid);
        username = result.Username;
    })

    sendEmail(email, "New Follower", `<h1>New Follower</h1><p>${username} started following you on Web.IO!</p>`)
}

const removeFollowingSocket = async(io, socket, data) => {
    const uuid = data.UUID; 
    const followingUUID = data.followingUUID;
    
    await userModel.findOneAndUpdate({UUID: followingUUID}, {$pull: {Followers: uuid}});
    await userModel.findOne({UUID: followingUUID}).then(result => {
        emitFollowers(io, result.Followers.length, followingUUID);
    })

    await userModel.findOneAndUpdate({UUID: uuid}, {$pull: {Following: followingUUID}});
    await userModel.findOne({UUID: uuid}).then(result => {
        emitFollowing(io, result.Following.length, uuid);
    })
}

const emitFollowing = (io, Count, id) => io.sockets.emit("following_updated_"+id, {Count});
const emitFollowers = (io, Count, id) => io.sockets.emit("follower_updated_"+id, {Count});

module.exports = {
    addFollowingSocket,
    removeFollowingSocket
}