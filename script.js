// Use the API_URL variable to make fetch requests to the API.
// Replace the placeholder with your cohort name (ex: 2109-UNF-HY-WEB-PT)
const cohortName = "2307-fsa-et-web-sf";
const API_URL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}`;

/**
 * Fetches all players from the API.
 * @returns {Object[]} the array of player objects
 */
const fetchAllPlayers = async () => {
  try {
    const response = await fetch(`https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}/players`);
    const data = await response.json();
    return data.data.players;
    // console.log(data.data.players)
  } catch (err) {
    console.error("Uh oh, trouble fetching players!", err);
  }
};
// fetchAllPlayers()

/**
 * Fetches a single player from the API.
 * @param {number} playerId
 * @returns {Object} the player object
 */
const fetchSinglePlayer = async (playerId) => {
  try {
    const response = await fetch(`${API_URL}/players/${playerId}`);
  
    const playerData = await response.json();
    return playerData.data.player;
    // console.log(playerData.data.player)
  } catch (err) {
    console.error(`Oh no, trouble fetching player #${playerId}!`, err);
    return null;
  }
};

// fetchSinglePlayer(2)
// gfg
/**
 * Updates `<main>` to display a list of all players.
 *
 * If there are no players, a corresponding message is displayed instead.
 *
 * Each player is displayed in a card with the following information:
 * - name
 * - id
 * - image (with alt text of the player's name)
 *
 * Additionally, each card has two buttons:
 * - "See details" button that, when clicked, calls `renderSinglePlayer` to
 *    display more information about the player
 * - "Remove from roster" button that, when clicked, will call `removePlayer` to
 *    remove that specific player and then re-render all players
 *
 * Note: this function should replace the current contents of `<main>`, not append to it.
 * @param {Object[]} playerList - an array of player objects
 */
const renderAllPlayers = (playerList) => {
  const mainElement = document.querySelector('main');
  mainElement.innerHTML = "";

  if (!playerList || playerList.length === 0) {
    mainElement.innerHTML = "<p>No players to display.</p>";
    return;
  }

  playerList.forEach(player => {
    const playerCard = document.createElement('div');
    playerCard.classList.add('playerCard');

    const playerName = document.createElement('h2');
    playerName.textContent = player.name;
    playerCard.appendChild(playerName);

    const playerIdElement = document.createElement('p');
    playerIdElement.textContent = `ID: ${player.id}`;
    playerCard.appendChild(playerIdElement);

    const playerImage = document.createElement('img');
    playerImage.src = player.imageUrl;
    playerImage.alt = player.name;
    playerCard.appendChild(playerImage);

    const seeDetailsButton = document.createElement('button');
    seeDetailsButton.textContent = "See Details";
    seeDetailsButton.addEventListener('click', () => {
      renderSinglePlayer(player);
    });
    playerCard.appendChild(seeDetailsButton);

    mainElement.appendChild(playerCard);
  });
};


/**
 * Updates `<main>` to display a single player.
 * The player is displayed in a card with the following information:
 * - name
 * - id
 * - breed
 * - image (with alt text of the player's name)
 * - team name, if the player has one, or "Unassigned"
 *
 * The card also contains a "Back to all players" button that, when clicked,
 * will call `renderAllPlayers` to re-render the full list of players.
 * @param {Object} player an object representing a single player
 */
const renderSinglePlayer = (player) => {
  const mainElement = document.querySelector('main');
  mainElement.innerHTML = "";

  const playerCard = document.createElement('div');
  playerCard.classList.add('playerCard');

  const playerName = document.createElement('h2');
  playerName.textContent = player.name;
  playerCard.appendChild(playerName);

  const playerIdElement = document.createElement('p');
  playerIdElement.textContent = `ID: ${player.id}`;
  playerCard.appendChild(playerIdElement);

  const playerBreed = document.createElement('p');
  playerBreed.textContent = `Breed: ${player.breed}`;
  playerCard.appendChild(playerBreed);

  const teamName = document.createElement('p');
  teamName.textContent = `Team: ${player.teamId || "Unassigned"}`;
  playerCard.appendChild(teamName);

  const playerImage = document.createElement('img');
  playerImage.src = player.imageUrl;
  playerImage.alt = player.name;
  playerCard.appendChild(playerImage);

  const backButton = document.createElement('button');
  backButton.textContent = "Back to all players";
  backButton.addEventListener('click', async () => {
    const players = await fetchAllPlayers();
    renderAllPlayers(players);
  });
  playerCard.appendChild(backButton);

  mainElement.appendChild(playerCard);
};



/**
 * Initializes the app by fetching all players and rendering them to the DOM.
 */
const init = async () => {
  const players = await fetchAllPlayers();
  renderAllPlayers(players);

};

// This script will be run using Node when testing, so here we're doing a quick
// check to see if we're in Node or the browser, and exporting the functions
// we want to test if we're in Node.
if (typeof window === "undefined") {
  module.exports = {
    fetchAllPlayers,
    fetchSinglePlayer,
    renderAllPlayers,
    renderSinglePlayer,
  };
} else {
  init();
}
