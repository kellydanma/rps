const prompt = require("prompt-sync")();

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

function printUserPokemon(pokemon) {
  switch (pokemon) {
    case 1:
      console.log("\x1b[31m%s\x1b[0m%s", "🔥 Charmander", ", I choose you!");
      break;
    case 2:
      console.log("\x1b[34m%s\x1b[0m%s", "💦 Squirtle", ", I choose you!");
      break;
    case 3:
      console.log("\x1b[32m%s\x1b[0m%s", "🌱 Bulbasaur", ", I choose you!");
  }
}

function printRivalPokemon(pokemon) {
  switch (pokemon) {
    case 1:
      console.log("%s\x1b[31m%s\x1b[0m", "Your rival used ", "Charmander 🔥");
      break;
    case 2:
      console.log("%s\x1b[34m%s\x1b[0m", "Your rival used ", "Squirtle 💦");
      break;
    case 3:
      console.log("%s\x1b[32m%s\x1b[0m", "Your rival used ", "Bulbasaur 🌱");
  }
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

function printBattle(user, computer, result) {
  printUserPokemon(user);
  printRivalPokemon(computer);
  console.log(scoreString(result[0], result[1]));
}

function battle() {
  console.log("Welcome, trainer!");
  let userScore = 0,
    compScore = 0;
  for (let i = 0; i < 5; i++) {
    console.log(`\nRound ${i + 1} 🏁`);
    let user = parseInt(
      prompt(
        "Choose your pokemon - 1: Charmander, 2: Squirtle, 3: Bulbasaur ... "
      )
    );
    comp = randomPlay();
    result = play(user, comp);
    userScore += result[0];
    compScore += result[1];
    printBattle(user, comp, result);
  }
  console.log("\n... and the results are in!");
  console.log(`Your score: ${userScore}`);
  console.log(`Rival's score: ${compScore}`);
}

battle();
