module.exports = (schema) => {
    return (req, res, next) => {

      const dataToValidate = {
        ...req.body,
        ...(req.file && { image: req.file }),
      };
  
      const { error } = schema.validate(dataToValidate);
  
      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }
  
      next();
    };
  };
  