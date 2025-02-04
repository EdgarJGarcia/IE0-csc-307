import express from "express";
import cors from "cors";
import userService from "./services/user-service.js";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const { MONGO_CONNECTION_STRING } = process.env;

mongoose.set("debug", true);
mongoose
  .connect(MONGO_CONNECTION_STRING + "users") // connect to Db "users"
  .catch((error) => console.log(error));

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/users", async (req, res) => {
  try {
    const user = await userService.addUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating user" });
  }
});



app.get("/users", async (req, res) => {
  const { name, job } = req.query;
  try {
    const users = await userService.getUsers(name, job);
    res.json({ users_list: users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching users" });
  }
});


app.get("/users/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const user = await userService.findUserById(id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching user" });
  }
});


app.delete("/users/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await userService.deleteUserById(id);
    res.status(204).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting user" });
  }
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

