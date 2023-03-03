const request = require("supertest");
const app = require("../server");
const {
  validateId,
  handleValidationError,
  handleInternalServerError,
  handleGenericError,
} = require("../middleware/errors");
const {
  Error: { ValidationError },
} = require("mongoose");

describe("Middleware /errors", () => {
  test("validateId should call next function when passed valid Id", async () => {
    const mockNext = jest.fn();
    const validMongoID = "60e27d8cbe3c3e3a7f9a276d"; // replace with a valid ObjectId

    const req = {
      params: {
        id: validMongoID,
      },
    };

    validateId(req, {}, mockNext);

    expect(mockNext).toHaveBeenCalled();
  });
  test("404 - validateId should respond with error invalid ID when passed invalid mongo ID", async () => {
    const invalidMongoID = "invalid_id";

    const req = {
      params: {
        id: invalidMongoID,
      },
    };

    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };

    await validateId(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "Invalid id" });
  });
  test("400 - handleValidationError should respond with error", async () => {
    const validationError = new ValidationError(); //mongo error class

    validationError.errors = {
      username: {
        message: "Username is required",
      },
      email: {
        message: "Email is required",
      },
    };

    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    //Simulate behaviour of middleware - passing in mock err, req, res & next
    handleValidationError(validationError, {}, mockRes, {});

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: validationError.message,
    });
  });
  test("500 - handleInternalServerError should respond with internal server error", async () => {
    const error = new Error("Internal server error");
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    //Simulate behaviour of middleware - passing in mock err, req, res & next
    handleInternalServerError(error, {}, mockRes, {});

    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: error.message,
    });
  });
  test("404 - handleNotFound should return error not found when route does not exist", async () => {
    const response = await request(app).get(`/invalidroute`);

    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Route not found");
  });
  test("handleGenericError returns response with same status code and error message when passed an error with a status code", () => {
    const statusCode = 400;
    const errorMessage = "Bad request";
    const err = new Error(errorMessage);
    err.statusCode = statusCode;

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const mockNext = jest.fn();

    handleGenericError(err, {}, mockResponse, mockNext);

    expect(mockResponse.status).toHaveBeenCalledWith(statusCode);
    expect(mockResponse.json).toHaveBeenCalledWith({ message: errorMessage });
    expect(mockNext).not.toHaveBeenCalled();
  });
  test("handleGenericError should call next function with the error", () => {
    const err = new Error("Test error");

    const mockNext = jest.fn();
    handleGenericError(err, null, null, mockNext);

    expect(mockNext).toHaveBeenCalledWith(err);
  });
});
