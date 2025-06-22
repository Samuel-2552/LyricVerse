# LyricVerse Master Song DB API Documentation

## Overview

The Master Song DB API provides endpoints for managing the central song database. This database contains all songs that can be viewed by users, with admin-only access for creating, updating, and deleting songs.

**Base URL:** `http://localhost:3000/songs`

---

## Authentication & Authorization

- **Admin Access Required:** POST, PATCH, DELETE operations
- **Public Access:** GET operations (with draft filtering)
- **Authentication:** JWT-based (via `req.user` middleware)

---

## Database Collections

- **Songs:** `masterSongDb`
- **Versions:** `masterVersion`

---

## API Endpoints

### 1. Get All Songs

**GET** `/songs`

Retrieves all songs from the master database with role-based filtering.

#### Query Parameters

| Parameter  | Type   | Description                                          | Example               |
| ---------- | ------ | ---------------------------------------------------- | --------------------- |
| `draft`    | string | Filter by draft status (admin only)                  | `?draft=true`         |
| `search`   | string | Search in title, alt_title, author                   | `?search=grace`       |
| `language` | string | Filter by language                                   | `?language=English`   |
| `genre`    | string | Filter by genre                                      | `?genre=Hymn`         |
| `author`   | string | Filter by author                                     | `?author=John Newton` |
| `page`     | number | Page number for pagination                           | `?page=1`             |
| `limit`    | number | Items per page (max 100)                             | `?limit=20`           |
| `sortBy`   | string | Sort field (title, author, created_at, likes, views) | `?sortBy=title`       |
| `order`    | string | Sort order (asc/desc)                                | `?order=desc`         |

#### Access Control

- **Admin/Staff:** Can see all songs, can filter by draft status
- **Regular Users:** Can only see published songs (`draft: false`)

#### Response Format

```json
{
  "songs": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "title": "Amazing Grace",
      "alt_title": "Grace",
      "language": "English",
      "author": "John Newton",
      "link": "https://youtube.com/watch?v=example",
      "genre": "Hymn",
      "draft": false,
      "version_id": 1,
      "staff_user_id": 7,
      "created_at": "2025-01-19T18:00:00Z",
      "edited_at": "2025-01-19T18:30:00Z",
      "edited_by_staff": 8,
      "scale_id": 4,
      "tag_id": 1,
      "likes": 40,
      "views": 38
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 5,
    "totalSongs": 100,
    "hasNext": true,
    "hasPrev": false
  }
}
```

#### Example Request

```bash
# Get all published songs (user)
curl "http://localhost:3000/songs"

# Get all songs including drafts (admin)
curl "http://localhost:3000/songs"

# Search for songs
curl "http://localhost:3000/songs?search=grace&language=English"

# Get paginated results
curl "http://localhost:3000/songs?page=2&limit=10&sortBy=created_at&order=desc"
```

---

### 2. Get Song by ID

**GET** `/songs/:id`

Retrieves a specific song by its ID.

#### Path Parameters

| Parameter | Type   | Description                  |
| --------- | ------ | ---------------------------- |
| `id`      | string | MongoDB ObjectId of the song |

#### Access Control

- **Admin/Staff:** Can view any song (including drafts)
- **Regular Users:** Can only view published songs (`draft: false`)

#### Response Format

```json
{
  "_id": "507f1f77bcf86cd799439011",
  "title": "Amazing Grace",
  "alt_title": "Grace",
  "language": "English",
  "author": "John Newton",
  "link": "https://youtube.com/watch?v=example",
  "genre": "Hymn",
  "draft": false,
  "version_id": 1,
  "staff_user_id": 7,
  "created_at": "2025-01-19T18:00:00Z",
  "edited_at": "2025-01-19T18:30:00Z",
  "edited_by_staff": 8,
  "scale_id": 4,
  "tag_id": 1,
  "likes": 40,
  "views": 39
}
```

#### Example Request

```bash
curl "http://localhost:3000/songs/507f1f77bcf86cd799439011"
```

#### Notes

- Automatically increments the `views` count when accessed
- Returns 403 if user tries to access a draft song without admin privileges

---

### 3. Create New Song

**POST** `/songs`

Creates a new song in the master database.

#### Access Control

- **Admin/Staff Only**

#### Request Body Schema

```json
{
  "title": "string (required)",
  "alt_title": "string (optional)",
  "language": "string (required)",
  "author": "string (required)",
  "link": "string (optional, must be valid URL)",
  "genre": "string (optional)",
  "draft": "boolean (optional, defaults to true)",
  "staff_user_id": "number (required)",
  "scale_id": "number (optional)",
  "tag_id": "number (optional)"
}
```

#### Request Body Example

```json
{
  "title": "How Great Thou Art",
  "alt_title": "O Store Gud",
  "language": "English",
  "author": "Carl Boberg",
  "link": "https://youtube.com/watch?v=example",
  "genre": "Hymn",
  "staff_user_id": 7,
  "scale_id": 4,
  "tag_id": 1,
  "draft": true
}
```

#### Response Format

```json
{
  "insertedId": "507f1f77bcf86cd799439012"
}
```

#### Auto-Generated Fields

- `created_at`: Current timestamp
- `edited_at`: Current timestamp
- `likes`: 0 (default)
- `views`: 0 (default)

#### Example Request

```bash
curl -X POST "http://localhost:3000/songs" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "How Great Thou Art",
    "language": "English",
    "author": "Carl Boberg",
    "staff_user_id": 7,
    "draft": true
  }'
```

---

### 4. Update Song

**PATCH** `/songs/:id`

Updates an existing song in the master database.

#### Path Parameters

| Parameter | Type   | Description                  |
| --------- | ------ | ---------------------------- |
| `id`      | string | MongoDB ObjectId of the song |

#### Access Control

- **Admin/Staff Only**

#### Request Body

Any combination of the song fields (all optional for updates):

```json
{
  "title": "string (optional)",
  "alt_title": "string (optional)",
  "language": "string (optional)",
  "author": "string (optional)",
  "link": "string (optional)",
  "genre": "string (optional)",
  "draft": "boolean (optional)",
  "staff_user_id": "number (optional)",
  "scale_id": "number (optional)",
  "tag_id": "number (optional)"
}
```

#### Response Format

```json
{
  "message": "Song updated"
}
```

#### Auto-Generated Fields

- `edited_at`: Current timestamp

#### Example Request

```bash
curl -X PATCH "http://localhost:3000/songs/507f1f77bcf86cd799439011" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Amazing Grace (Updated)",
    "draft": false
  }'
```

---

### 5. Delete Song

**DELETE** `/songs/:id`

Permanently deletes a song and all its associated versions.

#### Path Parameters

| Parameter | Type   | Description                  |
| --------- | ------ | ---------------------------- |
| `id`      | string | MongoDB ObjectId of the song |

#### Access Control

- **Admin/Staff Only**

#### Response Format

```json
{
  "message": "Song deleted successfully",
  "deletedSong": 1,
  "deletedVersions": 3
}
```

#### Example Request

```bash
curl -X DELETE "http://localhost:3000/songs/507f1f77bcf86cd799439011"
```

#### Notes

- This is a **hard delete** - the song and all its versions are permanently removed
- Consider implementing soft delete for production use

---

### 6. Get Song Versions

**GET** `/songs/:id/versions`

Retrieves all versions associated with a specific song.

#### Path Parameters

| Parameter | Type   | Description                  |
| --------- | ------ | ---------------------------- |
| `id`      | string | MongoDB ObjectId of the song |

#### Access Control

- **Public Access** (subject to song's draft status)

#### Response Format

```json
[
  {
    "_id": "507f1f77bcf86cd799439013",
    "songId": "507f1f77bcf86cd799439011",
    "lyrics": "Amazing grace! How sweet the sound...",
    "createdBy": "admin",
    "createdAt": "2025-01-19T18:00:00Z"
  }
]
```

#### Example Request

```bash
curl "http://localhost:3000/songs/507f1f77bcf86cd799439011/versions"
```

---

### 7. Add Song Version

**POST** `/songs/:id/versions`

Adds a new version to an existing song.

#### Path Parameters

| Parameter | Type   | Description                  |
| --------- | ------ | ---------------------------- |
| `id`      | string | MongoDB ObjectId of the song |

#### Access Control

- **Admin/Staff Only**

#### Request Body

```json
{
  "lyrics": "string (required)",
  "createdBy": "string (optional)",
  "chords": "string (optional)",
  "notes": "string (optional)"
}
```

#### Response Format

```json
{
  "insertedId": "507f1f77bcf86cd799439014"
}
```

#### Example Request

```bash
curl -X POST "http://localhost:3000/songs/507f1f77bcf86cd799439011/versions" \
  -H "Content-Type: application/json" \
  -d '{
    "lyrics": "Amazing grace! How sweet the sound...",
    "createdBy": "admin",
    "chords": "G C D Em"
  }'
```

---

## Error Responses

### Common Error Formats

#### Validation Error (400)

```json
{
  "error": "Validation failed",
  "details": [
    {
      "message": "\"title\" is required",
      "path": ["title"]
    }
  ]
}
```

#### Not Found Error (404)

```json
{
  "error": "Song not found"
}
```

#### Access Denied Error (403)

```json
{
  "error": "Access denied"
}
```

#### Server Error (500)

```json
{
  "error": "Failed to fetch songs"
}
```

---

## Rate Limiting

- **GET requests:** 100 requests per minute per IP
- **POST/PATCH/DELETE requests:** 20 requests per minute per authenticated user

---

## Data Validation

All requests are validated against Joi schemas:

- Required fields must be present
- String fields must be non-empty
- URLs must be valid format
- Numbers must be valid integers
- Booleans must be true/false

---

## Testing Examples

### Complete Workflow Test

```bash
# 1. Create a song
curl -X POST "http://localhost:3000/songs" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Song",
    "language": "English",
    "author": "Test Author",
    "staff_user_id": 7,
    "draft": true
  }'

# 2. Get the song ID from response and update it
curl -X PATCH "http://localhost:3000/songs/SONG_ID_HERE" \
  -H "Content-Type: application/json" \
  -d '{"draft": false}'

# 3. Add a version
curl -X POST "http://localhost:3000/songs/SONG_ID_HERE/versions" \
  -H "Content-Type: application/json" \
  -d '{
    "lyrics": "Test lyrics here...",
    "createdBy": "admin"
  }'

# 4. View the song
curl "http://localhost:3000/songs/SONG_ID_HERE"

# 5. View versions
curl "http://localhost:3000/songs/SONG_ID_HERE/versions"
```

---

## Notes for Implementation

1. **Authentication Middleware:** Ensure `req.user` is set with user role information
2. **Database Indexes:** Consider adding indexes on frequently queried fields
3. **Soft Delete:** Consider implementing soft delete for production
4. **Caching:** Implement Redis caching for frequently accessed songs
5. **File Uploads:** Consider adding support for audio file uploads
6. **Search:** Implement full-text search for better song discovery
