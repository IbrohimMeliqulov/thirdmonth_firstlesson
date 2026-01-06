export const validationFactory = (Schema) => (req, res, next) => {
  const { error, value } = Schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      status: 200,
      error: error,
    });
  }
  next();
};
