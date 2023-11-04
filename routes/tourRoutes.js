//@Core
const express = require("express");
//@Dev
//#Tour Controllsers
const {
  getAllTours,
  getTour,
  createTour,
  deleteTour,
  updateTour,
  aliasTopTours,
  getTourStats,
  getMonthlyPlan,
  getToursWithin,
  getDistances,
  uploadTourImages,
  resizeTourImages,
} = require("../controllers/tourController");

//#Review Controllers
const reviewRouter = require("./reviewRouter");
//#Auth Controllers
const { protect, restrictTo } = require("../controllers/authController");

//@Router Initialization
const router = express.Router();

router.use("/:tourId/reviews", reviewRouter);

router.route("/top-5-cheap").get([aliasTopTours, protect], getAllTours);

router.route("/tour-stats").get(getTourStats);

router
  .route("/monthly-plan/:year")
  .get([protect, restrictTo("admin", "lead-guide", "guide")], getMonthlyPlan);

router
  .route("/tours-within/:distance/center/:latlng/unit/:unit")
  .get(getToursWithin);

router.route("/distances/:latlng/unit/:unit").get(getDistances);

//Tour
router
  .route("/")
  .get(getAllTours)
  .post([protect, restrictTo("admin", "lead-guide")], createTour);

router
  .route("/:id")
  .get(getTour)
  .patch(
    [
      protect,
      restrictTo("admin", "lead-guide"),
      uploadTourImages,
      resizeTourImages,
    ],
    updateTour
  )
  .delete([protect, restrictTo("admin", "lead-guide")], deleteTour);

module.exports = router;
