# Apollo 247 Clone - Doctor Listing Project

A full-stack application cloning the Apollo 247 doctor listing functionality, built with Next.js, Express, and MongoDB.

## Features

- Doctor listing with filters (city, speciality, experience, fees)
- Search functionality
- Appointment booking interface
- Responsive design matching Apollo 247
- SEO optimization
- RESTful API

## Project Structure

\`\`\`
apollo247-clone/
├── backend/           # Backend code
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── app.js
│   ├── package.json
│   └── sample-data.js
├── frontend/          # Frontend code
│   ├── app/
│   ├── components/
│   ├── public/
│   ├── types/
│   ├── package.json
│   └── tailwind.config.ts
├── package.json       # Root package.json
└── README.md
\`\`\`

## Prerequisites

- Node.js (v14 or higher)
- MongoDB

## Environment Variables

Create a `.env` file in the backend directory with the following variables:

\`\`\`
PORT=5000
MONGO_URI=your_mongodb_connection_string
\`\`\`

Create a `.env.local` file in the frontend directory with:

\`\`\`
NEXT_PUBLIC_API_URL=http://localhost:5000
\`\`\`

## Installation

1. Install root dependencies:
\`\`\`bash
npm install
\`\`\`

2. Install backend and frontend dependencies:
\`\`\`bash
npm run install:all
\`\`\`

3. Seed the database with sample data:
\`\`\`bash
npm run seed
\`\`\`

## Running the Application

1. Start both backend and frontend concurrently:
\`\`\`bash
npm run dev
\`\`\`

This will start:
- Backend on http://localhost:5000
- Frontend on http://localhost:3000

2. Access the application:
   - Main page: http://localhost:3000
   - Doctor listing page: http://localhost:3000/specialties/general-physician-internal-medicine
   - API endpoints: http://localhost:5000/api/doctors/list
