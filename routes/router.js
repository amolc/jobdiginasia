const adminController = require("../controller/api/adminController")
const express = require("express");
const router = express.Router();

router.get('/admin',adminController.getAllData);
router.get('/user',adminController.getallCandidate);
router.post('/user',adminController.addDataInCandidate);
router.get('/user/:id',adminController.findUser);
router.delete('/user/:id',adminController.deleteUser);
router.put('/user/:id',adminController.updateUser);

module.exports = router
