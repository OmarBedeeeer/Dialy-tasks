export class ErrorHandler extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

export const catchError = (fn) => (req, res, next) => {
  fn(req, res, next).catch((error) => next(error));
};
