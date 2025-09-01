# School Management System

A mini-project built with **Next.js** and **MySQL** for managing school data. The project consists of two main pages:  

1. **Add School** – To input and store school data.  
2. **Show Schools** – To display the list of schools like an e-commerce product listing.  

---

## Table of Contents

- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [Database](#database)  
- [Pages](#pages)  
- [Setup & Installation](#setup--installation)  
- [Deployment](#deployment)  

---

## Features

- Add new school with details: name, address, city, state, contact, email, and image.  
- Input validation using **react-hook-form** (required fields, email format, 10-digit phone number).  
- Store school images in `public/schoolImages` folder.  
- Display schools with image, name, address, and city.  
- Responsive design for desktop and mobile.  

---

## Tech Stack

- **Frontend:** Next.js (React)  
- **Backend:** Node.js API routes  
- **Database:** MySQL  
- **Form Validation:** react-hook-form  
- **Styling:** Tailwind CSS  

---

## Database

MySQL Table: `schools`

| Column      | Type          | Description                       |
|------------ |-------------- |---------------------------------- |
| id         | INT AUTO_INCREMENT | Primary Key                     |
| name       | TEXT           | School Name                       |
| address    | TEXT           | School Address                    |
| city       | TEXT           | City                               |
| state      | TEXT           | State                              |
| contact    | BIGINT         | Contact Number (10 digits)        |
| email_id   | TEXT           | Email ID                           |
| image      | TEXT           | File name of uploaded image        |

---

## Pages

### 1. Add School (`addSchool.jsx`)

- Form fields: Name, Address, City, State, Contact, Email, Image  
- Validations: Required fields, valid email, 10-digit contact number  
- Image upload stored in: `public/schoolImages`  
- Responsive layout  

### 2. Show Schools (`showSchools.jsx`)

- Displays all schools from the database  
- Shows: Image, Name, Address, City  
- Styled similar to e-commerce product listings  
- Responsive layout  

---

## Setup & Installation

1. **Clone the repo**

```bash
git clone https://github.com/DivyaPradhan23/school-management.git
cd school-management
