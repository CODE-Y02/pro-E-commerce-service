# Notes on Auth here

HI I have found that auth in our case is not so straignt forward, I will explain How its gonna work below.

---

## **Quick Pointers**

- We have 2 types of data we can send i.e. **public data example Products and private data example User info or orders**

- Also we want to limit ceratin operations **based on roles** like only user can add item to cart and only Admin can list and delete products.

- This is very straignt forward in rest api as we can have auth middleware on protected routes but in graphql we have to do this at resolver TO be more precise at query and mutaion level, **Simple terms its not easy**.

- Also One more thing every request we send to gragphql is POST, ya its really make no sense 😒.

- Below I will discuss What I am implementing & what is my **suggestion for production applications**.

---

## **Our Methodology**

- **API KEY AUTH**

  - This is base auth We will implement directly on express middleware for all request
  - Here We check for API_KEY, this we are doing cause we have multiple client's and we can track which client is requesting what.

- **REST based Authentication**.

  - We will have simple routes for login and logout
  - we will have route for refreshing token.
  - In this way we are simply sending structurd response and we can send tokens as well in response.

- **Controlled Authorization**

  - We will have one Function this is different from express middleware this will take req and will return back context .

        context: async ({ req, res }) => ({
            authScope: getScope(req.headers.authorization),
        }),

  - What shown in above code cant be used exactly cause this will impact all of resolvers , we only want auth for ceratin things.
  - We will have one function that will do jwt decode
    and return user . In this function we will

    - check token
    - if token then verify
    - if expired or no user found for decoded id send 401
    - if no token then its simple just return user as null .

  - In resolver we will check lets say createOrder mutation.

    - we will check if(!context.user) , yes then throw 401 error.
    - Same if lets say addProducts we will check user.role === 'Admin' , not then throw error.

---

## **Suggestions**

- I wont say that there is NO way of doing auth on graphql, We use **something called directive** [DOCS HERE](https://www.apollographql.com/docs/apollo-server/security/authentication/)

- In production level application its recommended to have different backend and DB for different purposes.
  Ya I am taking about microservice.

- For a public facing like Products we can have one microservice and This can be graphql.

- For a user based things like ordering we can have one service that can on REST sometime even sockets as it helps when we want cart to be in sync.

- This Overall Not only improves performance but also make sure If one service goes down other things wont havee much impact.

- Payments service needs to be IN REST as we need one webhook.

> IMP NOTES

- When ever you loing on gmail from different device you get mail with IP and details this is how we shold do auth in actual prod level app but still most of Orgs wont do this.
- Cookies and local storage is not full proof, Lets say I have refresh token And I know route to re grnereate new token .
  - **Hacker will just use vpns and secure network maybe masked one and will hit route gernrete token and do whatever the hack they want with that user account**.
  - THats why its very IMP to track user IP and see its last login ip & mac. Theres no way token can be same if both Ip and mac is different.

---

-- I have Bunch of TYPOS but you got the feeling Feel free to reach out to me For any discussion --
