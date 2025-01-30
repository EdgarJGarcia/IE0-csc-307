import express from "express";
import cors from "cors";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const users = {
  users_list: [
    {
      id: "xyz789",
      name: "Charlie",
      job: "Janitor"
    },
    {
      id: "abc123",
      name: "Mac",
      job: "Bouncer"
    },
    {
      id: "ppp222",
      name: "Mac",
      job: "Professor"
    },
    {
      id: "yat999",
      name: "Dee",
      job: "Aspring actress"
    },
    {
      id: "zap555",
      name: "Dennis",
      job: "Bartender"
    }
  ]
};

const findUserByName = (name) => {
  return users["users_list"].filter(
    (user) => user["name"] === name
  );
};

const addUser = (user) => {
  users["users_list"].push(user);
  return user;
};

app.post("/users", (req, res) => {
  const userToAdd = req.body;
  addUser(userToAdd);
  res.status(200).send(); // Explicitly send a 200 OK response
});

const deleteUserById = (id) => {
  const index = users["users_list"].findIndex((user) => user["id"] === id);
  if (index !== -1) {
    users["users_list"].splice(index, 1);
    return true; // User was successfully deleted
  }
  return false; // User not found
};

app.delete("/users/:id", (req, res) => {
  const id = req.params["id"];
  const userDeleted = removeUserById(id);

  if (userDeleted) {
    res.status(200).send(`User with ID ${id} successfully deleted.`);
  } else {
    res.status(404).send("User not found.");
  }
});


const findUsersByNameAndJob = (name, job) => {
  return users["users_list"].filter(
    (user) => user["name"] === name && user["job"] === job
  );
};

app.get("/users", (req, res) => {
  const { name, job } = req.query;
  let result;

  if (name && job) {
    result = findUsersByNameAndJob(name, job);
  } else if (name) {
    result = findUserByName(name);
  } else {
    result = users["users_list"];
  }

  result = { users_list: result };
  res.send(result);
});

const findUserById = (id) => {
  return users["users_list"].find((user) => user["id"] === id);
};

const removeUserById = (id) => {
  const index = users["users_list"].findIndex((user) => user["id"] === id);
  if (index !== -1) {
    users["users_list"].splice(index, 1);
    return true; // Successfully deleted the user
  }
  return false; // User not found
};


app.get("/users", (req, res) => {
  const name = req.query.name; // Retrieve the query parameter 'name'
  if (name != undefined) {
    let result = findUserByName(name);
    result = { users_list: result };
    res.send(result);
  } else {
    res.send(users); // Send all users if no 'name' is specified
  }
});

app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; // or req.params.id
  let result = findUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found."); // Send a 404 response if user is not found
  } else {
    res.send(result); // Send the user details if found
  }
});

app.get("/users", (req, res) => {
  res.send(users);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});



