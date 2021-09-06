const router = require("express").Router();
const user = require("../controllers/user");

router.get("/allLinks", user.allLinks);
router.put('/updateCount/:id', user.updateCount)

module.exports = router;