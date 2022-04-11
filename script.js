//The function that prompts the user for the length of the password.
function lengthPrompt() {
  var length = window.prompt("Please pick a length between 8 and 128.");

  //Validation for an empty answer.
  //I chose to have it defualt to 8.
  if(length === "" || length === null) {
    window.alert("The size has defualted to 8.")
    return 8;
  }
  
  length = parseInt(length);
  
  //I chose to respond with a recursive function call when the length is too small or big
  if (length < 8) {
    return lengthPrompt();
  } else if(length > 128) {
    return lengthPrompt();
  }

  return length;
}

//The function that prompts the user for the types of characters they would like to use.
function charPrompt() {

  //I load the result from for confirm alerts into an array.
  var selections = [
    window.confirm("Do you want lowercase characters?"),
    window.confirm("Do you want uppercase characters?"),
    window.confirm("Do you want numeric characters?"),
    window.confirm("Do you want special characters?")
  ];

  //I count how many prompts are false, and if there are too many falses, I prompt the user to pick at least one.
  //Validation is again recursive.
  var falseCount = 0;
  for (var x = 0; x < selections.length; x++) {
    if(!selections[x]) {
      falseCount++
    }
  }
  if (falseCount === 4) {
    window.alert("Please select at least one character type.")
    return charPrompt();
  }

  return selections;
}

//The function that interactions with the DOM, call the the generatePassword function, and ultimately writes the password to the DOM.
function writePassword() {
  var passwordText = document.querySelector("#password");
  passwordText.value = "Generating . . ."

  //I chose to have the functions return directly into the call of the function rather than returning to variables and passing those. I find it a lot cleaner.
  var password = generatePassword(
    lengthPrompt(),
    charPrompt()
  );

  passwordText.value = password;
}

//The function that actually generates the password.
function generatePassword(length, selections) {
  //If a character type is chosen, its added to the charTypes array.
  var charTypes = []
  if(selections[0]) {
    charTypes.push("low")
  }
  if(selections[1]) {
    charTypes.push("up")
  }
  if(selections[2]) {
    charTypes.push("num")
  }
  if(selections[3]) {
    charTypes.push("spec")
  }

  var genPass = "";

  //A for loop then iterates as many times as the length paramter.
  for(var x = 0; x < length; x++) {
    //Each pass it picks a random character type from the list of wanted types.
    switch(charTypes[Math.floor(Math.random() * charTypes.length)]) {
      //When a type is chosen, a random character is then chose from the list of characters of that type and added to the password.
      case "low":
        genPass += letters.charAt(Math.floor(Math.random() * letters.length));
      break;
      case "up":
        genPass += letters.charAt(Math.floor(Math.random() * letters.length)).toUpperCase();
      break;
      case "num":
        genPass += nums.charAt(Math.floor(Math.random() * nums.length))
      break;
      case "spec":
        genPass += spec.charAt(Math.floor(Math.random() * spec.length))
      break;
    }
  }

  return genPass;
}

//The strings containing the characters of each type.
var letters = "abcdefghijklmnopqrstuvwxyz";
var nums = "0123456789";
var spec = "`~!@#$%^&*()-_=+[]{}\\|;:'\",<.>/?";

// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);