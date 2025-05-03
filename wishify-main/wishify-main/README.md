
# Wishify - Collaborative Wishlist App

Wishify is a collaborative wishlist application that allows users to create and manage wishlists with friends and family. Users can add products, invite collaborators, and track who added which items.

## Features

- **User Authentication**: Sign up and log in with email and password
- **Create Wishlists**: Create multiple wishlists for different occasions
- **Manage Products**: Add, edit, and remove products from wishlists
- **Collaboration**: Invite others to view and edit wishlists
- **User Attribution**: See who added each product
- **Responsive Design**: Works on desktop and mobile devices
- **Dark/Light Mode**: Toggle between dark and light themes

## Tech Stack

- **Frontend**: React with TypeScript
- **State Management**: React Context API
- **Styling**: Tailwind CSS with Shadcn UI components
- **Backend/Database**: Supabase for authentication and data storage
- **Routing**: React Router
- **Notifications**: Sonner for toast notifications

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- A Supabase account and project

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/wishify.git
   cd wishify
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up Supabase:
   - Create a Supabase project
   - Run the SQL migrations to set up the required tables
   - Update the Supabase URL and anon key in the environment variables

4. Start the development server:
   ```
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
src/
├── components/     # Reusable UI components
├── contexts/       # React contexts for state management
├── hooks/          # Custom React hooks
├── integrations/   # Integration with external services (Supabase)
├── lib/            # Utility functions and helpers
├── pages/          # Page components for routing
├── services/       # Service functions for data operations
└── App.tsx         # Main application component
```

## Future Improvements

- **Real-time Updates**: Add real-time synchronization of wishlist changes
- **Comments**: Allow users to comment on products
- **Priority Ranking**: Enable users to rank items by priority
- **Social Sharing**: Share wishlists via social media or direct links
- **Price Tracking**: Track price changes over time
- **Advanced Search**: Search across multiple wishlists

## Contact

Created by [Noel Regis](mailto:noel.regis04@gmail.com) - feel free to reach out!

- [LinkedIn](https://www.linkedin.com/in/noel-regis-aa07081b1/)
- [GitHub](https://github.com/noelregis18)
- [Twitter](https://x.com/NoelRegis8)
- [Topmate](http://topmate.io/noel_regis)

## License

This project is licensed under the MIT License - see the LICENSE file for details.
