# API Endpoints

---

## /users/register Endpoint

### Description
This endpoint registers a new user in the backend system.  
Upon successful registration, the response includes the created user's details (excluding the password) and an authentication token.

### HTTP Request
**Method:** POST  
**Endpoint:** /users/register

### Required Data
- **fullnName** (object)
  - **firstname**: string (required, minimum 3 characters)
  - **lastname**: string (optional, if provided, minimum 3 characters)
- **email**: string (required, valid email format)
- **password**: string (required, minimum 5 characters)

### Response Status Codes
- **201 Created**:  
  - User registration is successful.  
  - Response includes a confirmation message, submitted data (without password), created user details (_id, firstname, lastname, email) and an auth token.
  
- **400 Bad Request**:  
  - Validation errors are encountered (e.g., missing or invalid fields).
  
- **500 Internal Server Error**:  
  - User creation or token generation fails, or another server-related error occurs.

### Example Response
```json
{
  "message": "User created successfully!",
  "submittedData": {
    "fullnName": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  },
  "createdUser": {
    "_id": "609c8b8f2f8fb814b56fa181",
    "firstname": "John",
    "lastname": "Doe",
    "email": "john.doe@example.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR..."
}
```

---

## /users/login Endpoint

### Description
This endpoint logs in an existing user.  
Upon successful login, the response returns the user's details (excluding the password) along with an authentication token.

### HTTP Request
**Method:** POST  
**Endpoint:** /users/login

### Required Data
- **email**: string (required, valid email format)
- **password**: string (required, minimum 5 characters)

### Response Status Codes
- **200 OK**:  
  - Login is successful.  
  - Response includes a confirmation message, submitted data (without password), created user details (_id, firstname, lastname, email) and an auth token.
  
- **400 Bad Request**:  
  - Validation errors are encountered.
  
- **401 Unauthorized**:  
  - The email does not exist or the password is incorrect.
  
- **500 Internal Server Error**:  
  - Token generation fails or another server-related error occurs.

### Example Response
```json
{
  "message": "User logged in successfully!",
  "submittedData": { "email": "john.doe@example.com" },
  "createdUser": {
    "_id": "609c8b8f2f8fb814b56fa181",
    "firstname": "John",
    "lastname": "Doe",
    "email": "john.doe@example.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR..."
}
```

---

## /users/profile Endpoint

### Description
This endpoint returns the profile of the authenticated user, excluding the password.

### HTTP Request
**Method:** GET  
**Endpoint:** /users/profile  
**Authentication:** Required (token must be provided in the request headers or cookies)

### Response Status Codes
- **200 OK**:  
  - The request is successful, and the user profile data is returned.
  
- **404 Not Found**:  
  - No user was found with the provided identifier.
  
- **500 Internal Server Error**:  
  - There is an error retrieving the user profile.

### Example Response
```json
{
  "user": {
    "_id": "609c8b8f2f8fb814b56fa181",
    "fullnName": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "socketId": "optionalSocketId"
  }
}
```

---

## /users/logout Endpoint

### Description
This endpoint logs out the user by clearing the authentication cookie and blacklisting the current token.

### HTTP Request
**Method:** GET  
**Endpoint:** /users/logout  
**Authentication:** Required (token must be provided in the request headers or cookies)

### Response Status Codes
- **200 OK**:  
  - Logout is successful.  
  - Response includes a confirmation message.
  
- **500 Internal Server Error**:  
  - An error occurs while processing the logout (e.g., failing to blacklist the token).

### Example Response
```json
{
  "message": "User logged out successfully"
}
```

*Note:* In the users routes file, the `/logout` route is defined after the `module.exports = router;` statement, which means it is never exported. Move it above the export to ensure proper functionality.

---

## /captains/register Endpoint

### Description
This endpoint registers a new captain in the backend system.  
Upon successful registration, the response includes the created captain's details (excluding the password) and an authentication token.

### HTTP Request
**Method:** POST  
**Endpoint:** /captains/register

### Required Data
- **fullnName** (object)
  - **firstname**: string (required, minimum 3 characters)
  - **lastname**: string (required, minimum 3 characters)
- **email**: string (required, valid email format)
- **password**: string (required, minimum 5 characters)
- **vehicle** (object):
  - **color**: string (required, minimum 3 characters)
  - **plate**: string (required, minimum 3 characters)
  - **capacity**: number (required, at least 1)
  - **vehicleType**: string (required, one of: "car", "auto", "motorcycle")

### Response Status Codes
- **201 Created**:  
  - Captain registration is successful.  
  - Response includes the captain details and an authentication token.
  
- **400 Bad Request**:  
  - Validation errors are encountered (e.g., missing or invalid fields).
  
- **500 Internal Server Error**:  
  - Captain creation or token generation fails, or another server-related error occurs.

### Example Response
```json
{
  "captain": {
    "_id": "60a7b8f2f8fb814b56fa181",
    "fullnName": {
      "firstname": "Jane",
      "lastname": "Doe"
    },
    "email": "jane.doe@example.com",
    "vehicle": {
      "color": "Red",
      "plate": "XYZ123",
      "capacity": 4,
      "vehicleType": "car"
    }
  },
  "capitanToken": "eyJhbGciOiJIUzI1NiIsInR..."
}
```

*Note:* There is an error in the captain routes file: the validator is checking for `vehicle.model` even though the captain model does not include a "model" property. You should remove or update this validator.

---

## Caption/Register Route (Typo Notice)

If you meant to add/update the **/captains/register** route, the documentation above applies. Ensure your routes file correctly defines the endpoint and that validators match your model fields.
