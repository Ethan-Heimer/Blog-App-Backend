const blogModel = require("../models/blogModel");
const userModel = require("../models/userModel");
const TryDataBaseMethod = require("../utils/DatabaseHelpers");
const sendEmail = require("../utils/emailer");

const Get = async (req, res) => { 
    let id = req.params.id;

    TryDataBaseMethod(() => blogModel.findById(id), res, "Blog Got")
}

const GetAll = async (req, res) => {
    TryDataBaseMethod(() => blogModel.find(), res, "Blogs Gotten");
}

const GetAllByUser = async(req, res) => {
    TryDataBaseMethod(() => blogModel.find({UserId: req.params.userid}), res, "Blogs Gotten");
}

const Delete = async(req, res) => {
    let id = req.params.id;
   
    console.log(id);
    TryDataBaseMethod(() => blogModel.findByIdAndDelete(id), res, "Blog Deleted");
}

const Append = async(req, res) => {
    let id = req.params.id;

    TryDataBaseMethod(() => blogModel.findByIdAndUpdate(id, req.body, {upsert: true}), res, 'blog added');
    EmailFollowers(req.body.UserId, req.body.Header);
}

const PostComment = async(id, uuid, comment) => {
    await blogModel.findById(id).then( async(resault) => {
        if(resault == undefined)
            return;
    
        resault.Comments.push({
            PosterId: uuid,
            Message: comment
        })
        resault.save();
        
    }).catch(error => console.log(error));
}

const getBlogsByKeyWords = async(req, res) => {
    const keyword = req.params.keyword || "";

    TryDataBaseMethod(() => blogModel.find({Header : {$regex : keyword}}), res, "Blogs Gotten");
}

async function EmailFollowers(UUID, Header){
    await userModel.findOne({UUID: UUID}).then(resault => {
        const followers = resault.Followers;

        followers.forEach(async(x) => {
            await userModel.findOne({UUID: x}).then(fResult => {
                const email = fResult.Email;

                sendEmail(email, fResult.Username + " Posted!", `<h1>Someone you follow just posted!</h1><p>${fResult.Username} posted a new blog: ${Header}</p>`);
            })
        })
    }).catch(error => console.log(error));
}

module.exports = {
    Get,
    GetAll,
    GetAllByUser,
    Delete, 
    Append,
    PostComment,
    getBlogsByKeyWords
}