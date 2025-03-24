🍽️ Food Ordering Website

📌 Project Overview

This is a full-stack food ordering website for a college canteen. Users can register, browse the menu, place orders, and make payments online. The project is built using Django REST Framework for the backend and React.js for the frontend.

🏗️ Tech Stack

Frontend: React.js, Bootstrap

Backend: Django, Django REST Framework (DRF)

Database: PostgreSQL / SQLite

Authentication: JWT-based authentication


🚀 Features

User Authentication (Signup, Login, JWT-based Authentication)

Menu Management (View items, search by category)

Cart System (Add, remove, and update items)

Order Management (Place, track, and manage orders)

Payment Gateway Integration (Razorpay / Stripe)

Admin Panel (Manage users, orders, and menu items)

🛠️ Installation Guide

1️⃣ Backend Setup (Django)

cd backend
python -m venv venv
source venv/bin/activate  # (venv\Scripts\activate for Windows)
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser  # Create an admin account
python manage.py runserver

2️⃣ Frontend Setup (React)

cd frontend
npm install
npm start

🔗 API Endpoints (Backend)

Method

Endpoint

Description

POST

/api/accounts/register/

User Registration

POST

/api/accounts/login/

User Login

GET

/api/menu/

Get all food items

POST

/api/orders/

Place a new order



📌 Future Enhancements

🍔 Real-time Order Tracking

💳 Integrate More Payment Methods

📦 Delivery Partner Module

🤝 Contributing

Fork the repository

Clone the repo

Create a feature branch (git checkout -b feature-branch)

Commit changes (git commit -m "Add feature")

Push to branch (git push origin feature-branch)

