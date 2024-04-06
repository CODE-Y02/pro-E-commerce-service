**I have noticed I have over complicted stuff ...
I am building it for referene not a plain to make a Product Out of it so why I have to make it sooo complex..**

Going Forwared everything will be simple .
**Aim is to demostrate core functionality of Ecomm NOT to MAKE a ECOMM itself** ...

> I am having some core features here only that any ecomm out there required.

- CRUD operations on some data .
- Payments intregations.
- Tracking of Orders.
- Reviews & rating.
- Support Tickets . ( This is for later on).

> NOTES

- In actual Production application we never delete a publish data but hide them by using flags.
- This is cause in tech data is money also can be used for many things ex: Auditing, Training LLM, Market research, etc.

---

### DATA MODELS

#### 1. User

    username
    email
    mobile
    fullName
    password
    role
    refreshToken
    cart: [{ product, qty}]
    orders: ref
    reviews: ref
    reviews : [review : ref]

#### 2. Category

    name
    description

#### 3. Products

    Name
    description
    category : ref
    variants: [{color , price , size, stock}]
    published
    reviews : [review : ref]

#### 4. Review

    user : ref
    product : ref
    rating
    comment
    published

#### 5. Order

    user
    products:  [ { prodId , qty, price}]
    totalPrice
    status
    deliveryInfo :{ status , trackingUrl , shippingAddress}

#### 6. Payments

    order : ref
    status
    refundRequired
    refundStatus
    amount
    source
