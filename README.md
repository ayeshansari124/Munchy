# 🍕 MunchY – Full-Stack Food Ordering Platform

A modern full-stack food ordering application to **browse menus, customize food items, manage carts, and place orders seamlessly**, with admin management, secure authentication, and a clean, responsive UI.  
Built using **Next.js, React, MongoDB, and Razorpay**, with a strong focus on **real-world architecture, reusability, and production-ready patterns**.

---

## 🚀 Features

### 🍽️ Food Ordering System
- Browse food items by category
- View detailed food cards with images & descriptions
- Customize items with:
  - Multiple sizes
  - Extra ingredients
- Add items to cart **without login**
- Dynamic price calculation

---

### 🛒 Cart & Checkout
- Persistent cart using **React Context**
- Cart accessible even for guest users
- Quantity, size & extras tracking
- Checkout form with address inputs
- **Auto-fill checkout address from user profile**
- Login required **only at payment time**
- Secure online payment using **Razorpay**

---

### 👤 User Authentication & Profile
- Register / Login / Logout
- Secure authentication using **HTTP-only cookies**
- Persistent sessions
- User profile management:
  - Name
  - Phone
  - Delivery address
- Profile updates instantly reflected in checkout

---

### 🛠️ Admin Panel
- Admin-only access
- Category management (create / update / delete)
- Menu item management:
  - Image upload
  - Base price
  - Sizes
  - Extra ingredients
- Order management:
  - View all orders
  - Mark orders as completed
- Clean capsule-style admin navigation

---

## 🌐 Frontend Architecture
- Built with **Next.js (App Router)**
- Modular structure:
  - `app/` – routes & layouts
  - `components/` – reusable UI components
  - `hooks/` – business logic & API interaction
  - `context/` – global cart state
  - `lib/` – centralized API utilities
- Fully responsive design (mobile, tablet, desktop)
- Styled using **Tailwind CSS**
- Custom animations & transitions
- Global font using **Nunito**

---

## 🧠 Backend Architecture
- REST API built with **Node.js + Express**
- **MongoDB + Mongoose** for data modeling
- Cookie-based authentication
- Role-based authorization (admin / user)
- Image uploads using **Multer**
- Razorpay order & payment verification
- Secure CORS configuration

---

## 🛠 Tech Stack

### Frontend
- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- React Context API
- Razorpay Checkout

### Backend
- Node.js
- Express
- MongoDB
- Mongoose
- Razorpay API
- Multer
- Cookie-based authentication

---

## 📚 Learnings
- Designing a **scalable full-stack architecture**
- Implementing **guest-to-authenticated checkout flows**
- Centralizing API calls for maintainability
- Managing complex UI state with Context + Hooks
- Handling real payment gateways securely
- Building admin dashboards with role protection
- Creating a fully responsive production-grade UI

---

### Built with ❤️ by Ayesha
