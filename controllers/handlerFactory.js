const { catchAsync } = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const { APIFeatures } = require('../utils/apiFeature');

const deleteOne = Model =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndRemove(req.params.id);

    if (!doc) return next(new AppError('No document found with that id', 404));

    res.status(204).json({
      status: 'success'
    });
  });

const updateOne = Model =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!doc) return next(new AppError('No document found with that id', 404));

    res.status(200).json({
      status: 'success',
      data: {
        data: doc
      }
    });
  });

const createOne = Model =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        data: doc
      }
    });
  });

const getOne = (Model, popOptions) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (popOptions) query = query.populate(popOptions);

    const doc = await query;

    if (!doc) {
      return next(new AppError('No document found with that id', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: doc
      }
    });
  });

const getAll = Model =>
  catchAsync(async (req, res, next) => {
    //To allow for nested GET reviews on tour
    let filter = {};
    if (req.params.tourId) filter = { tour: req.params.tourId };

    const features = new APIFeatures(Model.find(filter), req.query)
      .sort()
      .filter()
      .paginate()
      .limitFields();

    // const doc = await features.query.explain();
    const doc = await features.query;
    res.status(200).json({
      status: 'success',
      results: doc.length,
      data: {
        data: doc
      }
    });
  });

module.exports = { deleteOne, createOne, updateOne, getOne, getAll };
