# Contact Application

A REST API for managing contacts, built with **Fastify** and **MongoDB Atlas**. Supports full CRUD operations with schema-based request validation.

## Features

- Create, read, update, and delete contacts
- JSON schema validation on every write (via Fastify)
- Unique email constraint enforced at the database level
- CORS enabled for cross-origin requests
- MongoDB Atlas connection via `@fastify/mongodb`

## Tech Stack

- [Fastify](https://fastify.dev/) 5
- MongoDB (Atlas) via `@fastify/mongodb`
- `@fastify/cors`
- `dotenv`
- `nodemon` (dev)

## Project Structure

```
contact_application/
├── Routes/
│   └── contactRoutes.js       # Route definitions
├── controller/
│   └── contactController.js   # Request handlers / business logic
├── model/
│   └── contactModel.js        # JSON schema for a Contact
├── server.js                  # App entry point
├── package.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js
- A MongoDB Atlas cluster (or any MongoDB connection string)

### Installation

```bash
git clone https://github.com/Pranayy00/contact_application.git
cd contact_application
npm install
```

### Environment Variables

Create a `.env` file in the project root:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

### Running the Server

```bash
# development (auto-restarts on changes)
npm run dev

# production
npm start
```

The API will be available at `http://localhost:<PORT>`.

## API Endpoints

Base path: `/api`

| Method | Endpoint            | Description               |
|--------|----------------------|----------------------------|
| GET    | `/`                  | Health check               |
| POST   | `/api/contacts`      | Create a new contact       |
| GET    | `/api/contacts`      | Get all contacts           |
| GET    | `/api/contacts/:id`  | Get a single contact by ID |
| PUT    | `/api/contacts/:id`  | Update a contact by ID     |
| DELETE | `/api/contacts/:id`  | Delete a contact by ID     |

### Contact Schema

```json
{
  "name": "string, 2-50 chars, letters and spaces only",
  "phone": ["string, 10-15 digits"],
  "email": "string, valid email format, must be unique",
  "addresses": [
    {
      "addressLine": "string (required)",
      "pincode": "string, exactly 6 digits (required)",
      "landmark": "string (optional)",
      "street": "string (optional)"
    }
  ]
}
```

`name`, `phone`, `email`, and `addresses` are all required on create/update.

### Example Request

```bash
curl -X POST http://localhost:5000/api/contacts \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "phone": ["9876543210"],
    "addresses": [
      {
        "addressLine": "123 Main St",
        "pincode": "400601"
      }
    ]
  }'
```

### Example Response

```json
{
  "message": "Contact inserted SuccessFully",
  "contactId": "64f1a2b3c4d5e6f7a8b9c0d1"
}
```

## Notes

- Duplicate emails are rejected with a `409 Conflict`.
- Invalid or missing MongoDB ObjectIds return a `400 Bad Request`.
- A unique index on `email` is created automatically on server startup.

## License

ISC