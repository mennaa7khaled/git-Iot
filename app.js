const readline = require('readline');
const fs = require('fs').promises;
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
const getUserInput = (question) => {
  return new Promise((resolve) => {
    rl.question(question, (input) => {
      const trimmedInput = input.trim();
      if (trimmedInput.length === 0) {
        console.log("Error: Input cannot be empty or whitespace!");
        resolve(getUserInput(question)); 
      } else {
        resolve(trimmedInput); 
      }
    });
  });
};
const writeFileWithThen = (data) => {
  fs.appendFile('new_data.txt', data + '\n')
    .then(() => {
      console.log("Success: Data was written using .then().");
    })
    .catch((error) => {
      console.error("Error: Failed to write data using .then()", error.message);
    });
};
const writeFileWithAsync = async (data) => {
  try {
    await fs.appendFile('new_data.txt', data + '\n');
    console.log("Success: Data was written using async/await.");
  } catch (error) {
    console.error("Error: Failed to write data using async/await", error.message);
  }
};
const main = async () => {
  try {
    const userInput = await getUserInput("Please enter something!");
    const choice = await getUserInput("write 'then' for .then() or 'async' for async/await: ");

    if (choice.toLowerCase() === 'then') {
      writeFileWithThen(userInput);
    } else if (choice.toLowerCase() === 'async') {
      await writeFileWithAsync(userInput);
    } else {
      console.log("Error, Please write 'then' or 'async'");
    }
  } finally {
    rl.close(); 
  }
};
main();
