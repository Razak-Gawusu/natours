const Tour = require('../models/tourModel')
const User = require('../models/userModel')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')

const getOverview = catchAsync (async (req, res) => {
    // Get tour data from collection
    const tours = await Tour.find()

    res.status(200).render('overview', {
      title: 'All Tours',
      tours
    });
  })


const getTour = catchAsync(async(req, res, next) => {
    const tour = await Tour.findOne({slug: req.params.slug}).populate({
        path: 'reviews',
        fields: 'reviews rating user'
    })

    if(!tour) {
        return next(new AppError('There is no Tour with that name', 404))
    }
    res.status(200).render('tour', {
        title: tour.name,
        tour
    })

})

const getLoginForm = catchAsync(async(req, res, next) => {
    res.status(200).render('login', {
        title: 'Log into your account'
    })
})

const getAccount = (req, res) => {
    res.status(200).render('account', {
        title: 'Your account'
    })
}

const updateUserData = catchAsync (async (req, res, next) => {
    const updatedUser = await User.findByIdAndUpdate(req.user.id, {
        name: req.body.name,
        email: req.body.email
    }, {
        new: true,
        runValidators: true
    })

    res.status(200).render('account', {
        title: 'Your account',
        user: updatedUser
    })
})

module.exports = {
    getOverview,
    getTour,
    getLoginForm,
    getAccount,
    updateUserData
}