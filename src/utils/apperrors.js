class ConflictError extends Error {
  constructor(message = "Email already registered!") {
    super(message);
    this.name = "ConflictError";
    this.statusCode = 409;
  }
}

class AuthError extends Error {
  constructor(message = "Invalid email or password") {
    super(message);
    this.name = "AuthError";
    this.status = 401;
  }
}
module.exports = { ConflictError, AuthError };
