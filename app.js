import init, { GameState } from "./pkg/planning_poker.js";
import {
  createGame,
  joinGame,
  selectPoints,
  submitVote,
  clearVotes,
} from "./app/votingLogic.js";

let currentGame = null;
let player = null;
let vote = null;

const checkGameExists = () => {
  return currentGame !== null;
};

const handleInitialLoad = () => {
  if (checkGameExists()) {
    createGame();
  }
};

const handleCreateGame = async () => {
  try {
    createGame();
    currentGame = new GameState();
    // Switch to join screen after game is created
    handleInitialLoad();
    console.log("Game created:", currentGame);
  } catch (error) {
    console.error("Failed to create game:", error);
  }
};

const handleAddPlayer = (name, isAnonymous) => {
  if (!currentGame) {
    console.error("No game to join");
    return;
  }
  joinGame();
  const id = currentGame.add_player(name, isAnonymous);
  console.log("Player added:", name);
  player = {
    id,
    name,
    isAnonymous,
  };
};

const handleSelectPoints = (points, event) => {
  if (!currentGame && !player) {
    console.error("No game or player to vote");
    return;
  }
  console.log("Points selected:", points);
  selectPoints(points, event);
  vote = points;
};

const handleSubmitVote = () => {
  if (!currentGame && !player && !vote) {
    console.error("No game and player to vote and no vote");
    return;
  }
  console.log("Vote submitted:", vote);
  currentGame.submit_vote(player.id, vote);
  submitVote();
};

const handleClearVotes = () => {
  if (!currentGame) {
    console.error("No game to clear votes");
    return;
  }
  clearVotes();
};

window.createGame = handleCreateGame;
window.joinGame = handleAddPlayer;
window.selectPoints = handleSelectPoints;
window.submitVote = handleSubmitVote;
window.clearVotes = handleClearVotes;

const run = async () => {
  await init();
  handleInitialLoad();
};

run();
