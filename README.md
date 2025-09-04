# DocLink
# 🩺 Doctor Appointment Management System

A full-featured **Next.js** application for managing doctor appointments, designed for both patients and doctors.  
The project is fully responsive, with features including authentication, search, filtering, booking appointments, and managing patient appointments.

---
## Live Demo: [https://doc-link-gold.vercel.app/](https://doc-link-gold.vercel.app/)


## 🌟 Features

### General
- **Responsive Design:** Supports both mobile and desktop devices.

### Doctors
- **Doctor Cards:** Display profile photo, name, and specialization.
- **Pagination:** Navigate through doctor cards efficiently.
- **Search:** Implemented search with debounce to improve performance.
- **Filtering:** Filter doctors based on specialization.

### Authentication
- **Login & Registration:** With form validation.
- **Role-based Session Management:** Using Context API and localStorage.
- **Authentication Guard:** Protect `/dashboard` routes.

### Patient Features
- **Appointment Booking:** Book appointments with date selection.
- **Appointment Details View:** View status and cancel appointments.
- **Status Filter:** Filter patient appointments based on status.
#### 1. Appointment List for Doctors Dashboard
- **Comprehensive View:** Displays a complete list of all appointments including patient details, scheduled times, and current status.  
- **Date Filtering:** Filter appointments by a specific date for quick lookup.  
- **Status Filtering:** Quickly filter appointments by status (`Pending`, `Completed`, `Cancelled`) for better organization.  

#### 2. Appointment Management for Doctor
- **Mark as Completed:** Doctors can mark appointments as completed, with real-time updates reflected in the UI.  
- **Mark as Cancelled:** Cancel appointments directly, with real-time UI updates.   

### Profile
- **Responsive Profile Page:** Displays user information and role

---

## 🛠 Tech Stack

- **Next.js 15**   
- **Tailwind CSS** for styling   
- **Heroicons** for icons  
- **Context API & localStorage** for session management  

---

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/Antor-Sarker/DocLink.git
cd DocLink
```
---

### 2. Install Dependencies
```bash
npm install
# or
yarn install
```
---

### 4. Run the Development Server
```bash
npm run dev
```
The app will run at: http://localhost:3000
---
