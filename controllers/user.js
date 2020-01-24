const User = require("../models").User;
var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;

module.exports = {
  register(req, res) {
    const email = req.body.email;
    const password = req.body.password;

    return User.findOne({
      where: {
        email: email
      }
    }).then(user => {
      if (!user) {
        const hash = bcrypt.hash(password, saltRounds, function(err, hash) {
          // Store hash in your password DB.
          User.create({
            email: email,
            password: hash,
            createdBy: "Udayini God Mother"
          })

            .then(user => {
              console.log(user);

              return res.status(201).send(user);
            })
            .catch(error => {
              return res.status(400).send(error);
            });
        });
      } else {
        res.send({ error: "user already exists" });
      }
    });
  },
  getUserbyid(req, res) {
    const email = req.body.email;
    const password = req.body.password;
    const users = {
      email,
      password
    };
    return User.findOne({
      where: {
        email: email
      }
    })
      .then(user => {
        if (!user) {
          return res.send({ error: "incorrect email" });
        }
        console.log(user);
        bcrypt.compare(password, user.password).then(function(result) {
          if (!result) {
            return res.send({ error: "incorrect password" });
          } else {
            Token = jwt.sign({ users }, "secret-key", {});

            return res.json({ Token });
          }
        });
      })
      .catch(error => {
        return res.status(400).send(error);
      });
  },
  getUsers(req, res) {
    return User.findAll().then(user => {
      res.send(user);
      console.log("All users:", JSON.stringify(user));
    });
  }
};
