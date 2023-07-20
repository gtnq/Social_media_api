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

router.route("/").get(getAllThought).post(createThought);

router
	.route("/:id")
	.get(getThoughtById)
	.post(updateThought)
	.delete(deleteThought);

router.route("/:id/reactions").post(addReaction).delete(deleteReaction);

module.exports = router;
