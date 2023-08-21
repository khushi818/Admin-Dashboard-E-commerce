class AppError extends Error {
  isOperational: boolean;
  stack: string;
  constructor(public message: string, public statusCode: number) {
    super(message);
    this.stack = `${statusCode}`.startsWith("4") ? "fail" : "errror";
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
