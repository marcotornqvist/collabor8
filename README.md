# Collabor8

`Collabor8` is a social-media like platform created primarily for creators/artists that are looking to collaborate on different versatile projects.

![Collabor8 Landing Page](landing-collabor8.png)
`Demo:` https://collabor8-frontend.vercel.app/

# Contents

- [Why?](#why)
- [Setup](#setup)
- [Usage](#usage)

### Why?

Simply put, the main goal with Collabor8 was to create a project that would cover most of my web development skills in one single project, and in the mean time use as many modern technologies as possible.

I wanted the application to cover different functionality such as:

- realtime chat-messaging (subscriptions)
- image upload
- authentication
- queries
- mutations
- CRUD

### Setup

Clone this repository to your computer

### Backend Setup

cd into the backend directory and run `npm install` to install all the required dependencies.

```
├── backend/ <–––
├── frontend/
└── ...
```

```bash
npm install
```

Create a .env file at the top level of the backend directory and add these environment variables.

```
├── backend/
│   └── .env  <–––
├── frontend/
└── ...
```

```bash
DATABASE_URL="" # PostgreSQL database url
ACCESS_TOKEN_SECRET="" # Random string combination
REFRESH_TOKEN_SECRET="" # Random string combination
AWS_REGION=""
AWS_BUCKET_NAME=""
AWS_ACCESS_KEY_ID=""
AWS_SECRET_ACCESS_KEY=""
DOMAIN="" # Domain of public website
EMAIL_FROM=""
EMAIL_TO=""
```

### Frontend Setup

Clone this repository to your computer and cd into the backend directory and run `npm install` to install all the required dependencies.

```
├── backend/
├── frontend/ <–––
└── ...
```

```bash
npm install
```

Create a .env file at the top level of the frontend directory and add these environment variables (optional).

```
├── backend/
├── frontend/
│   └── .env  <–––
└── ...
```

```bash
NEXT_PUBLIC_BASE_URL=""
NEXT_PUBLIC_SUBSCRIPTION_URL=""
```

### Usage

---

### Backend Usage

open a terminal instance and cd into the `backend` directory and run `npm run dev` to start the server on http://localhost:4000/

```
├── backend/ <–––
├── frontend/
└── ...
```

```bash
npm run dev
```

### Frontend Usage

open a terminal instance and cd into the `frontend` directory and run `npm run dev` to start the client on http://localhost:3000/

```
├── backend/
├── frontend/ <–––
└── README.md
```

```bash
npm run dev
```
