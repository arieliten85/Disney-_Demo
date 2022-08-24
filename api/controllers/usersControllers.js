const express = require("express");
const passport = require("passport");
const router = express.Router();
const { User } = require("../model/index");

router.get("/", (req, res) => {
  User.findAll().then((result) => res.send(result));
});

router.post("/register", (req, res) => {
  console.log(req.body);
  User.create(req.body).then((user) => res.status(201).send(user));
});

router.post("/login", passport.authenticate("local"), (req, res) => {
  res.send(req.user);
});

router.post("/logout", function (req, res) {
  req.logout(req.user, (err) => {
    if (err) return next(err);
    res.send("Deslogueado");
  });
});

router.get("/me", (req, res) => {
  if (!req.user) return res.sendStatus(401);

  res.send(req.user);
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  User.destroy({ where: { id } }).then(() => res.send(202));
});

module.exports = router;
