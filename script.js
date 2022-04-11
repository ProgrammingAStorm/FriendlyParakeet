

function lengthPrompt() {
  var length = window.prompt("Please pick a length between 8 and 128.");

  if(length === "" || length === null) {
    window.alert("The size has defualted to 8.")
    return 8;
  }
  
  length = parseInt(length);
  
  if (length < 8) {
    return lengthPrompt();
  } else if(length > 128) {
    return lengthPrompt();
  }

  return length;
}

function charPrompt() {
  var selections = [
    window.confirm("Do you want lowercase characters?"),
    window.confirm("Do you want uppercase characters?"),
    window.confirm("Do you want numeric characters?"),
    window.confirm("Do you want special characters?")
  ];

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

function writePassword() {
  var passwordText = document.querySelector("#password");
  passwordText.value = "Generating . . ."

  var password = generatePassword(
    lengthPrompt(),
    charPrompt()
  );

  passwordText.value = password;
}

function generatePassword(length, selections) {
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

  for(var x = 0; x < length; x++) {
    switch(charTypes[Math.floor(Math.random() * charTypes.length)]) {
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

var letters = "abcdefghijklmnopqrstuvwxyz";
var nums = "0123456789";
var spec = "`~!@#$%^&*()-_=+[]{}\\|;:'\",<.>/?";

// Get references to the #generate element
var generateBtn = document.querySelector("#generate");



// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);