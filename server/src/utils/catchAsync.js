export const catchAsync = (fn) => {
  return function(req, res, next) {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));
  }
}