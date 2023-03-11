const express = require('express');
const { protect } = require('../middleware/authMiddleware.js');
const { accessChat, fetchChats, createGroupChat, renameGroup, removeFromGroup, addToGroup } = require('../controllers/chatControllers.js');
const router = express.Router();

router.route('/').post(protect,accessChat)
router.route('/').get(protect,fetchChats)
router.route("/group").post(protect,createGroupChat)
router.route("/rename").put(protect,renameGroup)
router.route("/groupadd").put(protect,addToGroup)
router.route("/groupremove").put(protect,removeFromGroup)

module.exports = router;