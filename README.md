# Blog Platform RESTful API

A robust RESTful API for a blog platform built with Node.js, Express, and MongoDB. Features full CRUD operations, pagination, search indexing, category filtering, and Joi data validation.


## Features

- **CRUD Operations**: Create, read, update, and delete blog articles.
- **Search & Filtering**: Text-based search powered by MongoDB `$text` indexes, plus filtering by category.
- **Pagination**: Efficient server-side pagination with dynamic page calculation and next/prev page links.
- **Automated View Tracking**: Auto-increments article view counts upon retrieval.
- **Validation**: Strict request payload validation using Joi schemas.

---

## Tech Stack

- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express.js](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/)
- **ODM**: [Mongoose](https://mongoosejs.com/)
- **Validation**: [Joi](https://joi.dev/)

---

## Getting Started

### Prerequisites

Ensure you have the following installed on your local machine:
- Node.js (v18 or higher)
- MongoDB running locally or a MongoDB Atlas connection URI

### Installation

1. **Clone the repository**
   ```bash
   git clone [https://github.com/jacobmaryann/Blog-API.git](https://github.com/jacobmaryann/Blog-API.git)
   cd Blog-API

Install dependencies

Bash: npm install

Set up Environment Variables
Create a .env file in the root directory:
PORT=4000
MONGO_URI=mongodb://localhost:27017/blog_db

Start the server

Bash
# Development mode
npm run dev
# Production mode
npm start


## Data Schema
```javascript
{
  title: String (required, min: 3),
  content: String (required, min: 20),
  autor: String (default: 'Guest'),
  status: String (enum: ['draft', 'published'], default: 'draft'),
  category: String (enum: ['Technology', 'General', 'Housing'], default: 'General'),
  views: Number (default: 0),
};
```

### API Endpoints
### Articles (`/api/articles`)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/articles` | Get all articles (supports `page`, `limit`) |
| 'GET' | '/api/articles?page=1&limit=2&category=Housing' | `category` query parameters (supports 'page', 'limit', 'category') |
| `GET` | `/api/articles/search?q=keyword` | Search articles using text index |
| `GET` | `/api/articles/:id` | Get a single article by ID (increments view count) |
| `POST` | `/api/articles` | Create a new article |
| `PUT` | `/api/articles/:id` | Update an existing article by ID |
| `DELETE` | `/api/articles/:id` | Delete an article by ID |


Example Request & Response 
Create Article (POST /api/articles)
Request Body:
JSON{
  "title": "Getting Started with Node.js and Express",
  "content": "Node.js is an open-source, cross-platform JavaScript runtime environment that allows developers to execute JavaScript code outside of a web browser.",
  "author": "Mary",
  "status": "published",
  "category": "Technology"
}

Response (200 Created):
JSON{
  "message": "Article created successfully",
  "data": {
    "_id": "6a9c74282cf274b4f668923c",
    "title": "Getting Started with Node.js and Express",
    "content": "Node.js is an open-source, cross-platform JavaScript runtime environment that allows developers to execute JavaScript code outside of a web browser.",
    "author": "Mary",
    "status": "published",
    "category": "Technology",
    "views": 0,
    "createdAt": "2026-09-05T19:57:28.353Z",
    "updatedAt": "2026-09-05T19:57:28.353Z"
  }
}

## Testing with Postman

This repository includes a fully configured Postman collection to make testing the API endpoints easy.

1. Clone this repository to your local machine.
2. Open Postman and click **Import** in the top left corner.
3. Select the `Blog-API.postman_collection.json` file located in the root directory.
4. All routes (`GET`, `POST`, `PUT`, `DELETE`) will be automatically loaded and ready to test against `http://localhost:4001`.