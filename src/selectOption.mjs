async function selectOption(rl, options) {
  const menu = options
    .map((option, index) => `${index + 1}. ${option}`)
    .join("\n");

  const selected = await rl.question(menu + "\n");
  return validateOption(selected, options.length + 1);
}

function validateOption(input, size) {
  const optionNumber = parseInt(input);
  if (isNaN(optionNumber) || optionNumber < 1 || optionNumber > size) {
    return false;
  }
  return optionNumber;
}

export default selectOption;
