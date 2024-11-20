// Log request
export const logRequests = (req, res, next) => {
  console.log(`Incoming Request:`);
  console.log(`Method: ${req.method}`);
  console.log(`URL: ${req.url}`);
  console.log(`Headers:`, req.headers);

  // Request
  if (req.body && Object.keys(req.body).length > 0) {
    console.log(`Body:`, req.body);
  } else {
    console.log(`Body: Empty or not applicable`);
  }
  // Proceed with next operation
  next();
};

// Log response
export const logResponses = (req, res, next) => {
  const originalSend = res.send;

  res.send = function (body) {
    console.log(`Outgoing Response:`);
    console.log(`Status: ${res.statusCode}`);
    console.log(`Headers:`, res.getHeaders());
    console.log(`Body:`, body);

    return originalSend.apply(res, arguments);
  };
  // Proceed with next operation
  next();
};
