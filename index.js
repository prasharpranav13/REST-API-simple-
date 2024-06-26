const express = require("express");
const PORT = 8000;
const app = express();
const users = require("./MOCK_DATA.json");

app.get("/users", (req, res) => {
  const html = `
  <ul>
  ${users
    .map((user) => {
      return ` <li> ${user.first_name}</li>`;
    })
    .join("")}
  </ul>}`;
  return res.send(html);
});

//REST API
app.get("/api/users", (req, res) => {
  return res.json(users);
});

app.get("/api/users/:userId", (req, res) => {
  const id = Number(req.params.userId);
  const user = users.find((item) => item.id === id);
  return res.json(user);
});

// app.post("/api/users/:userId", (req, res) => {
//   return res.json({ status: "pending" });
// });
// app.patch("/api/users/:userId", (req, res) => {
//   return res.json({ status: "pending" });
// });
// app.delete("/api/users/:userId", (req, res) => {
//   return res.json({ status: "pending" });
// });

// app
//   .route("/api/users/:userId")
//   .post((req, res) => {
//     return res.json({ status: "pending" });
//   })
//   .patch((req, res) => {
//     return res.json({ status: "pending" });
//   })
//   .delete((req, res) => {
//     return res.json({ status: "pending" });
//   });

const fs = require("fs");
app.use(express.urlencoded({ extended: false })); //middleware
app.post("/api/users", (req, res) => {
  const body = req.body;
  users.push({ ...body, id: users.length + 1 });
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    return res.json({ status: `sucess`, id: users.length });
  });
});

app.listen(PORT, () => console.log(`server started`));
