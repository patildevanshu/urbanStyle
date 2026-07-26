# 🎯 UrbanStyle — Interview Preparation Guide

> **Project**: UrbanStyle — A Full-Stack E-Commerce Web Application  
> **Stack**: React + Vite + Redux Toolkit | Node.js + Express | MongoDB + Mongoose | Cloudinary | PayPal SDK | JWT Auth  

---

## 📌 Table of Contents

1. [Project Introduction Questions](#1-project-introduction-questions)
2. [Why This Project?](#2-why-this-project)
3. [System Design & Architecture](#3-system-design--architecture)
4. [React & Frontend Questions](#4-react--frontend-questions)
5. [Redux Toolkit Questions](#5-redux-toolkit-questions)
6. [React Router Questions](#6-react-router-questions)
7. [Node.js & Express Questions](#7-nodejs--express-questions)
8. [MongoDB & Mongoose Questions](#8-mongodb--mongoose-questions)
9. [Authentication & Security](#9-authentication--security)
10. [Cloudinary & File Upload](#10-cloudinary--file-upload)
11. [Payment Integration (PayPal)](#11-payment-integration-paypal)
12. [REST API Design](#12-rest-api-design)
13. [JavaScript Core Concepts](#13-javascript-core-concepts)
14. [CSS & TailwindCSS Questions](#14-css--tailwindcss-questions)
15. [Performance & Optimization](#15-performance--optimization)
16. [Version Control (Git)](#16-version-control-git)
17. [HR & Behavioral Questions](#17-hr--behavioral-questions)

---

## 1. Project Introduction Questions

> These are the most common opening questions — be ready with a clear, confident answer.

### Q1. Tell me about your project.

**How to Answer:**
> "UrbanStyle is a full-stack e-commerce web application that allows users to browse products, manage carts, place orders with PayPal payment integration, and write product reviews. It has two roles — **User** (shopper) and **Admin** (manage products, orders, banner images). Built using **React + Vite** on the frontend with **Redux Toolkit** for state management, and **Node.js + Express + MongoDB** on the backend. Authentication is handled using **JWT tokens with HTTP-only cookies**, and product images are stored on **Cloudinary**."

---

### Q2. What are the main features of your project?

- 🔐 User registration & login with role-based access (user/admin)
- 🛍️ Product listing with search, filter, and sort
- 🛒 Cart management (add, update, delete items)
- 📦 Order placement and tracking
- 💳 PayPal payment integration
- ⭐ Product reviews and ratings
- 🖼️ Image upload via Cloudinary
- 🏠 Multiple saved addresses per user
- 👨‍💼 Admin dashboard — manage products, orders, banner images

---

### Q3. What was your role in the project?

- Designed and implemented the full-stack architecture
- Built all REST API endpoints using Express.js
- Designed MongoDB schemas (User, Product, Cart, Order, Review, Address, Feature)
- Implemented JWT-based authentication with HTTP-only cookies
- Set up Redux Toolkit slices for all features (auth, products, cart, order, search, review, address)
- Integrated Cloudinary for image uploads
- Integrated PayPal REST SDK for payment processing
- Built the entire frontend with React, React Router, and Radix UI components

---

### Q4. What challenges did you face and how did you solve them?

- **CORS issues**: Configured Express CORS middleware with `credentials: true` and allowed origins
- **JWT in HTTP-only cookies**: Used `cookie-parser` and set `credentials: true` on both CORS and Axios
- **Role-based route protection**: Built middleware to verify JWT and check user role before accessing admin routes
- **State sync between cart and orders**: Managed via Redux slices with proper async thunks
- **Image upload before product creation**: Used Multer + Cloudinary upload helper to get the image URL first, then saved with product data

---

### Q5. What would you improve or add if you had more time?

- Add real-time order tracking notifications (WebSockets)
- Add product wishlist feature
- Improve search with fuzzy matching or Elasticsearch
- Write unit and integration tests (Jest, React Testing Library)
- Implement refresh token mechanism for better session management
- Add Google/GitHub OAuth login

---

## 2. Why This Project?

### Q6. Why did you choose to build an e-commerce application?

> "E-commerce applications cover a wide range of real-world engineering challenges — authentication, authorization, file uploads, payment gateways, state management at scale, and REST API design. It gave me hands-on experience with all the major pillars of full-stack development."

---

### Q7. Why did you choose the MERN stack?

> "The MERN stack (MongoDB, Express, React, Node.js) uses JavaScript end-to-end, which reduces context switching. React's component model makes UI development fast and maintainable. MongoDB's flexible schema is great for evolving data models like product catalogs. Node.js is non-blocking and well-suited for I/O-heavy applications like e-commerce APIs."

---

### Q8. Why Redux Toolkit over Context API or Zustand?

> "Redux Toolkit is the modern, opinionated way to use Redux. It has built-in support for async operations via `createAsyncThunk`, clean slice-based architecture, and DevTools support for debugging state. For an app with many features (cart, orders, auth, products, search), Redux provides predictable and scalable state management compared to Context API, which can cause unnecessary re-renders."

---

### Q9. Why MongoDB over a relational database like MySQL/PostgreSQL?

> "Product data in e-commerce is often hierarchical and varies across categories. MongoDB's document model handles this naturally. Embedded documents (like order items inside an Order) reduce the need for complex JOINs. That said, relational databases are better when strong consistency and complex relationships are required."

---

## 3. System Design & Architecture

### Q10. Explain the architecture of your application.

```
Client (React + Vite)
    ↕  HTTP Requests (Axios)
Server (Express.js)
    ↕  Mongoose ODM
MongoDB Atlas (Database)
    +
Cloudinary (Image Storage)
PayPal (Payment Gateway)
```

- **Frontend**: React handles UI; Redux manages global state; React Router handles navigation
- **Backend**: Express server with route → controller pattern; Mongoose for DB operations
- **Auth**: JWT stored in HTTP-only cookies; middleware validates on protected routes

---

### Q11. How is your folder structure organized?

**Backend:**
```
server/
├── controllers/   → Business logic (auth, products, orders, cart, review)
├── models/        → Mongoose schemas (User, Product, Cart, Order, Address, Review, Feature)
├── routes/        → Express routers (admin, shop, auth, common)
├── helpers/       → Utility functions (Cloudinary upload helper)
└── server.js      → Entry point — DB connection, middleware, route mounting
```

**Frontend:**
```
client/src/
├── components/    → Reusable UI components
├── pages/         → Route-level pages (admin-view, shopping-view, auth, not-found)
├── store/         → Redux slices (auth, admin, shop features)
├── config/        → Axios config, constants
└── App.jsx        → Routes definition
```

---

### Q12. How do you handle role-based access control (RBAC)?

- The `User` model has a `role` field (default: `"user"`, or `"admin"`)
- On the backend, a middleware extracts the JWT from the cookie, verifies it, and checks `req.user.role`
- Admin routes return `403 Forbidden` if the role is not `admin`
- On the frontend, React Router guards redirect non-admin users away from admin pages

---

## 4. React & Frontend Questions

### Q13. What is the difference between functional components and class components?

- **Functional components**: Simple JavaScript functions; use hooks (`useState`, `useEffect`) for state and side effects. This is the modern, recommended approach.
- **Class components**: Use `this.state` and lifecycle methods (`componentDidMount`, etc.). More verbose and largely replaced by hooks.

---

### Q14. Explain the React component lifecycle (with hooks).

| Lifecycle Phase | Hook Equivalent |
|---|---|
| Mounting | `useEffect(() => {}, [])` — runs once after first render |
| Updating | `useEffect(() => {}, [dep])` — runs when `dep` changes |
| Unmounting | `useEffect(() => { return () => cleanup() }, [])` |

---

### Q15. What are React hooks? Which ones have you used?

- `useState` — local component state
- `useEffect` — side effects (API calls, subscriptions)
- `useSelector` — read Redux state
- `useDispatch` — dispatch Redux actions
- `useNavigate` — programmatic navigation (React Router v6)
- `useParams` — access URL parameters

---

### Q16. What is prop drilling and how did you avoid it?

> "Prop drilling is passing data through many nested components. In UrbanStyle, I avoided it by using **Redux Toolkit** for global state — any component can directly access cart items, user info, or product data from the store using `useSelector`."

---

### Q17. What is the Virtual DOM and how does React use it?

> "React maintains a lightweight copy of the real DOM called the Virtual DOM. When state changes, React creates a new virtual DOM tree, diffs it with the previous one (reconciliation), and only updates the changed parts in the real DOM. This makes UI updates fast and efficient."

---

### Q18. What is `useMemo` and `useCallback`? When would you use them?

- **`useMemo`**: Memoizes a computed value — use when a calculation is expensive and shouldn't re-run on every render.
- **`useCallback`**: Memoizes a function reference — use when passing callbacks to child components to prevent unnecessary re-renders.

---

### Q19. What are Radix UI components? Why did you use them?

> "Radix UI provides accessible, unstyled (headless) primitive components like Dialog, Select, Tabs, Checkbox, etc. I used them because they handle accessibility (ARIA), keyboard navigation, and focus management out of the box, while giving me full control over styling via TailwindCSS."

---

### Q20. What is lazy loading in React?

> "Lazy loading defers loading components until they are needed, reducing the initial bundle size. In React, this is done with `React.lazy()` and `Suspense`. For example, I can lazy-load the Admin Dashboard so it's only downloaded when an admin navigates to it."

---

## 5. Redux Toolkit Questions

### Q21. What is Redux Toolkit and why is it better than plain Redux?

> "Redux Toolkit (RTK) is the official, recommended way to write Redux. It reduces boilerplate significantly — `createSlice` auto-generates action creators and reducers, `createAsyncThunk` handles async operations with `pending/fulfilled/rejected` states, and it includes Immer for immutable state updates written in a mutable style."

---

### Q22. Explain `createSlice` and `createAsyncThunk`.

- **`createSlice`**: Defines a slice of state with reducers and auto-generated actions.
- **`createAsyncThunk`**: Creates a thunk for async operations (e.g., API calls). Dispatches `pending`, `fulfilled`, or `rejected` actions automatically.

```javascript
export const fetchProducts = createAsyncThunk("products/fetch", async () => {
  const res = await axios.get("/api/shop/products");
  return res.data;
});
```

---

### Q23. What is the Redux data flow?

```
User Action
  → dispatch(action)
  → Reducer updates State
  → Component re-renders via useSelector
```

For async: `dispatch(thunk)` → API call → `fulfilled` action → Reducer

---

### Q24. How do you handle loading and error states in Redux?

In each slice's `extraReducers`, I handle:
- `pending` → set `isLoading: true`
- `fulfilled` → set data and `isLoading: false`
- `rejected` → set error message and `isLoading: false`

---

## 6. React Router Questions

### Q25. What is React Router v6? What changed from v5?

- `Switch` replaced by `Routes`
- `component={}` replaced by `element={<Component />}`
- Nested routes use `<Outlet />`
- `useHistory` replaced by `useNavigate`
- `useRouteMatch` replaced by `useMatch`

---

### Q26. How did you implement protected routes?

```jsx
const { isAuthenticated, user } = useSelector(state => state.auth);
if (!isAuthenticated) return <Navigate to="/auth/login" />;
if (user.role !== "admin") return <Navigate to="/unauth-page" />;
return <Outlet />;
```

---

## 7. Node.js & Express Questions

### Q27. What is Node.js? Why is it used for the backend?

> "Node.js is a JavaScript runtime built on Chrome's V8 engine. It uses an event-driven, non-blocking I/O model, making it efficient for handling many concurrent connections — ideal for API servers. It also allows using the same language (JavaScript) on both frontend and backend."

---

### Q28. What is middleware in Express? Give examples from your project.

> "Middleware is a function that has access to `req`, `res`, and `next`. It processes requests before they reach the route handler."

In UrbanStyle:
- `cors()` — handles cross-origin requests
- `cookieParser()` — parses cookies from requests
- `express.json()` — parses JSON request bodies
- Custom auth middleware — verifies JWT and attaches user to `req.user`

---

### Q29. What is the difference between `PUT` and `PATCH`?

| Method | Description |
|---|---|
| `PUT` | Replace the entire resource |
| `PATCH` | Partially update a resource |

In UrbanStyle, `PUT` is used to update a full product (all fields), while `PATCH` could be used to update just the order status.

---

### Q30. What is CORS and why did you need to configure it?

> "CORS (Cross-Origin Resource Sharing) is a browser security mechanism that blocks requests from a different origin. Since the React frontend (e.g., `localhost:5173`) calls the Express backend (`localhost:5000`), I configured CORS middleware with the allowed origin, methods, and `credentials: true` to allow cookies to be sent."

---

### Q31. What is `dotenv` and why is it used?

> "`dotenv` loads environment variables from a `.env` file into `process.env`. It keeps sensitive data (DB connection string, JWT secret, API keys) out of source code. In production, these are set as environment variables on the hosting platform."

---

## 8. MongoDB & Mongoose Questions

### Q32. What is MongoDB? How is it different from SQL databases?

| Feature | MongoDB | SQL |
|---|---|---|
| Data format | JSON-like documents (BSON) | Tables with rows |
| Schema | Flexible / dynamic | Rigid / fixed |
| Relationships | Embedded docs or references | JOINs |
| Scalability | Horizontal (sharding) | Vertical |

---

### Q33. What is Mongoose? Why use it over the native MongoDB driver?

> "Mongoose is an ODM (Object Document Mapper) for MongoDB. It provides schema validation, type casting, middleware hooks, and model-based querying — making it much easier to work with MongoDB in a structured way compared to the native driver."

---

### Q34. Explain the Mongoose schemas you designed.

| Model | Key Fields |
|---|---|
| `User` | userName, email, password (hashed), role |
| `Product` | title, description, category, price, salePrice, totalStock, imageUrl |
| `Cart` | userId, items: [{ productId, quantity }] |
| `Order` | userId, cartItems, addressInfo, orderStatus, paymentMethod, paymentStatus, totalAmount |
| `Address` | userId, address, city, pincode, phone, notes |
| `Review` | productId, userId, userName, reviewMessage, reviewValue |
| `Feature` | image (banner images for homepage) |

---

### Q35. What is the difference between embedding and referencing in MongoDB?

- **Embedding**: Store related data inside the same document (e.g., order items inside an Order). Good for data always read together.
- **Referencing**: Store `ObjectId` references to other collections (e.g., Cart stores `userId` referencing User). Good for data that changes independently.

---

### Q36. What are Mongoose indexes? Did you use any?

> "Indexes speed up queries. In my User model, `email` and `userName` are marked `unique: true`, which creates a unique index in MongoDB, preventing duplicate accounts and speeding up lookups by those fields."

---

## 9. Authentication & Security

### Q37. How does JWT authentication work in your project?

1. User submits login credentials
2. Server validates, creates a JWT signed with a secret key containing `{ id, role }`
3. JWT is sent to the client as an **HTTP-only cookie**
4. On subsequent requests, the browser auto-sends the cookie
5. Auth middleware extracts the token from `req.cookies`, verifies it, and attaches user info to `req.user`

---

### Q38. Why HTTP-only cookies instead of localStorage for JWT?

> "HTTP-only cookies cannot be accessed by JavaScript, making them immune to **XSS (Cross-Site Scripting)** attacks. `localStorage` is accessible via JS, so if there's an XSS vulnerability, a malicious script could steal the token. HTTP-only cookies are more secure for storing authentication tokens."

---

### Q39. What is bcryptjs and how does it work?

> "bcryptjs is used to hash passwords before storing them in the database. It adds a **salt** (random data) to the password before hashing, making precomputed attacks (rainbow tables) ineffective. When a user logs in, `bcrypt.compare(inputPassword, hashedPassword)` is used — bcrypt handles the salt extraction internally."

---

### Q40. What is the difference between authentication and authorization?

| Concept | Description |
|---|---|
| **Authentication** | Verifying *who you are* (login with email + password) |
| **Authorization** | Verifying *what you can do* (admin can delete products, user cannot) |

In UrbanStyle: JWT auth middleware = Authentication. Role-check middleware = Authorization.

---

### Q41. What are common web security vulnerabilities?

- **XSS** (Cross-Site Scripting) — inject malicious scripts; mitigated by HTTP-only cookies and input sanitization
- **CSRF** (Cross-Site Request Forgery) — forged requests; mitigated by `SameSite` cookie attribute
- **NoSQL Injection** — malicious queries; Mongoose sanitizes inputs
- **Brute Force** — repeated login attempts; can add rate limiting (e.g., `express-rate-limit`)

---

## 10. Cloudinary & File Upload

### Q42. How does image upload work in your project?

1. Client sends a `multipart/form-data` request with the image file
2. **Multer** middleware parses the file from the request
3. A helper function uploads the file buffer to **Cloudinary**
4. Cloudinary returns a public URL
5. The URL is saved in the Product document in MongoDB

---

### Q43. Why Cloudinary over storing images in the server filesystem?

> "Storing images on the server filesystem doesn't scale — if you have multiple server instances, the files won't be shared. Cloudinary is a cloud-based media storage service that provides CDN delivery, automatic image optimization, and transformations. It's much better suited for production applications."

---

### Q44. What is Multer?

> "Multer is an Express middleware for handling `multipart/form-data`, which is used for file uploads. It parses the incoming file from the request and makes it available as `req.file`. In my project, I configured it to store files in memory (as a buffer) before uploading to Cloudinary."

---

## 11. Payment Integration (PayPal)

### Q45. How does PayPal payment work in your project?

1. User clicks "Pay with PayPal"
2. Server creates a PayPal payment order via the PayPal REST SDK using order details
3. Client is redirected to the PayPal payment page
4. After payment, PayPal redirects back with an approval token
5. Server captures/executes the payment using the approval token
6. Order status is updated to "confirmed" in MongoDB

---

### Q46. What is the difference between client-side and server-side payment processing?

> "Payment processing must happen **server-side** for security — you never expose your API secret keys to the client. The client initiates the flow, but the actual payment creation, verification, and capture all happen on the server where keys are securely stored in environment variables."

---

## 12. REST API Design

### Q47. What are RESTful API principles?

- **Stateless**: Each request contains all needed information
- **Resource-based URLs**: `/api/shop/products` not `/getProducts`
- **HTTP methods**: GET (read), POST (create), PUT/PATCH (update), DELETE (remove)
- **Status codes**: 200 OK, 201 Created, 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 500 Server Error

---

### Q48. Walk me through one of your API endpoints.

**Example — Add to Cart** (`POST /api/shop/cart/add`):
1. Auth middleware verifies JWT, attaches `req.user`
2. Controller extracts `userId`, `productId`, `quantity` from `req.body`
3. Checks if product exists and has enough stock
4. Finds or creates the Cart document for the user
5. If product already in cart, increments quantity; else pushes new item
6. Saves the cart and returns updated cart data

---

### Q49. How do you handle errors in your Express API?

- Try-catch blocks in each controller
- Return appropriate HTTP status codes with descriptive messages
- Optionally, a global error-handling middleware as the last `app.use()`

---

## 13. JavaScript Core Concepts

### Q50. What is the difference between `var`, `let`, and `const`?

|  | `var` | `let` | `const` |
|---|---|---|---|
| Scope | Function | Block | Block |
| Hoisting | Yes (undefined) | Yes (TDZ) | Yes (TDZ) |
| Reassignment | Yes | Yes | No |

---

### Q51. What is a Promise? What is async/await?

> "A Promise is an object representing an eventual value from an async operation. `async/await` is syntactic sugar over Promises that makes async code look synchronous and easier to read. All my API controllers use `async/await` with try-catch for clean error handling."

---

### Q52. What is the event loop in JavaScript?

> "JavaScript is single-threaded. The event loop allows async operations (timers, I/O, network calls) to be handled without blocking the main thread. When an async operation completes, its callback is pushed to the task queue and the event loop picks it up when the call stack is empty."

---

### Q53. What is the difference between `==` and `===`?

- `==` — loose equality, performs type coercion (`"5" == 5` is `true`)
- `===` — strict equality, no coercion (`"5" === 5` is `false`)

> Always use `===` to avoid unexpected bugs.

---

### Q54. What are closures?

> "A closure is a function that remembers the variables from its outer scope even after the outer function has returned. Example: a counter function that increments an inner variable — the inner variable is captured in the closure."

---

### Q55. What is the spread operator and destructuring?

```javascript
// Spread
const newCart = [...cart, newItem];
const updatedProduct = { ...product, price: 499 };

// Destructuring
const { userName, email } = req.body;
const [firstProduct, ...rest] = products;
```

---

## 14. CSS & TailwindCSS Questions

### Q56. What is TailwindCSS? Why did you use it?

> "Tailwind is a utility-first CSS framework where you compose styles using small, single-purpose classes directly in HTML/JSX. It speeds up development, enforces consistency, and generates minimal CSS by purging unused styles in production."

---

### Q57. What is the difference between Flexbox and Grid?

|  | Flexbox | Grid |
|---|---|---|
| Dimension | 1D (row or column) | 2D (rows and columns) |
| Use case | Align items in a line | Complex page layouts |

---

### Q58. What is responsive design? How do you achieve it in Tailwind?

> "Responsive design makes the UI adapt to different screen sizes. In Tailwind, I use responsive prefixes: `sm:`, `md:`, `lg:`, `xl:` — for example, `grid-cols-1 md:grid-cols-3` shows 1 column on mobile and 3 on desktop."

---

## 15. Performance & Optimization

### Q59. How can you optimize a React application?

- Use `React.memo` to prevent unnecessary re-renders
- Use `useMemo` and `useCallback` for expensive computations and stable callbacks
- Code splitting with `React.lazy` and `Suspense`
- Virtualize long lists (e.g., `react-window`)
- Optimize images and use CDN (Cloudinary handles this)
- Avoid large bundle sizes — tree shaking with Vite

---

### Q60. What is debouncing? Where would you use it in UrbanStyle?

> "Debouncing delays a function call until after a specified time has passed since the last invocation. In UrbanStyle, the **search bar** should use debouncing — instead of making an API call on every keystroke, wait until the user pauses typing (e.g., 300ms) to reduce unnecessary API requests."

---

## 16. Version Control (Git)

### Q61. What Git commands do you use regularly?

```bash
git init / git clone          # Initialize or clone
git add . / git commit -m ""  # Stage and commit
git push / git pull           # Sync with remote
git branch / git checkout     # Branch management
git merge / git rebase        # Integrate changes
git status / git log          # Check state and history
```

---

### Q62. What is the difference between `merge` and `rebase`?

- **Merge**: Creates a merge commit, preserving full history
- **Rebase**: Rewrites commits onto the tip of the target branch, creating a linear history

---

## 17. HR & Behavioral Questions

### Q63. Tell me about yourself.

> Structure: Present → Past → Future
> "I'm a full-stack developer with experience building real-world applications using the MERN stack. I recently built UrbanStyle, a complete e-commerce platform. I'm passionate about creating clean, scalable applications and am looking to grow in a team where I can contribute and learn."

---

### Q64. Why should we hire you?

> - You have hands-on, full-stack experience (not just tutorials)
> - You understand both frontend (React, Redux, UI/UX) and backend (Express, MongoDB, Auth, Payments)
> - You have solved real-world problems (image uploads, payment flows, CORS, role-based access)
> - You are eager to learn and improve

---

### Q65. Where do you see yourself in 5 years?

> "I see myself as a senior full-stack engineer or a specialist in scalable backend systems. I want to contribute to impactful products and keep evolving with the latest technologies in web development."

---

### Q66. Describe a time you faced a problem and how you solved it.

**Example**: "During the PayPal integration, the redirect URI was not matching in development. I debugged the issue by checking the PayPal developer dashboard and realized the return URLs must exactly match. I fixed it by aligning the URLs in both the PayPal app config and environment variables, and added clear logging to trace the payment flow."

---

### Q67. What are your strengths and weaknesses?

**Strengths**: Problem-solving, full-stack understanding, quick learner

**Weakness (with recovery)**: "I sometimes spend too much time perfecting code — I'm working on balancing between delivering and refining by setting timeboxed goals."

---

### Q68. Do you have any questions for us?

**Always ask at least one question — it shows curiosity:**
- "What does the tech stack look like on your team?"
- "What does the onboarding process look like for new developers?"
- "What are the biggest technical challenges the team is currently facing?"
- "How is code review done here?"

---

## 🚀 Quick Revision Cheat Sheet

| Topic | Key Points |
|---|---|
| React | Hooks, Virtual DOM, Component Lifecycle, Props vs State |
| Redux Toolkit | createSlice, createAsyncThunk, useSelector, useDispatch |
| Express | Middleware, REST methods, CORS, Error handling |
| MongoDB | Documents vs Tables, Embedding vs Referencing, Mongoose ODM |
| JWT Auth | Stateless, HTTP-only cookie, bcrypt hashing, Role-based access |
| Cloudinary | Image CDN, Multer for file parsing, cloud storage |
| PayPal | Server-side payment flow, approval token, capture |
| JS Concepts | Async/Await, Closures, Event Loop, Spread, Destructuring |
| CSS/Tailwind | Utility-first, Responsive prefixes, Flexbox vs Grid |
| Git | Branching, Merge vs Rebase, Commit hygiene |

---

*Good luck with your interviews! Remember: confidence + clarity + real examples = success 🎯*

