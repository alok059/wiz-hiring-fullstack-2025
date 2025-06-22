# Calendly Clone

A full-stack scheduling application inspired by Calendly. Users can create events, view available time slots, and book appointments.



---

## Tech Stack
- **Frontend:** React, Vite, Tailwind CSS, date-fns
- **Backend:** FastAPI , SQLite
- **Deployment:** Vercel (frontend), Render/Railway (backend)

---

## Folder Structure

```
calendly-clone/
│
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── crud.py
│   │   ├── database.py
│   │   ├── main.py
│   │   ├── models.py
│   │   └── schemas.py
│   └── scheduler.db
│
└── frontend/
    ├── public/
    ├── src/
    │   ├── api/
    │   ├── assets/
    │   ├── components/
    │   │   ├── BookingForm.jsx
    │   │   ├── Navbar.jsx
    │   │   └── TimeSlotPicker.jsx
    │   ├── pages/
    │   │   ├── CreateEvent.jsx
    │   │   ├── EventDetail.jsx
    │   │   ├── Home.jsx
    │   │   └── MyBookings.jsx
    │   ├── App.jsx
    │   └── main.jsx
    ├── index.html
    └── package.json
```

---

## Features
- Event creation and listing
- Event detail view with available time slots
- Booking system with slot availability
- Time zone handling for users
- Responsive and modern UI

---

## Bonus Features
- [ ] User authentication (if implemented)
- [ ] Email notifications (if implemented)
- [ ] Booking management dashboard (if implemented)

---

## Setup Instructions

### Prerequisites
- Node.js (v18+)
- Python 3.10+
- [Optional] Virtual environment for Python

### Backend
1. Navigate to the backend folder:
    ```sh
    cd backend
    ```
2. Create a virtual environment and activate it:
    ```sh
    python -m venv venv
    .\venv\Scripts\activate
    ```
3. Install dependencies:
    ```sh
    pip install fastapi uvicorn sqlalchemy
    ```
4. Copy `.env.example` to `.env` and set environment variables as needed.
5. Run the backend server:
    ```sh
    uvicorn app.main:app --reload
    ```

### Frontend
1. Navigate to the frontend folder:
    ```sh
    cd frontend
    ```
2. Install dependencies:
    ```sh
    npm install
    ```
3. Copy `.env.example` to `.env` and set environment variables as needed.
4. Start the development server:
    ```sh
    npm run dev
    ```

---

## Deployment
- **Frontend:** [Vercel Deployment URL](https://your-frontend-url.vercel.app)
- **Backend:** [Render/Railway Deployment URL](https://your-backend-url.onrender.com)

---

## Assumptions & Improvements

### Assumptions
- All users are in different time zones; time slots are shown in the user's local time.
- No authentication required for booking (unless bonus implemented).
- SQLite is used for simplicity in development.

### Areas for Improvement
- Add authentication and user management.
- Integrate email notifications for bookings.
- Improve error handling and validation.
- Add tests for backend and frontend.
- Enhance UI/UX with more feedback and accessibility.

---

## .env.example

**Backend**
```
DATABASE_URL=sqlite:///./scheduler.db
SECRET_KEY=your_secret_key
```

**Frontend**
```
VITE_API_URL=http://localhost:8000
```

---

## Approach
- Used FastAPI for rapid backend development and automatic docs.
- Used React with Vite for fast, modern frontend.
- Tailwind CSS for quick and responsive styling.
- date-fns and date-fns-tz for robust date/time handling.

---
