const express = require("express");
const cors = require("cors");
const app = express();
const volleyball = require("volleyball");
const routes = require("./routes");
const db = require("./config/db");

//const path = require("path");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const PORT = 4000;
const LocalStrategy = require("passport-local").Strategy;
const User = require("./model/User");

app.use(volleyball);
app.use(express.json());
app.use(cors());
app.set("trust proxy", 1);
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  session({
    secret: "disneyApp",
    resave: true,
    saveUninitialized: true,
    cookie: {
      secure: true,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },

    function (email, password, done) {
      User.findOne({ where: { email } })
        .then((user) => {
          if (!user) done(null, false);

          user.hash(password, user.salt).then((hash) => {
            if (hash !== user.password) done(null, false);

            return done(null, user);
          });
        })
        .catch(done);
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id)
    .then((user) => done(null, user))
    .catch(done);
});


app.use("/api", routes);

db.sync({ force: false })
  .then(function () {
    app.listen(PORT, () => {
      console.log("Servidor corriendo en el puerto http://localhost:4000");
    });
  })
  .catch(console.error);
