const express = require("express");
const app = express();
const http = require("http");
const usersList = require("./users.json");

app.use(express.json());
app.get("/ping", (req, res) => {
  res.send("Pong");
});

app.get("/users", (req, res) => {
  const users = usersList;
  res.json(users);
});

app.get("/users/user", (req, res) => {
  const userId = parseInt(req.query.id);
  const user = usersList.filter((user) => user.id === userId);
  res.json(user);
});

app.post("/users/create", (req, res) => {
  const user = req.body;
  // const maxUserId =
  const users = usersList;
  users.push(user);
  res.json(users);
});

app.put("/users/updateUser/:id", (req, res) => {
  const updatedUser = req.body;
  const userId = parseInt(req.params.id);
  console.log(userId);
  let users = usersList;
  const userIndex = users.findIndex((u) => u.id === parseInt(req.params.id));
  console.log(userIndex);
  if (userIndex === -1) return res.status(404).send("User not found.");
  users[userIndex] = {
    ...users[userIndex],
    ...updatedUser,
  };
  console.log(updatedUser);
  res.json(users);
});

// put -
// patch --  delete
const server = http.createServer(app);

server.listen(8080, () => {
  console.log("listening on port: " + 8080);
});
