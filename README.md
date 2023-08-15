# Tokopedia Play - Backend Clone

### GG3FSGP0363 - Irfan Nada Bayu Samudera - FS7 @ Generasi Gigih 3.0

### Description

A final project from Generasi GIGIH 3.0, make a clone from `tokopedia.com/play` using MERN stack, and this is the Backend part of it

### Frontend Repository

[Frontend Repository](https://github.com/eerfunn/TokopediaPlay-Frontend-Clone)

### Frontend Deployment

[Frontend Deployment](https://tokopediaplayclone.vercel.app)

### Backend Repository

[Backend Repository](https://github.com/eerfunn/TokopediaPlay-Backend-Clone)

### Backend Deployment

[Backend Deployment](https://tokopediaplay-backend-clone-production.up.railway.app/)

# Gist:

[Gist Link](https://gist.github.com/eerfunn/0a58587925e8559c9a77d1026c3e7fa8)

# API Structure

- Controllers: Response handling
- Services: Business Logic and Validation
- Data: Data Manipulation

# Database Structure:

### User Schema:

- userId: User Identifier
- email: User email for login
- no_hp: Additional for user
- password: User password for login
- name: User name
- photo: User photo location
- created_at: User added date
- updated_at: User updated date
- deleted_at: User deleted date (for soft delete)

### Product Schema:

- productId: Product identifier
- title: Product title
- photo: Product photo url
- price: Product price
- added_by: Reference to user schema, used to identify seller
- created_at: Product added date
- updated_at: Product updated date
- deleted_at: Product deleted date (for soft delete)

### Video Schema:

- videoId: used to save YouTube video id, which will be used in YouTube embed
- videoUID: Identifier for each video
- userId: For Identify User that upload the video
- title: For Video Title
- thumbnail: For Video Thumbnail
- products: Reference to Product Schema, Used to reference product that available in live video
- comments: Reference to Comment Schema, Used to reference comment that being added in live video
- created_at: Video added date
- updated_at: Video updated date
- deleted_at: Video deleted date (for soft delete)

### Comment Schema:

- commentId: Comment identifier
- videoId: Used to identify where's the comment belong
- userId: Used to identify commenter/comment owner
- content: Comment content
- created_at: Comment added date
- updated_at: Comment updated date
- deleted_at: Comment deleted date (for soft delete)

# How to run

```
1. Clone the repository
2. Run `npm install` to install all the dependencies
3. Run your mongodb
4. Adjust variable in `.env` file, if the database name on `MONGO_URL = mongodb://localhost:27017/[database name]` already exist, please change it to different name
5. Run `npm start` and the server should working properly
```

# Change Log:

- 2023 - 07 - 21: File Structures Initialization
- 2023 - 07 - 22: GitHub Repository Initialization, Create DB Schema
- 2023 - 07 - 23: User, Product, Video API WIP, Schema Revision
- 2023 - 07 - 24: User, Product, Video API WIP, Schema Revision
- 2023 - 07 - 25: User, Product, Video API WIP, Schema Revision
- 2023 - 07 - 26:User, Product, Video API WIP, Schema Revision
- 2023 - 07 - 27: CRUD Video V1
- 2023 - 07 - 28: CRUD Product V1
- 2023 - 07 - 28: CRUD User V1
