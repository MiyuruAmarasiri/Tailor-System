// Add this near the bottom of your app.js / server.js file, right before app.listen()

// Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    success: false,
    error: {
      message: message,
      stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack
    }
  });
});
