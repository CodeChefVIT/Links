const User = require("../models/user");
const Link = require("../models/link");
const auth = require("../middlewear/auth");
const jwt = require('jsonwebtoken')

exports.newLink = async (req, res) => {
  const { name, redirectTo, clicks } = req.body;
  console.log(req.body); //
  const link1 = new Link({ name, redirectTo, clicks });

  link1
    .save()
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.updateLink = async (req, res) => {
  const id = req.params.id;
  const { name, redirectTo, clicks } = req.body;
  console.log(req.body);
  const link1 = new Link({ name, redirectTo, clicks });

  Link.updateOne({ id: id }, link1)
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.deleteLink = async (req, res) => {
  const id = req.params.id;

  Link.findByIdAndDelete(id)
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.token = async (req, res) => {
  const refreshToken = req.body.token;
  if (refreshToken == null) return res.sendStatus(401);
  if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    const accessToken = generateAccessToken({ name: user.name });
    res.json({ accessToken: accessToken });
  });
};

exports.logout = async (req, res) => {
  refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
  res.sendStatus(204);
};

exports.login = async  (req, res) => {

  const username = req.body.name;
  const user = { name: username };
  const password = req.body.password;

  if (password != process.env.ADMIN_PASSWORD) {
    return res.status(402).json({
      message: "Incorrect Passowrd",
    });
  }

  const accessToken = auth.generateAccessToken(user);
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
  refreshTokens.push(refreshToken);
  res.json({ accessToken: accessToken, refreshToken: refreshToken });
};
