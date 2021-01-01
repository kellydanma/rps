const POKEMON = new Map([
  [1, "Charmander"],
  [2, "Squirtle"],
  [3, "Bulbasaur"],
]);

function randomPlay() {
  return Math.ceil(Math.random() * Math.floor(3)); // 1, 2, or 3
}

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

function battleString(user, computer) {
  return `${POKEMON.get(user)} vs. ${POKEMON.get(computer)}, let's go!`;
}

function scoreString(user, computer) {
  if (user == computer) {
    return "Tie!";
  } else if (user > computer) {
    return "You win!";
  } else {
    return "You lose!";
  }
}

function battle() {
  console.log("Welcome, trainer!");
  let userScore = 0,
    compScore = 0;
  for (let i = 0; i < 5; i++) {
    console.log("Pick your Pokémon...");
    let user = parseInt(prompt("1: Charmander, 2: Squirtle, 3: Bulbasaur "));
    comp = randomPlay();
    result = play(user, comp);
    userScore += result[0];
    compScore += result[1];
    console.log(battleString(user, comp));
    console.log(scoreString(result[0], result[1]));
  }
  console.log("... and the results are in!");
  console.log(`Your score: ${userScore}`);
  console.log(`Opponent's score: ${compScore}`);
}
