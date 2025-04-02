class StatusCode {
    static OK = 200; //Login successful, user details fetched.
    static Created = 201; //User registered successfully.
    static NoContent = 204; //Logout successful.
    static BadRequest = 400; //Missing or incorrect authentication format.
    static UnAuthorized = 401; //Invalid or missing credentials (wrong password, invalid token, etc.).
    static Forbidden = 403; //User is authenticated but lacks permission.	
    static NotFound = 404; //The requested user or resource does not exist.
    static AuthenticationTimeout = 419; //Login session has expired (used in some frameworks).
    static InternalServerError = 500; //Something went wrong on the backend (e.g., database error).
}

class StatusMessage {
    static OK = "Request successful";
    static Created = "New resource created";
    static NoContent = "Request successful, no response body";
    static BadRequest = "Invalid request";
    static UnAuthorized = "Authentication failed";
    static Forbidden = "Access denied";
    static NotFound = "Resource not found";
    static AuthenticationTimeout = "Session expired";
    static InternalServerError = "Failed to connect server";
}

module.exports = { StatusCode, StatusMessage };