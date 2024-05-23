const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  attachments: [String],
  tags: [String]
});


const columnSchema = new mongoose.Schema({
  title: { type: String, required: true },
  tasks: [taskSchema] 
});

const boardSchema = new mongoose.Schema({
  title: { type: String, required: true },
  columns: [columnSchema] 
});


const userSchema = new mongoose.Schema({
    username: {
      type: String,
      required: "Username is required",
      unique: true,
    },
    email: {
        type: String,
        required: "Email is required",
        unique: true,
      },
    password: {
      type: String,
      required: "Password is required",
    },
    boards:[boardSchema],
})

const User = mongoose.model('User', userSchema);


userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
  });
  
  userSchema.methods.comparePassword = function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
  };

  module.exports = User;