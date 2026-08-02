<div align="center">

<img src="frontend/public/favicon.svg" alt="LeaseStay logo" width="88" />

# LeaseStay

**A modern full-stack rental marketplace — discover, book, and manage rental properties with ease.**

[![Live Demo](https://img.shields.io/badge/demo-live-0d9488?style=for-the-badge)](https://leasestay.vercel.app)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-blue?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-green?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/license-MIT-black?style=for-the-badge)](#license)

[Live Demo](https://leasestay.vercel.app) · [Report a Bug](../../issues) · [Request a Feature](../../issues)

</div>

---

## Table of Contents

- [About](#about)
- [Screenshots](#screenshots)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running Locally](#running-locally)
- [Deployment](#deployment)
- [API Overview](#api-overview)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## About

**LeaseStay** is a production-grade rental property marketplace connecting **tenants** looking for a place to stay with **property owners** who want to list and manage their properties — with a dedicated **Admin Dashboard** for platform-wide oversight.

Tenants can search, filter, and book verified properties with secure online payments. Owners can list properties, manage bookings, and track revenue through a real-time dashboard. Admins verify property owners, moderate listings, and monitor platform-wide metrics.

The project is built with clean architecture, a fully centralized TypeScript type system shared across every feature module, and a premium, modern UI inspired by products like Vercel, Stripe, Linear, and Clerk.

**🔗 Live Demo:** [https://leasestay.vercel.app](https://leasestay.vercel.app)

> **Demo credentials** (optional — add if you provide seeded test accounts)
> | Role | Email | Password |
> |-------|-------|----------|
> | Tenant | `tenant@demo.com` | `Demo@123` |
> | Owner | `owner@demo.com` | `Demo@123` |
> | Admin | `admin@demo.com` | `Demo@123` |

---

## Screenshots

> Screenshots live in `frontend/public/screenshots/` — drop the files in using the names below and they'll render here automatically.

### Public

<table>
<tr>
    <td align="center" width="50%">
      <img src="frontend/public/screenshots/register.png" alt="Register page" width="100%" />
      <br /><sub><b>Register</b></sub>
    </td>
    <td align="center" width="50%">
      <img src="frontend/public/screenshots/login.png" alt="Login page" width="100%" />
      <br /><sub><b>Login</b></sub>
    </td>
  </tr>
  <tr>
    <td align="center" width="50%">
      <img src="frontend/public/screenshots/home.png" alt="Home page" width="100%" />
      <br /><sub><b>Home Page</b></sub>
    </td>
     <td align="center" width="50%">
      <img src="frontend/public/screenshots/property-details.png" alt="Property details page" width="100%" />
      <br /><sub><b>Property Details</b></sub>
    </td>
  </tr>
  <tr>
    <td align="center" width="50%">
      <img src="frontend/public/screenshots/properties.png" alt="Properties listing with filters" width="100%" />
      <br /><sub><b>Properties Listing</b></sub>
    </td>
  </tr>
</table>

### Tenant

<table>
  <tr>
    <td align="center" width="50%">
      <img src="frontend/public/screenshots/wishlist.png" alt="Wishlist page" width="100%" />
      <br /><sub><b>Wishlist</b></sub>
    </td>
    <td align="center" width="50%">
      <img src="frontend/public/screenshots/mybookings.png" alt="My bookings page" width="100%" />
      <br /><sub><b>My Bookings</b></sub>
    </td>
  </tr>
  <tr>
    <td align="center" width="50%">
      <img src="frontend/public/screenshots/profile.png" alt="Profile page" width="100%" />
      <br /><sub><b>Profile</b></sub>
    </td>
    <td align="center" width="50%">
      <img src="frontend/public/screenshots/become-owner.png" alt="Become an owner page" width="100%" />
      <br /><sub><b>Become an Owner</b></sub>
    </td>
  </tr>
</table>

### Owner

<table>
  <tr>
    <td align="center" width="50%">
      <img src="frontend/public/screenshots/owner-dashboard.png" alt="Owner dashboard" width="100%" />
      <br /><sub><b>Dashboard</b></sub>
    </td>
    <td align="center" width="50%">
      <img src="frontend/public/screenshots/create-property.png" alt="Owner create property page" width="100%" />
      <br /><sub><b>Create Property</b></sub>
    </td>
  </tr>
  <tr>
    <td align="center" width="50%">
      <img src="frontend/public/screenshots/my-properties.png" alt="Owner properties page" width="100%" />
      <br /><sub><b>My Properties</b></sub>
    </td>
    <td align="center" width="50%">
      <img src="frontend/public/screenshots/booking-request.png" alt="Owner booking requests page" width="100%" />
      <br /><sub><b>Booking Requests</b></sub>
    </td>
  </tr>
  <tr>
    <td align="center" width="50%">
      <img src="frontend/public/screenshots/my-payments.png" alt="Owner payments page" width="100%" />
      <br /><sub><b>Payments</b></sub>
    </td>
    <td></td>
  </tr>
</table>

### Admin

<table>
  <tr>
    <td align="center" width="50%">
      <img src="frontend/public/screenshots/admin-dashboard.png" alt="Admin dashboard" width="100%" />
      <br /><sub><b>Dashboard</b></sub>
    </td>
    <td align="center" width="50%">
      <img src="frontend/public/screenshots/admin-users.png" alt="Admin users page" width="100%" />
      <br /><sub><b>Users</b></sub>
    </td>
  </tr>
  <tr>
    <td align="center" width="50%">
      <img src="frontend/public/screenshots/admin-owners.png" alt="Admin owners page" width="100%" />
      <br /><sub><b>Owners</b></sub>
    </td>
    <td align="center" width="50%">
      <img src="frontend/public/screenshots/admin-properties.png" alt="Admin properties page" width="100%" />
      <br /><sub><b>Properties</b></sub>
    </td>
  </tr>
  <tr>
    <td align="center" width="50%">
      <img src="frontend/public/screenshots/admin-bookings.png" alt="Admin bookings page" width="100%" />
      <br /><sub><b>Bookings</b></sub>
    </td>
    <td align="center" width="50%">
      <img src="frontend/public/screenshots/admin-payments.png" alt="Admin payments page" width="100%" />
      <br /><sub><b>Payments</b></sub>
    </td>
  </tr>
</table>

---

## Features

### 🏠 Tenant

- Browse & search properties with filters (location, price, category, type, bedrooms, bathrooms)
- Detailed property pages with image gallery, amenities, and owner info
- Save properties to a wishlist
- Request bookings with move-in/move-out dates
- Track booking status in real time (pending → accepted → confirmed → completed)
- Secure online rent & deposit payments via Razorpay
- View payment history and receipts
- Google OAuth or email/password authentication

### 🏢 Property Owner

- Apply for owner verification with document upload (Aadhaar, PAN, Passport, Driving License)
- List properties with images, documents, pricing, and amenities
- Manage property availability and edit listings
- Review, accept, or reject booking requests
- Real-time dashboard — revenue, booking stats, property status breakdown
- Track payments received per property

### 🛡️ Admin

- Platform-wide dashboard — users, owners, properties, bookings, payments, revenue trends
- Approve or reject owner verification requests
- Approve, reject, or hide property listings
- Manage users (block/unblock) and view detailed profiles
- Monitor all bookings and payments across the platform
- Admin-only authentication, isolated from tenant/owner sessions

### ⚙️ Platform-wide

- Fully responsive, mobile-first UI with dark mode
- Centralized TypeScript type system — a single source of truth for every API contract across the frontend
- Skeleton loading states & meaningful empty states throughout
- Toast notifications for every action
- SEO-optimized (Open Graph, Twitter Cards, structured data, sitemap)

---

## Tech Stack

<table>
<tr>
<td valign="top" width="50%">

**Frontend**

| Technology            | Purpose                 |
| --------------------- | ----------------------- |
| React 19              | UI library              |
| TypeScript            | Type safety             |
| Vite                  | Build tool & dev server |
| React Router DOM      | Client-side routing     |
| Context API           | State management        |
| React Hook Form + Zod | Forms & validation      |
| Axios                 | HTTP client             |
| Tailwind CSS          | Styling                 |
| Recharts              | Dashboard charts        |
| Lucide React          | Icons                   |
| React Toastify        | Notifications           |

</td>
<td valign="top" width="50%">

**Backend**

| Technology         | Purpose                  |
| ------------------ | ------------------------ |
| Node.js + Express  | REST API server          |
| MongoDB + Mongoose | Database & ODM           |
| JWT + Cookie Auth  | Authentication           |
| Redis              | Caching                  |
| Cloudinary         | Image & document storage |
| Multer             | File upload handling     |
| Express Validator  | Request validation       |
| Razorpay           | Payment gateway          |

</td>
</tr>
</table>

**Deployment:** Frontend on [Vercel](https://vercel.com) · Backend on [Render](https://render.com)

---

## Architecture

The frontend follows a **feature/module-based architecture** with a centralized type system:

```
src/
├── core/          # App shell, routes, providers, axios instance
├── layouts/        # Route layouts (Main, Auth, Admin, Owner)
├── modules/         # Feature modules (auth, property, booking, payment, admin, owner, user)
│   └── <feature>/
│       ├── pages/
│       ├── components/
│       ├── hooks/
│       ├── context/
│       ├── services/
│       ├── types/
│       └── validations/
├── shared/         # Reusable components, constants, utilities
├── types/          # Centralized cross-module TypeScript types (single source of truth)
└── routes/
```

Every domain (`user`, `auth`, `property`, `booking`, `payment`, `dashboard`) has its DTOs defined once in `src/types/` and consumed everywhere else — no duplicated or drifting type definitions across modules.

---

## Project Structure

```
LeaseStay/
├── frontend/         # React + Vite client
│   ├── public/
│   │   └── screenshots/    # README screenshots live here
│   └── src/
├── backend/          # Node.js + Express API
│   └── src/
│       ├── modules/       # admin, auth, users, properties, bookings, payments, owner
│       ├── helpers/
│       ├── middlewares/
│       └── config/
└── vercel.json       # Frontend deployment config
```

---

## Getting Started

### Prerequisites

- **Node.js** ≥ 18.x
- **npm** ≥ 9.x
- A **MongoDB** instance (local or [Atlas](https://www.mongodb.com/atlas))
- A **Redis** instance (local or [Upstash](https://upstash.com)/[Redis Cloud](https://redis.com/try-free/))
- A **Cloudinary** account (for image/document uploads)
- A **Razorpay** account (for payments)
- A **Google Cloud** OAuth Client ID (for Google Sign-In)

### Installation

```bash
git clone https://github.com/Dp20703/leasestay.git
cd leasestay

# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

### Environment Variables

Create a `.env` file in **`frontend/`**:

```dotenv
VITE_API_URL=http://localhost:8000/api/v1
VITE_GOOGLE_CLIENT_ID=your-google-oauth-client-id.apps.googleusercontent.com
VITE_RAZORPAY_KEY_ID=your-razorpay-key-id
```

Create a `.env` file in **`backend/`**:

```dotenv
# Server
PORT=8000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
CLIENT_URLS=http://localhost:5173,https://leasestay.vercel.app

# Database
MONGO_URI=your-mongodb-connection-string
REDIS_URL=your-redis-connection-string

# Auth
JWT_SECRET=your-jwt-secret
JWT_EXPIRES_IN=7d
GOOGLE_CLIENT_ID=your-google-oauth-client-id
GOOGLE_CLIENT_SECRET=your-google-oauth-client-secret

# Cloudinary
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Razorpay
RAZORPAY_KEY_ID=your-razorpay-key-id
RAZORPAY_KEY_SECRET=your-razorpay-key-secret
```

### Running Locally

```bash
# Terminal 1 — backend
cd backend
npm run dev

# Terminal 2 — frontend
cd frontend
npm run dev
```

The frontend runs at `http://localhost:5173` and the backend at `http://localhost:8000`.

---

## Deployment

| Service      | Platform                     | Notes                                                    |
| ------------ | ---------------------------- | -------------------------------------------------------- |
| Frontend     | [Vercel](https://vercel.com) | SPA build via Vite, rewrites configured in `vercel.json` |
| Backend      | [Render](https://render.com) | Node/Express web service                                 |
| Database     | MongoDB Atlas                |                                                          |
| Cache        | Redis Cloud                  |                                                          |
| File Storage | Cloudinary                   | Property images & verification documents                 |
| Payments     | Razorpay                     | Test mode by default                                     |

---

## API Overview

The backend exposes a versioned REST API under `/api/v1`:

| Module     | Base Route           | Description                                                         |
| ---------- | -------------------- | ------------------------------------------------------------------- |
| Auth       | `/api/v1/auth`       | Register, login, Google OAuth, password reset                       |
| Users      | `/api/v1/users`      | Profile, wishlist, owner application                                |
| Properties | `/api/v1/properties` | Listing, search, CRUD, images/documents                             |
| Bookings   | `/api/v1/bookings`   | Create, accept, reject, cancel                                      |
| Payments   | `/api/v1/payments`   | Razorpay order creation & verification                              |
| Owner      | `/api/v1/owner`      | Owner dashboard & payment summaries                                 |
| Admin      | `/api/v1/admin`      | Platform management (users, owners, properties, bookings, payments) |

---

## Roadmap

- [ ] Dynamic sitemap generation for individual property pages
- [ ] Real-time notifications (Socket.io)
- [ ] In-app messaging between tenant and owner
- [ ] Advanced analytics for the admin dashboard
- [ ] Multi-language support

---

## Contributing

Contributions are welcome! Please open an issue first to discuss what you'd like to change.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## License

Distributed under the MIT License. See `LICENSE` for more information.

---

## Contact

**Darshan** — [codewithdp2073@gmail.com](mailto:codewithdp2073@gmail.com)

Project Link: [https://github.com/Dp20703/leasestay](https://github.com/Dp20703/leasestay)

<div align="center">

⭐ If you found this project interesting, consider giving it a star!

</div>
