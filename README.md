# 🚀 SmartResume (AI-Powered Resume Analyzer)

![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-7-purple?style=for-the-badge&logo=vite)
![Node.js](https://img.shields.io/badge/Node.js-Express-green?style=for-the-badge&logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-success?style=for-the-badge&logo=mongodb)
![Gemini AI](https://img.shields.io/badge/AI-Google_Generative_AI-orange?style=for-the-badge&logo=google)

SmartResume is a cutting-edge, full-stack web application designed to help job seekers optimize their resumes using Artificial Intelligence. By leveraging Google's Generative AI, this platform analyzes user resumes against target job roles, identifies skill gaps, and dynamically customizes resumes to increase application success rates.

---

## 📑 Table of Contents

- [✨ Features](#-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [📁 Project Structure](#-project-structure)
- [⚙️ Getting Started](#️-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
- [🔐 Role-Based Access](#-role-based-access)
- [🌐 API Reference](#-api-reference)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## ✨ Features

* **🤖 AI-Driven Analysis:** Deep parsing of PDF resumes using Google Gemini AI to compare candidate skills against specific job descriptions.
* **🎯 Smart Customization:** Automatically tailor your resume content, generate improved bullet points, and create a targeted ATS-friendly PDF.
* **📊 Visual Skill Gap Roadmaps:** Interactive radar charts (via Recharts) that visualize candidate strengths and areas for improvement.
* **🔐 Secure Authentication:** Robust JWT-based authentication system with bcrypt password hashing and Nodemailer for password recovery.
* **🛡️ Admin Dashboard:** Comprehensive controls for administrators to manage users, configure job roles, view system analytics, and review platform usage.
* **📄 Advanced Document Processing:** Built-in tools (`pdfjs-dist` & `pdfkit`) to seamlessly extract text from uploaded PDFs and generate new customized documents.
* **✨ Modern UI/UX:** Fully responsive, animated interface built with Tailwind CSS and Framer Motion.

---

## 🛠️ Tech Stack

### Frontend Client
* **Core:** React 19, Vite, React Router DOM v6
* **Styling & Animation:** Tailwind CSS, Framer Motion
* **Data Visualization:** Recharts
* **State & Fetching:** React Context, Axios
* **Alerts:** React Toastify, React Hot Toast

### Backend Server
* **Core:** Node.js, Express.js (v5.x)
* **Database:** MongoDB, Mongoose (v9.x)
* **AI Integration:** `@google/generative-ai`
* **Security:** JSON Web Tokens (JWT), bcrypt
* **File Processing:** Multer, `pdfjs-dist`, `canvas`, `pdfkit`
* **Mailing:** Nodemailer

---

## 📁 Project Structure

```text
📦 resumeAnalyzer
 ┣ 📂 client                 # Frontend React application
 ┃ ┣ 📂 src
 ┃ ┃ ┣ 📂 assets           # Images, SVGs, and static files
 ┃ ┃ ┣ 📂 components       # Reusable UI (Charts, Layouts, ProtectedRoutes)
 ┃ ┃ ┣ 📂 context          # Auth and Theme context providers
 ┃ ┃ ┣ 📂 pages            # Application views (Home, Analyze, Admin Dashboard)
 ┃ ┃ ┗ 📜 main.jsx         # React DOM entry point
 ┃ ┣ 📜 package.json
 ┃ ┗ 📜 vite.config.js
 ┗ 📂 server                 # Backend Node/Express application
   ┣ 📂 config             # Database connection setup
   ┣ 📂 controllers        # Business logic for routes
   ┣ 📂 middleware         # Auth, error handling, and validation
   ┣ 📂 models             # MongoDB schemas
   ┣ 📂 routes             # Express API endpoints
   ┣ 📂 utils              # AI connection, PDF processing, and Email helpers
   ┣ 📜 index.js           # Server entry point
   ┗ 📜 package.json

## ⚙️ Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites
* **Node.js**: `v18.0.0` or higher
* **MongoDB**: A local instance or a cloud MongoDB Atlas URI
* **Google Gemini API Key**: Required for the AI analysis features

### Installation

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/your-username/resume-analyzer.git](https://github.com/your-username/resume-analyzer.git)
   cd resume-analyzer
