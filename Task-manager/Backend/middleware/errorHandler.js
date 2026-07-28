const errorHandler = (err, req, res, next) => {
    console.error(err);
  
    return res.status(500).json({
      error: {
        code: "INTERNAL_SERVER_ERROR",
        message: " server error",
      },
    });
  };
  
  module.exports = {
    errorHandler,
  };