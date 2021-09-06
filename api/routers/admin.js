const router = require("express").Router();
const admin = require("../controllers/admin");
const auth = require("../middlewear/auth");

router.post("/newLink", auth.authenticateToken, admin.newLink);
router.post("/token", admin.token);
router.post("/login", admin.login);

router.put("/updateLink/:id", auth.authenticateToken, admin.updateLink);
router.delete("/deleteLink/:id", auth.authenticateToken , admin.deleteLink);
router.delete("/logout", admin.logout);

module.exports = router;