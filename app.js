import init, { add_two_numbers } from "./pkg/planning_poker.js";

const run = async () => {
  await init();
  console.log(add_two_numbers(1, 2));
};

run();
