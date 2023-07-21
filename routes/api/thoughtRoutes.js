const router = require("express").Router();
const {
	getAllThought,
	getThoughtById,
	createThought,
	deleteThought,
	updateThought,
	addReaction,
	deleteReaction,
} = require("../../controller/thoughtController");

router.route("/").get(getAllThought).post(createThought)
router
	.route("/:id")
	.get(getThoughtById)
	.put(updateThought).delete(deleteThought);

	

router.route("/:id/reactions").post(addReaction)

router.route("/:id/reactions/:reactionId").delete(deleteReaction)

module.exports = router;
