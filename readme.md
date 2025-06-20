# LyricVerse

LyricVerse is a collaborative platform for managing, editing, and sharing a large database of songs and lyrics, designed for scalability and real-time collaboration. The application supports user workspaces, granular permissions, and customizable song collections, with a focus on serving communities such as churches, bands, and music enthusiasts.

## Features

- **User Authentication & Roles**: Supports multiple user roles (active, inactive, blocked) and plans (free, basic, plus, premium), with admin-configurable permissions.
- **Workspaces & Collaboration**: Each user has a workspace and can invite others, enabling collaborative editing and merging of song collections, similar to Notion.
- **Module-Based Permissions**: Workspace permissions are managed via a JSON structure, allowing granular control over modules (view, edit, add songs, etc.) for each member.
- **Song Master Database**: Centralized song repository managed by admins, supporting ingestion from various sources, draft validation, and rich metadata (language, chords, tags, author, YouTube link, genre).
- **Song Versioning**: Multiple versions or covers of the same song are supported, with the ability to view and manage different versions.
- **Tagging System**: Songs can be grouped using tags (like playlists) for better organization and searchability.
- **User Song Database**: Users can add or edit songs in their own collection, with user modifications taking precedence over the master database for the same song ID.
- **Real-Time Display & Jamming**: Plus and premium plans allow authenticated or unauthenticated song display endpoints and collaborative jamming sessions.
- **Payment Tracking**: Subscription payments are logged and used to determine user access.
- **AI Integration (Planned)**: Future integration with Gemini API for transcript translation and song suggestions.

## Tech Stack

- **Frontend**: React
- **Backend**: Express (Node.js)
- **Database**: MongoDB

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn
- MongoDB instance (local or cloud)

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repo-url>
   cd LyricVerse
   ```

2. **Install backend dependencies:**
   ```bash
   cd backend
   npm install
   # or
   yarn install
   ```

3. **Install frontend dependencies:**
   ```bash
   cd ../frontend
   npm install
   # or
   yarn install
   ```

4. **Configure environment variables:**
   - Create `.env` files in both `backend` and `frontend` directories as needed (see `.env.example` if available).

5. **Start the backend server:**
   ```bash
   cd ../backend
   npm start
   # or
   yarn start
   ```

6. **Start the frontend app:**
   ```bash
   cd ../frontend
   npm start
   # or
   yarn start
   ```

### Setting up MongoDB on Ubuntu Server

To install MongoDB 8.0 on an Ubuntu server, follow these steps:

1. **Install gnupg and curl:**
   ```bash
   sudo apt-get install gnupg curl
   ```
2. **Add MongoDB GPG key:**
   ```bash
   curl -fsSL https://www.mongodb.org/static/pgp/server-8.0.asc | \
      sudo gpg -o /usr/share/keyrings/mongodb-server-8.0.gpg \
      --dearmor
   ```
3. **Add MongoDB repository:**
   ```bash
   echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-8.0.gpg ] https://repo.mongodb.org/apt/ubuntu noble/mongodb-org/8.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-8.0.list
   ```
4. **Update package list:**
   ```bash
   sudo apt-get update
   ```
5. **Install MongoDB:**
   ```bash
   sudo apt-get install -y mongodb-org
   ```
6. **Start MongoDB service:**
   ```bash
   sudo systemctl start mongod
   ```
7. **Check MongoDB status:**
   ```bash
   sudo systemctl status mongod
   ```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Create a new Pull Request

## License

This project is licensed under the MIT License.

## Acknowledgements
- Inspired by collaborative platforms like Notion and Rooflow
- UI/UX prototyping with Figma, Lovable, and Motive
- AI features planned with Gemini API
