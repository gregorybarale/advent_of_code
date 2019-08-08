const utils = require("./utils");

const input = 9;

// Initiate two circular link with the two first qualityscore
const circularLink1 = new utils.CircularLinkList(3);
const circularLink2 = new utils.CircularLinkList(3);
circularLink1.insertAfterLast(7);
circularLink2.insertAfterLast(7);
circularLink2.goNext();

let newRecipes = 0;

let numberRecipes1 = 0;
let numberRecipes2 = 0;

while (newRecipes < input) {
  const sum = circularLink1.current.data + circularLink2.current.data;
  if (sum > 9) {
    const [firstNew, secondNew] = sum
      .toString()
      .split("")
      .map(s => Number.parseInt(s, 10));
    circularLink1.insertAfterLast(firstNew);
    circularLink1.insertAfterLast(secondNew);
    circularLink2.insertAfterLast(firstNew);
    circularLink2.insertAfterLast(secondNew);
    numberRecipes1++;
    numberRecipes2++;
  } else {
    circularLink1.insertAfterLast(sum);
    circularLink2.insertAfterLast(sum);
    numberRecipes1++;
  }
  const move1 = circularLink1.current.data + 1,
    move2 = circularLink2.current.data + 1;
  for (let i = 0; i < move1; i++) {
    circularLink1.goNext();
  }
  for (let i = 0; i < move2; i++) {
    circularLink2.goNext();
  }
  console.log(`Turn: ${newRecipes}`);
  console.lo
  console.log(circularLink1.getListLog());
  console.log(circularLink2.getListLog());
  newRecipes++;
}
