This is a Next js E-commerce project called **Shop-seva**

## Getting Started

First, run the development server:
For linux,

```bash
git clone https://github.com/your-username/shop-seva.git
```

## Start The Project

```bash
# 1. Install required dependencies
npm install
```

#### Set Environment variables in your .env file

```bash
## Set Environment variables
# server url
NEXT_PUBLIC_SERVER_URL = http://localhost:3000   #change if required


# NEXT AUTH SECRET
JWT_SECRET = {generate a random strong secret key}

# Git hub
GITHUB_ID = {github app id}
GITHUB_SECRET = {github secret key}

# mailtrap
MAILTRAP_USER = {mailtrap_user}
MAILTRAP_PASS ={mailtrap_password}

#supabase
POSTGRES_URL= {postgres_url}
```

#### Start the development server

```bash
# 2. Start development server
npm run dev
```

## API Documentation

API Documentation is available [Here](https://documenter.getpostman.com/view/16587651/T)

### Public routes

1. Login Route **_POST_**
   Request Body: { email, password }
   > /api/auth/login

**Example**

```javascript
/* fetch function */
const handleLogin = async () => {
  try {
    // alway make a asynchronous request
    const { data } = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
      body: JSON.stringify({
        email: "your-email@gmail.com",
        password: "your-password",
      }),
    });
    // you will get data if everything is ok
    console.log(data);
  } catch (error) {
    // you will get Error if any error occurs
    // Bad Request (400) will occurs error like validation, etc
    // Bad Request (500) will occurs error Internal server error or database errors
    console.log(error);
  }
};

import axios from "axios";
/* Axios library */
const handleLoginWithAxios = async () => {
  try {
    const { data } = await axios.post(
      "http://localhost:3000/api/auth/login",
      {
        email: "your-email@gmail.com",
        password: "your-password",
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredential: true,
      }
    );
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};
```

Read more about [axios](https://www.npmjs.com/package/axios)

2. Sign-up Route

   > /api/auth/sign-up

3. Verify email Route

   > /api/auth/verify-email?token={token}

4. Sign-up Route
   > /api/auth/sign-up
