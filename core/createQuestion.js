const mongoose = require("mongoose");

const createQuestion = new mongoose.Schema({
   question : []
});

module.exports = mongoose.model("createQuestion", createQuestion);