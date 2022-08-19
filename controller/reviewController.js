const Review = require('../models/reviewModel');
//const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');


const getAllReviews = factory.getAll(Review)

const getReview = factory.getOne(Review)

const setTourUserIds = (req, res, next) => {
  // Allow nested routes
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

const createReview = factory.createOne(Review)
// const createReview = catchAsync(async (req, res, next) => {
//   // Allow nested routes
//   if (!req.body.tour) req.body.tour = req.params.tourId;
//   if (!req.body.user) req.body.user = req.user.id;

//   const newReview = await Review.create(req.body);

//   res.status(201).json({
//     status: 'success',
//     data: {
//       review: newReview,
//     },
//   });
// });

const updateReview = factory.updateOne(Review);

const deleteReview = factory.deleteOne(Review);

module.exports = {
  getAllReviews,
  getReview,
  setTourUserIds,
  createReview,
  updateReview,
  deleteReview,
};
