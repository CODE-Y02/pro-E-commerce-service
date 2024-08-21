# pro-ecomm-graphql

This is NOT JUST PROJECT but an Professional and Scalable backend, At least a TRY to do so ..

Feel Free To RAISE a Issue or raise PR .

> FEATURES

- This project is now straight forward
- Core functionality

  - admin ui to add / edit products and manage orders and users
  - graphql backend - such backend is highly optimized for applications like e-commerce or social media.
  - security first - robust auth for apis ( I have detailed docs on it).
  - Hybrid application for user (Android + IOS)
    - track self orders
    - view and order product
    - payments
    - products search and filters
  - For app i will be using expo go and will try to support web as well.

  ***

---

## BACKEND Stack

- Node JS
- Express
- Graphql + REST - REST will be need for webhook and payment stuff.
- MongoDB & Mongoose
- (upcoming) Docker & Redis - This I will add at end of project.
- (upcoming) some best practices like structured response, centralized error handling, etc.
- Why Not TS: not any reason just forgot to do so at start.
- I may probably never host it with redis and bunch of stuff as it cost $$ to host such a server.

## WEB Client : support ui - admin controls

- Next JS.
- Tailwind CSS & ShadCn Ui.
- TypeScript.

## NATIVE Client: Main E-commerce Client ( Upcoming)

- Expo - No alternative of this its best if we want cross platform app based on react

---

- UPDATED - 21/08/24 ( midnight coding )
- STATUS:
  - BACKEND: Restructured bunch of stuff refactored
  - SUPPORT UI : created product lists, product details page
  - As we are using Next js we can cache apis, also graphql (apollo ) has in-build support for caching we will not need redis.
