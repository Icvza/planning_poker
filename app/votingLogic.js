export const createGame = () => {
  document.getElementById("setup-screen").classList.add("hidden");
  document.getElementById("join-screen").classList.remove("hidden");
};

export const joinGame = () => {
  document.getElementById("join-screen").classList.add("hidden");
  document.getElementById("game-screen").classList.remove("hidden");
};

export let selectedPoints = null;

export const selectPoints = (points, event) => {
  selectedPoints = points;
  document.querySelectorAll(".point-button").forEach((btn) => {
    btn.classList.remove("selected");
  });
  event.target.classList.add("selected");
};

export const submitVote = () => {
  document.getElementById("game-screen").classList.add("hidden");
  document.getElementById("results").classList.remove("hidden");
};

export const clearVotes = () => {
  selectedPoints = null;
  document.querySelectorAll(".point-button").forEach((btn) => {
    btn.classList.remove("selected");
  });
  document.getElementById("game-screen").classList.remove("hidden");
  document.getElementById("results").classList.add("hidden");
};
