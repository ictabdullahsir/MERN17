# Travello Tour CRUD API

Node.js + Express + MongoDB + Mongoose দিয়ে বানানো একটি ছোট REST API।

## Setup

```bash
npm install
```

`.env` ফাইলে আগে থেকেই MongoDB connection string দেওয়া আছে:

```
PORT=5000
MONGO_URI=mongodb+srv://<user>:<password>@cluster0.bna5sft.mongodb.net/travello
```

## Run

```bash
npm start
```

অথবা development mode-এ (nodemon দিয়ে):

```bash
npm run dev
```

Server চালু হলে দেখাবে:
```
MongoDB connected successfully
Server running on http://localhost:5000
```

## API Endpoints

### 1. Create Tour
- **POST** `/api/tours`
```json
{
  "title": "Cox's Bazar Tour",
  "location": "Cox's Bazar",
  "price": 5000,
  "description": "Enjoy a beautiful sea beach tour."
}
```

### 2. Get All Tours
- **GET** `/api/tours`

### 3. Update Tour
- **PUT** `/api/tours/id`
```json
{
  "price": 5500
}
```

### 4. Delete Tour
- **DELETE** `/api/tours/id`

Response:
```json
{
  "message": "Tour deleted successfully"
}
```

## Test করার উপায়
Postman বা Thunder Client (VS Code extension) ব্যবহার করে উপরের endpoint গুলো টেস্ট করতে পারবেন।
