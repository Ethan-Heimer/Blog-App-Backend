const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
    Header: String,
    Content: String,
    UserId: String,

    ThumbnailURL: String,
    Comments: Array,

    _id: {type: Number, required: true}
},
{
    collection: "Blog"
})

module.exports = mongoose.model("Blogs", blogSchema);