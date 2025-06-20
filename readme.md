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
