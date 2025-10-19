# Dashboard Application

This project is a **Next.js Dashboard Application** featuring **Firebase Authentication**, **Data Table operations**, **Charts visualization**, and **Dockerized setup** for deployment.

---

## 🚀 Features

* **Authentication (Firebase Auth)**

  * User Signup 
  * User Login 
  * State management with Redux

* **Dashboard**

  * Display logged-in user details using redux
  * Responsive web page for all screens

* **Data Table**

  * display dynamic users data 
  * Sorting, Filtering, and Searching
  * Export data to **Excel (xlsx)** and **PDF**

* **Charts**

  * Visualize data using charts

* **Dockerized**

  * Dockerfile and `.dockerignore` provided for easy deployment & testing

---

## 🛠️ Setup Instructions

### 1. Clone the repo

```bash
git clone https://github.com/your-username/dashboard-app.git
cd dashboard-app
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
```

### 3. Setup Firebase

* Go to [Firebase Console](https://console.firebase.google.com/)
* Create a new Firebase project
* Enable **Authentication → Email/Password**
* Copy your Firebase config and add it in `.env.local` file:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### 4. Run the app

```bash
npm run dev
```

Visit: [http://localhost:3000](http://localhost:3000)

---

## 🐳 Docker Setup

### 1. Build Docker image

```bash
docker build -t dashboard-app .
```

### 2. Run the container

```bash
docker run -p 3000:3000 dashboard-app
```

---

## 📖 Implementation Approach

The implementation followed a **modular and incremental approach**:

1. **Authentication**

   * Used Firebase for signup/login.
   * Managed user state with Redux slices for cleaner global state management.

2. **Dashboard & Layout**

   * Created a protected layout in Next.js.
   * used `Provider` in redux to wrap the whole app .

3. **Data Table**

   * Displayed dynamic users data.
   * Implemented searching, sorting, and filtering logic.
   * Added export options using **xlsx** for Excel and **jsPDF + autoTable** for PDF.

4. **Charts Visualization**

   * Integrated chart library to display age distribution and other sample metrics.

5. **Dockerization**

   * Added `Dockerfile` and `.dockerignore` in the project root for easy containerization.
   * The app can now be deployed or tested in a Docker environment.

---
