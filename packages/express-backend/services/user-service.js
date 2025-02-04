import 'dotenv/config';
import mongoose from "mongoose";
import userModel from "../models/user.js";
import { config } from 'dotenv';
config();


mongoose.set("debug", true);

mongoose
  .connect(process.env.MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((error) => console.log(error));


function findUserById(id) {
  return userModel.findById(id);
}

function addUser(user) {
  const userToAdd = new userModel(user);
  const promise = userToAdd.save();
  return promise;
}

function findUserByName(name) {
  return userModel.find({ name: name });
}

function findUserByJob(job) {
  return userModel.find({ job: job });
}

function deleteUserById(id) {
  return userModel.findByIdAndRemove(id);
}

function getUsers(name, job) {
  let promise;
  if (name && job) {
    promise = userModel.find({ name: name, job: job });
  } else if (name) {
    promise = findUserByName(name);
  } else if (job) {
    promise = findUserByJob(job);
  } else {
    promise = userModel.find();
  }
  return promise;
}


export default {
  addUser,
  getUsers,
  findUserById,
  findUserByName,
  findUserByJob,
};
