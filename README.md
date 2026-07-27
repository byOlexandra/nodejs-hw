# 📝 Notes Application API

A RESTful API service built with Node.js and Express for managing user notes, featuring complete authentication, session management, and avatar upload support.

---

## 🚀 Tech Stack

* **Runtime:** Node.js (ES Modules)
* **Framework:** Express.js
* **Database:** MongoDB (Mongoose ORM)
* **Data Validation:** Celebrate / Joi
* **Authentication:** Cookie-based sessions (Access & Refresh tokens)
* **File Uploads:** Multer
* **Logging:** Pino (`pino-http`, `pino-pretty`)

---

## 🛠 Environment Setup (`.env`)

Create a `.env` file in the root directory of your project and add the following variables:

```env
PORT=3000
MONGO_URL=mongodb+srv://<username>:<password>@cluster.mongodb.net/<dbname>

```

---

## 📥 Installation & Setup

1. **Clone the repository:**
```bash
git clone <repository-url>
cd <project-folder>

```


2. **Install dependencies:**
```bash
npm install

```


3. **Run the server:**
* **Development mode:**
```bash
npm run dev

```


* **Production mode:**
```bash
npm start

```





---

## 📌 API Endpoints

### 🔑 Authentication (`/auth`)

| Method | Endpoint | Description | Protected |
| --- | --- | --- | --- |
| `POST` | `/auth/register` | Register a new user | ❌ |
| `POST` | `/auth/login` | Log in user (creates a session) | ❌ |
| `POST` | `/auth/logout` | Log out user (terminates session) | ❌ |
| `POST` | `/auth/refresh` | Refresh access token using a refresh token | ❌ |
| `POST` | `/auth/request-reset-email` | Request password reset link via Email | ❌ |
| `POST` | `/auth/reset-password` | Reset and set a new password | ❌ |

---

### 📝 Notes (`/notes`)

> **Note:** All note routes require authentication (`sessionId` and `accessToken` must be present in cookies).

| Method | Endpoint | Description | Protected |
| --- | --- | --- | --- |
| `GET` | `/notes` | Get all notes for the authenticated user | ✅ |
| `GET` | `/notes/:noteId` | Get a specific note by ID | ✅ |
| `POST` | `/notes` | Create a new note | ✅ |
| `PATCH` | `/notes/:noteId` | Update an existing note | ✅ |
| `DELETE` | `/notes/:noteId` | Delete a note | ✅ |

#### Note Model Structure:

```json
{
  "_id": "64b1f2e8f1c2d3a4b5c6d7e8",
  "title": "Buy groceries",
  "content": "Milk, bread, cheese",
  "tag": "Todo",
  "userId": "64b1f2e8f1c2d3a4b5c6d7e9",
  "createdAt": "2026-07-27T10:00:00.000Z",
  "updatedAt": "2026-07-27T10:00:00.000Z"
}

```

---

### 👤 User Management (`/users`)

| Method | Endpoint | Description | Protected |
| --- | --- | --- | --- |
| `PATCH` | `/users/me/avatar` | Update the current user's profile avatar | ✅ |

* **Content-Type:** `multipart/form-data`
* **Form Field Name:** `avatar`
* **Restrictions:** Image files only (`image/*`), maximum file size: **2 MB**.

---

## 🔒 Security & Error Handling

* **Input Validation:** All incoming data (body, params, query) is validated using `celebrate` schemas.
* **Authentication:** Handled via custom `authenticate` middleware that verifies `sessionId` and `accessToken` stored in cookies.
* **Centralized Error Handling:**
* Validation errors return `400 Bad Request`.
* Unauthorized requests return `401 Unauthorized`.
* Unmatched routes are handled by `notFoundHandler` (`404 Not Found`).
* Unhandled application errors are returned by `errorHandler` (`500 Internal Server Error`).
