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
 

exports.updateCount = async (req, res) => {
    //const link = req.body.link;
    const id = req.params.id;

    Link.updateOne({ _id: id }, { $inc: { clicks: 1 } })
        .then(result => {
            res.status(200).send(result);
        })
        .catch((err) => {
            console.log(err);
        });
}
