const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Game state
let players = [];
let deck = [];
let trumpSuit = null;
let currentTurn = null;
let tricks = [];

// Initialize the deck
const initializeDeck = () => {
  const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
  const ranks = ['7', '8', '9', '10', 'jack', 'queen', 'king', 'ace'];
  deck = suits.flatMap(suit => ranks.map(rank => ({ suit, rank })));
  shuffleDeck();
};

// Shuffle the deck
const shuffleDeck = () => {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
};

// Deal cards to players
const dealCards = () => {
  players.forEach(player => {
    player.hand = deck.splice(0, 5);
    player.socket.emit('dealCards', player.hand);
  });
};

// Determine trump suit
const determineTrumpSuit = () => {
  trumpSuit = deck[0].suit;
  io.emit('trumpSuit', trumpSuit);
};

// Socket.IO connection handler
io.on('connection', (socket) => {
  console.log('A player connected:', socket.id);

  // Add player to the game
  players.push({ id: socket.id, socket, hand: [] });

  // Start game when 4 players are connected
  if (players.length === 4) {
    initializeDeck();
    dealCards();
    determineTrumpSuit();
    currentTurn = players[0].id;
    io.emit('startGame', { currentTurn });
  }

  // Handle player actions
  socket.on('playCard', (card) => {
    const player = players.find(p => p.id === socket.id);
    if (player.id === currentTurn) {
      tricks.push({ player: player.id, card });
      player.hand = player.hand.filter(c => c !== card);

      // Notify all players
      io.emit('cardPlayed', { player: player.id, card });

      // Move to next player
      const currentIndex = players.findIndex(p => p.id === currentTurn);
      currentTurn = players[(currentIndex + 1) % 4].id;
      io.emit('nextTurn', currentTurn);
    }
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    players = players.filter(player => player.id !== socket.id);
    console.log('A player disconnected:', socket.id);
  });
});


const PORT = 3000;

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});