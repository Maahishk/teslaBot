// teslaBot.js

function turnRight(currentDirection) {
  const directions = ["North", "East", "South", "West"];
  let currentIndex = directions.indexOf(currentDirection);
  currentIndex = (currentIndex + 1) % 4;
  return directions[currentIndex];
}

function turnLeft(currentDirection) {
  const directions = ["North", "West", "South", "East"];
  let currentIndex = directions.indexOf(currentDirection);
  currentIndex = (currentIndex + 1) % 4;
  return directions[currentIndex];
}

function walkStraight(currentDirection, currentX, currentY, distance) {
  switch (currentDirection) {
    case "North":
      return { x: currentX, y: currentY + distance };
    case "East":
      return { x: currentX + distance, y: currentY };
    case "South":
      return { x: currentX, y: currentY - distance };
    case "West":
      return { x: currentX - distance, y: currentY };
    default:
      return { x: currentX, y: currentY };
  }
}
//main function

function teslaBotWalk(walkingBot) {
  let x = 0,
    y = 0;
  let direction = "North";

  for (let i = 0; i < walkingBot.length; i++) {
    let command = walkingBot[i];

    switch (command) {
      case "R":
        direction = turnRight(direction);
        break;
      case "L":
        direction = turnLeft(direction);
        break;
      default:
        if (command === "W") {
          let distance = parseInt(walkingBot.slice(i + 1));

          //console.log(command, i);
          ({ x, y } = walkStraight(direction, x, y, distance));
        }
        break;
    }
  }

  console.log(`X: ${x} Y: ${y} Direction: ${direction}`);
}

// Get the walking code from the command line argument
const walkingBot = process.argv[2];

// Check if a walking code is provided
if (walkingBot) {
  teslaBotWalk(walkingBot);
} else {
  console.log("Usage: node teslaBot.js <walking_code>");
}
