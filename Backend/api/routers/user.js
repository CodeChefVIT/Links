const router = require("express").Router();

const user = require("../controllers/user");

app.get("/allLinks", allLinks);

module.exports = router;