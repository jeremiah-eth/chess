# ♟️ Farcaster Chess Mini App

A modern chess game built as a Farcaster mini app, featuring social gameplay, real-time notifications, and community engagement.

## 🚀 Features

### Core Chess Game
- **Complete Chess Logic**: All standard rules including castling, en passant, and pawn promotion
- **Interactive Board**: Touch-optimized for mobile devices
- **Move History**: Track and review all moves
- **Game States**: Check, checkmate, stalemate detection

### Social Features
- **Farcaster Integration**: Sign in with Farcaster, cast moves, share games
- **Real-time Notifications**: Get notified of opponent moves and game events
- **User Challenges**: Challenge other Farcaster users to chess games
- **Social Sharing**: Share significant moves and victories

### Technical Features
- **React + TypeScript**: Modern, type-safe development
- **Responsive Design**: Optimized for Farcaster mini app constraints (424x695px)
- **Smooth Animations**: Framer Motion for delightful interactions
- **Mobile-First**: Touch-friendly interface with haptic feedback

## 🛠️ Development

### Prerequisites
- Node.js 22.11.0 or higher
- npm, pnpm, or yarn
- Farcaster Developer Mode enabled

### Setup
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Farcaster Integration
1. Enable Developer Mode in Farcaster
2. Install the Farcaster Mini App SDK
3. Configure authentication and social features
4. Test in Farcaster environment

## 📱 Mini App Specifications

### Dimensions
- **Web**: 424x695px
- **Mobile**: Responsive to device dimensions
- **Orientation**: Vertical layout

### Performance
- **Load Time**: <3 seconds
- **Frame Rate**: 60fps animations
- **Bundle Size**: Optimized for fast loading

## 🎮 Game Features

### Chess Rules
- ✅ All standard piece movements
- ✅ Castling (kingside and queenside)
- ✅ En passant capture
- ✅ Pawn promotion with piece selection
- ✅ Check and checkmate detection
- ✅ Stalemate detection

### Social Integration
- ✅ Farcaster authentication
- ✅ Move casting to feed
- ✅ User challenges
- ✅ Game notifications
- ✅ Social sharing

## 🏗️ Architecture

### Frontend
- **React 18**: Component-based UI
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling
- **Framer Motion**: Smooth animations

### Game Logic
- **Chess Engine**: Custom TypeScript implementation
- **State Management**: React Context + useReducer
- **Move Validation**: Comprehensive rule checking
- **Game History**: Persistent move tracking

### Farcaster Integration
- **SDK**: @farcaster/miniapp-sdk
- **Authentication**: Sign in with Farcaster
- **Social Features**: Casting, notifications, challenges
- **Real-time**: WebSocket connections for live updates

## 📦 Project Structure

```
src/
├── components/          # React components
│   ├── ChessBoard.tsx   # Main game board
│   ├── GameHeader.tsx   # Game status and controls
│   ├── MoveHistory.tsx  # Move list and navigation
│   ├── PromotionModal.tsx # Pawn promotion UI
│   └── SocialFeatures.tsx # Farcaster integration
├── chess/              # Game logic
│   ├── GameEngine.ts   # Main game controller
│   ├── Piece.ts        # Base piece class
│   └── pieces/         # Individual piece implementations
├── hooks/              # Custom React hooks
│   └── useFarcaster.ts # Farcaster SDK integration
├── types/              # TypeScript definitions
│   ├── chess.ts        # Chess game types
│   └── farcaster.ts    # Farcaster API types
└── App.tsx             # Main application component
```

## 🚀 Deployment

### Farcaster Mini App
1. Build the project: `npm run build`
2. Deploy to hosting service (Vercel, Netlify, etc.)
3. Configure Farcaster mini app manifest
4. Submit for Farcaster review

### Environment Variables
```env
VITE_FARCASTER_APP_ID=your_app_id
VITE_FARCASTER_API_KEY=your_api_key
VITE_GAME_SERVER_URL=your_game_server_url
```

## 🎯 Roadmap

### Phase 1: Core Game ✅
- [x] Chess engine implementation
- [x] React UI components
- [x] Basic game functionality
- [x] Mobile-responsive design

### Phase 2: Farcaster Integration 🚧
- [ ] Farcaster SDK integration
- [ ] User authentication
- [ ] Social features
- [ ] Real-time notifications

### Phase 3: Advanced Features 📋
- [ ] AI opponent integration
- [ ] Tournament mode
- [ ] Puzzle challenges
- [ ] Analytics and metrics

### Phase 4: Community 📋
- [ ] Leaderboards
- [ ] User profiles
- [ ] Social clubs
- [ ] Mentoring system

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

## 🙏 Acknowledgments

- Original chess game by Thomas Fisher and Max Shvartsman
- Farcaster team for the mini app platform
- Chess community for rule validation
- React and TypeScript communities

---

**Built with ❤️ for the Farcaster community**