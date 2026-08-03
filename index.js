module.exports = (req, res) => {
  res.status(200).json({
    message: "Welcome to Aegis App!",
    status: "Running successfully! 🚀"
  });
};
