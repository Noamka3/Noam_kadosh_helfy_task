const express = require("express");
const {getAllTasks,createTask,updateTask,toggleTask,deleteTask} = require("../controllers/taskcontroller");

const router = express.Router();


//All routers (HTTP METHOD)
router.get("/",getAllTasks);
router.post("/",createTask);
router.put("/:id",updateTask);
router.delete("/:id",deleteTask);
router.patch("/:id/toggle",toggleTask);

module.exports = router