const express = require("express");
const blogController = require("../controllers/blogController");

const router = express.Router();

router.get("/get/:id", blogController.Get);
router.get("/getAll", blogController.GetAll);
router.get("/getAll:userid", blogController.GetAllByUser);
router.delete("/delete/:id", blogController.Delete);
router.patch("/append/:id?", blogController.Append);
router.get("/getbytitle/:keyword?", blogController.getBlogsByKeyWords);

module.exports = router;