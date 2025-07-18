# Order Management System 📦

A modern, full-stack Order Management System built with Next.js 14 and Node.js, featuring real-time updates, admin authentication, and comprehensive order tracking capabilities.

## 🚀 Live Demo

**[View Live Application](https://order-management-jade.vercel.app/)**

## ✨ Key Features

- **🔐 Secure Admin Authentication** - JWT-based authentication with protected routes
- **📱 Real-time Updates** - Live order notifications using Socket.io
- **📊 Admin Dashboard** - Comprehensive order management interface
- **🛡️ Route Protection** - Secure admin-only access to management features
- **📋 Order CRUD Operations** - Create, read, update, and delete orders
- **🖼️ Image Upload** - Product image handling with Cloudinary integration
- **📱 Responsive Design** - Mobile-first design with Tailwind CSS
- **🔍 Data Validation** - Client and server-side validation with Zod
- **🎯 State Management** - Redux Toolkit for efficient state handling
- **📈 Order Analytics** - Dashboard statistics and insights

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **React 18** - Latest React features and hooks
- **Redux Toolkit** - State management with modern Redux
- **Socket.io Client** - Real-time communication
- **Tailwind CSS** - Utility-first CSS framework
- **React Hook Form** - Efficient form handling
- **React Toastify** - User notifications
- **Axios** - HTTP client for API requests
- **Date-fns** - Date formatting and manipulation

### Backend
- **Node.js** - Server runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database with Mongoose ODM
- **Socket.io** - Real-time bidirectional communication
- **JWT** - JSON Web Token authentication
- **bcryptjs** - Password hashing
- **Multer + Cloudinary** - File upload handling
- **Zod** - Schema validation
- **Express Validator** - Request validation middleware

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18 or higher)
- MongoDB (local or MongoDB Atlas)
- Git

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/aakash-gupta02/OrderManagement.git
cd OrderManagement
```

### 2. Backend Setup
```bash
cd backend-server
npm install
```

Create a `.env` file in the backend-server directory:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### 3. Frontend Setup
```bash
cd ../frontend-nextjs
npm install
```

### 4. Start the Application

**Backend Server:**
```bash
cd backend-server
npm run dev
```

**Frontend Application:**
```bash
cd frontend-nextjs
npm run dev
```

The application will be available at:
- Frontend: `http://localhost:3000`
- Backend: `http://localhost:5000`

## 📁 Project Structure

```
Order Management/
├── backend-server/
│   ├── config/
│   │   └── db.js                 # Database configuration
│   ├── controller/
│   │   ├── admin.controller.js   # Admin authentication logic
│   │   └── order.controller.js   # Order management logic
│   ├── middleware/
│   │   ├── admin.middleware.js   # Admin authentication middleware
│   │   ├── errorHandler.js       # Global error handling
│   │   ├── multer.middleware.js  # File upload middleware
│   │   └── validate.middleware.js # Validation middleware
│   ├── models/
│   │   ├── admin.model.js        # Admin schema
│   │   └── order.model.js        # Order schema
│   ├── route/
│   │   ├── admin.route.js        # Admin routes
│   │   └── order.route.js        # Order routes
│   ├── validators/
│   │   ├── admin.validator.js    # Admin validation schemas
│   │   └── order.validator.js    # Order validation schemas
│   ├── index.js                  # Server entry point
│   └── package.json
├── frontend-nextjs/
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/
│   │   │   │   ├── admin/
│   │   │   │   │   ├── DashboardStats.js
│   │   │   │   │   └── OrderTable.js
│   │   │   │   ├── LoadingSpinner.js
│   │   │   │   ├── Navbar.js
│   │   │   │   └── ProtectedRoute.js
│   │   │   ├── dashboard/
│   │   │   │   └── page.js       # Admin dashboard
│   │   │   ├── login/
│   │   │   │   └── page.js       # Admin login
│   │   │   ├── redux/
│   │   │   │   ├── slices/
│   │   │   │   │   ├── AuthSlices.js
│   │   │   │   │   └── orderSlices.js
│   │   │   │   ├── hooks.js
│   │   │   │   ├── store.js
│   │   │   │   └── useSocket.js
│   │   │   ├── layout.js
│   │   │   └── page.js           # Home page
│   │   └── ...
│   ├── next.config.mjs
│   ├── tailwind.config.js
│   └── package.json
└── README.md
```

## 🔑 API Endpoints

### Authentication Routes (`/auth`)
- `POST /auth/admin/register` - Register new admin
- `POST /auth/admin/login` - Admin login

### Order Routes (`/order`)
- `GET /order/all` - Get all orders (Protected)
- `POST /order/create` - Create new order
- `PUT /order/update/:id` - Update order (Protected)
- `DELETE /order/delete/:id` - Delete order (Protected)
- `GET /order/:id` - Get order by ID

## 🔒 Authentication & Security

- **JWT Authentication** - Secure token-based authentication
- **Password Hashing** - bcryptjs for secure password storage
- **Route Protection** - Protected admin routes with middleware
- **Input Validation** - Comprehensive validation using Zod schemas
- **CORS Configuration** - Secure cross-origin resource sharing

## 📊 Order Schema

Each order contains the following fields:
- **Customer Information**: Name, email, contact number
- **Product Details**: Product name, quantity, image
- **Shipping**: Delivery address
- **Timestamps**: Creation and update times
- **Validation**: Comprehensive data validation

## 🌐 Real-time Features

- **Live Order Updates** - New orders appear instantly
- **Socket.io Integration** - Bidirectional real-time communication
- **Dashboard Notifications** - Real-time order statistics
- **Connection Management** - Automatic reconnection handling

## 🎨 UI/UX Features

- **Responsive Design** - Works on all device sizes
- **Modern Interface** - Clean, professional design
- **Interactive Components** - Smooth user interactions
- **Loading States** - User feedback during operations
- **Toast Notifications** - Success/error messages
- **Form Validation** - Real-time input validation

## 🚀 Deployment

### Frontend (Vercel)
The frontend is deployed on Vercel with automatic deployments from the main branch.

### Backend
The backend can be deployed on platforms like:
- Render
- Railway
- Heroku
- DigitalOcean

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📧 Contact

**Aakash Gupta** - [@aakash-gupta02](https://github.com/aakash-gupta02)

Project Link: [https://github.com/aakash-gupta02/OrderManagement](https://github.com/aakash-gupta02/OrderManagement)

---

**Built with ❤️ using Next.js 14 and Modern Web Technologies**
