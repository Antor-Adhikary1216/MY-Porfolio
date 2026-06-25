export const asyncHandler = (handler) => (request, response, next) =>
  Promise.resolve(handler(request, response, next)).catch(next);

export const sendData = (response, data, status = 200) =>
  response.status(status).json({ data });
