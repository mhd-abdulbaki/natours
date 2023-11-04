const Tour = require('../models/tourModel');
const AppError = require('../utils/appError');
const { catchAsync } = require('../utils/catchAsync');

const getOverview = catchAsync(async (req, res, next) => {
  // 1) Get tour data from collection
  const tours = await Tour.find();

  // 2) Build template
  // 3) Render that template using tour data from 1
  res.status(200).render('overview', {
    title: 'All Tours',
    tours
  });
});

const getTour = catchAsync(async (req, res, next) => {
  //1) Get the data, for requrested tour (including reviews and guides)
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: 'reviews',
    fields: 'review rating user'
  });

  if (!tour) {
    return next(new AppError('There is no tour with that name.', 404));
  }
  //2) Build template
  //3)Render template using dat from 1)

  res
    .status(200)
    .set(
      'Content-Security-Policy',
      "default-src 'self' https://*.mapbox.com ;base-uri 'self';block-all-mixed-content;font-src 'self' https: data:;frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src https://cdnjs.cloudflare.com https://api.mapbox.com 'self' blob: ;script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests;"
    )
    .render('tour', {
      title: tour.name,
      tour
    });
});

const getLoginForm = catchAsync(async (req, res, next) => {
  res.status(200).render('login', {
    title: 'Sign in into your account'
  });
});

const getAccount = catchAsync(async (req, res) => {
  res.status(200).render('account', {
    title: req.user.name
  });
});

module.exports = { getOverview, getTour, getLoginForm, getAccount };
