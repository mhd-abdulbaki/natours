const path = require('path');
// @Third Party
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');

//@Dev
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
//#Routes
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const reviewRouter = require('./routes/reviewRouter');
const viewRouter = require('./routes/viewRoutes');

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

//@Global Middleware
//#Serving Static File
app.use(express.static(path.join(__dirname, 'public')));

//#Set Security Http Headers
// app.use(helmet());
app.use(helmet({ contentSecurityPolicy: false }));

//#Development Looging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//#Limit Request from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: ' Too many request from this IP, please try again in an hour!'
});
app.use('/api', limiter);

//#Body Parser, readin data from body into req.body
app.use(express.json({ limit: '10kb' }));
// #Cookie Parser
app.use(cookieParser());

// #Data sanitization against NoSQL query injextion
app.use(mongoSanitize());

// #Data sanitization against XSS
app.use(xss());

// #Prevent Parameter Pollution
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsQuantity',
      'ratingsAverage',
      'maxGroupSize',
      'price',
      'durationWeeks'
    ]
  })
);

//#Test Middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//@Routes
//#SSR
app.use('/', viewRouter);
//#Endpoint
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
