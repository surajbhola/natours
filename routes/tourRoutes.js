const express = require("express");
const fs = require("fs");
const tourController = require("../controllers/tourController");
const authController = require("../controllers/authController");
const { protect } = require("../controllers/authController");
const router = express.Router();
const reviewController = require("../controllers/reviewController");

const reviewRouter = require("../routes/reviewRoutes");



router.use("/:tourId/reviews", reviewRouter);

router
  .route("/top-5-cheap")
  .get(tourController.aliasTopTours, tourController.getAllTours);

router
  .route("/monthly-plan/:year")
  .get(
    protect,
    authController.restrictTo("admin", "lead-guide", "guide"),
    tourController.getMonthlyPlan
  );
router.route("/tour-stats").get(tourController.getTourStats);
router
  .route("/")
  .get(tourController.getAllTours)
  .post(
    protect,
    authController.restrictTo("admin", "lead-guide"),
    tourController.createTour
  );

router.route("/tours-within/:distance/center/:latlng/unit/:unit").get(tourController.getToursWithin);

router
  .route("/:id")
  .get(tourController.getTour)
  .patch(
    authController.protect,
    authController.restrictTo("admin", "lead-guide"),
    tourController.updateTour
  )
  .delete(
    authController.protect,
    authController.restrictTo("admin", "lead-guide"),
    tourController.deleteTour
  );

module.exports = router;
