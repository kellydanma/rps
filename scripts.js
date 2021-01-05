const POKEMON = new Map([
  ["1", 1],
  ["2", 2],
  ["3", 3],
]);

const POKEMON_IMAGE = new Map([
  [1, "./images/charmander.png"],
  [2, "./images/squirtle.png"],
  [3, "./images/bulbasaur.png"],
]);

const TRAINER_TEXT = new Map([
  [1, "Charmander, I choose you! 🔥"],
  [2, "Squirtle, I choose you! 💦"],
  [3, "Bulbasaur, I choose you! 🌱"],
]);

const RIVAL_TEXT = new Map([
  [1, "Your rival used Charmander! 🔥"],
  [2, "Your rival used Squirtle! 💦"],
  [3, "Your rival used Bulbasaur! 🌱"],
]);

const removeElements = (nodes) => [...nodes].forEach((n) => n.remove());
const randomPlay = () => Math.ceil(Math.random() * Math.floor(3)); // 1, 2, or 3

function play(user, computer) {
  if (user == computer) {
    return [0, 0]; // a tie
  } else if (computer - user == 1) {
    return [0, 1]; // computer wins
  } else if (user - computer == 2) {
    return [0, 1]; // computer wins
  } else {
    return [1, 0]; // user wins
  }
}

function displayTrainer(button) {
  removeElements(button.childNodes);
  trainerPokemon = POKEMON.get(button.id);
  const trainerImage = document.createElement("img");
  trainerImage.src = POKEMON_IMAGE.get(trainerPokemon);
  button.appendChild(trainerImage);
  const trainerText = document.createElement("h2");
  trainerText.textContent = TRAINER_TEXT.get(trainerPokemon);
  button.appendChild(trainerText);
}

function displayRival(pokemon) {
  const rival = document.querySelector(".rival");
  removeElements(rival.childNodes);
  const rivalImage = document.createElement("img");
  rivalImage.src = POKEMON_IMAGE.get(pokemon);
  rival.appendChild(rivalImage);
  const rivalText = document.createElement("h2");
  rivalText.textContent = RIVAL_TEXT.get(pokemon);
  rival.appendChild(rivalText);
}

function displayScore(curr, userScore, compScore) {
  const score = document.querySelector(".score");
  removeElements(score.childNodes);
  const round = document.createElement("h3");
  round.textContent = `Round ${curr} 🏁`;
  score.appendChild(round);
  const trainerScore = document.createElement("h4");
  trainerScore.textContent = `You: ${userScore}`;
  score.appendChild(trainerScore);
  const rivalScore = document.createElement("h4");
  rivalScore.textContent = `Your rival: ${compScore}`;
  score.appendChild(rivalScore);
}

function resetGame() {
  const score = document.querySelector(".score");
  const playAgain = document.createElement("button");
  playAgain.className = "play-again";
  playAgain.textContent = "Let's go again!";
  playAgain.style.fontFamily = "'Staatliches', cursive";
  playAgain.style.fontSize = "1.5em";
  playAgain.addEventListener("click", () => {
    window.location.reload();
  });
  score.appendChild(playAgain);
}

function battle() {
  let userScore = 0,
    compScore = 0;
  let trainerPokemon,
    prevPokemon,
    round = 0,
    endGame = false;

  const buttons = document.querySelectorAll("button");
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      if (!endGame) {
        if (prevPokemon != null) {
          document.getElementById(prevPokemon).lastChild.remove();
        }
        round++;
        endGame = round >= 7 ? true : false;
        let rivalPokemon = randomPlay();
        prevPokemon = POKEMON.get(button.id);
        let results = play(prevPokemon, rivalPokemon);
        userScore += results[0];
        compScore += results[1];
        displayTrainer(button);
        displayRival(rivalPokemon);
        displayScore(round, userScore, compScore);
        if (endGame) {
          resetGame();
        }
      }
    });
  });
}

battle();
