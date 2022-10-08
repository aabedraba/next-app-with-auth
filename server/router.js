import express from "express";

export const router = express.Router();

router.get("/", (req, res) => {
  console.log("cookies: ", req.cookies);
  return res.send("hola api");
});

router.get("/user", (req, res) => {
  const { authToken } = req.cookies;

  // simulo una consulta a la base de datos
  if ( authToken === "manuel" ) {
    return res.json({
      user: "manuel",
      email: "manuel@gmail.com",
    });
  }
});

router.post("/login", (req, res) => {
  if (req.body.user === "manuel" && req.body.pass === "pass") {
    res.cookie("authToken", "manuel")
    return res.status(201).end()
  }
  console.log(req.body);
  return res.status(401).end()
});
