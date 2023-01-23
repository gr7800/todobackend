const express = require("express");
const { GetAllItem, GetAllItembyId, GetAllItembySearch, Add, Remove, UpdateGrocerry } = require("../controller/Grocerry.controller");

const router = express.Router();

router.route("/").get(GetAllItem);
router.route("/:id").get(GetAllItembyId);
router.route("/search").get(GetAllItembySearch);
router.route("/").post(Add);
router.route("/:id").delete(Remove);
router.route("/:id").patch(UpdateGrocerry);
module.exports=router;