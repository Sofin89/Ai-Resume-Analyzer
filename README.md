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

⚙️ Getting StartedFollow these instructions to get a copy of the project up and running on your local machine.PrerequisitesNode.js: v18.0.0 or higherMongoDB: A local instance or a cloud MongoDB Atlas URIGoogle Gemini API Key: Required for the AI analysis featuresInstallationClone the repository:Bashgit clone [https://github.com/your-username/resume-analyzer.git](https://github.com/your-username/resume-analyzer.git)
cd resume-analyzer
Install Server Dependencies:Bashcd server
npm install
Install Client Dependencies:Bashcd ../client
npm install
Environment VariablesCreate a .env file in the /server directory and populate it with the following:Code snippet# Server Config
PORT=5000
NODE_ENV=development

# Database
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/smartresume?retryWrites=true&w=majority

# Security
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRE=30d

# Google Generative AI
GEMINI_API_KEY=your_gemini_api_key_here

# Email Configuration (Nodemailer)
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_specific_password
Create a .env file in the /client directory:Code snippetVITE_API_BASE_URL=http://localhost:5000
Running the ApplicationStart the Backend (from /server):Bashnpm run dev
Start the Frontend (from /client):Bashnpm run dev
Your frontend should now be running on http://localhost:5173 and the backend on http://localhost:5000.🔐 Role-Based AccessGuest: Can view the landing page, register, and log in.Authenticated User: Can upload resumes, generate AI analysis reports, customize documents, and manage their profile.Administrator: Has access to the /admin/* routes. Can manage user accounts, update job role datasets, track application analytics, and monitor global resume uploads.🌐 API ReferenceEndpointMethodDescriptionAccess/api/auth/registerPOSTRegister a new userPublic/api/auth/loginPOSTAuthenticate user & get tokenPublic/api/users/profileGET/PUTGet or update user profilePrivate/api/resume/uploadPOSTUpload and parse PDF resumePrivate/api/customize-resumePOSTGenerate tailored resumePrivate/api/admin/analyticsGETFetch platform usage statsAdmin🤝 ContributingContributions, issues, and feature requests are welcome!Fork the ProjectCreate your Feature Branch (git checkout -b feature/AmazingFeature)Commit your Changes (git commit -m 'Add some AmazingFeature')Push to the Branch (git push origin feature/AmazingFeature)Open a Pull Request📄 LicenseThis project is licensed under the ISC License.
