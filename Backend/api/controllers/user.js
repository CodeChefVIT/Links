
  
const User = require("../models/user");
const Link = require("../models/link");


exports.allLinks = async (req, res) => {
    Link.find()
        .then((result) => {
            res.status(200).send(result);
        })
        .catch((err) => {
            console.log(err);
        })
}