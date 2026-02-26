import validator from "validator";

function checkName(anyName) {
  let message = null;
  if (anyName == "") {
    message = "";
  } else if (validator.isNumeric(anyName)) {
    message = "Field Must Be Character (a-z)";
  } else if (anyName.length <= 2) {
    message = "Field must be at least 2 character";
  } else {
    message = "";
  }
  console.info(message);
  return message;
}



function checkPhone(anyPhone) {
  let message = null;
  if (anyPhone == "") {
    message = "";
  } else if (!validator.isNumeric(anyPhone)) {
    message = "Field must be number";
  } else if (anyPhone.length < 9 || anyPhone.length > 13) {
    message = "Field must be 9 or 13 number";
  } else {
    message = "";
  }
  return message;
}

function checkEmail(anyName) {
  let message = null;
  if (anyName == "") {
    message = "";
  } else if (!validator.isEmail(anyName)) {
    message = "Invalid Email";
  } else {
    message = "";
  }
  return message;
}

function checkUser(anyName) {
  var message = null;
  if (anyName == "") {
    message = "";
  } else if (anyName.length < 6) {
    message = "Field must be at least 6 ";
  } else {
    message = "";
  }
  return message;
}

function changeAge(anyDate) {
  let message = null;
  const yearRequire = anyDate.split("-")[0];
  const date = new Date();
  const currentYear = date.getFullYear();
  const age = currentYear - yearRequire;

  if (anyDate == "") {
    message = "";
  } else if (age < 18) {
    message = "Your age is under 18";
  } else {
    message = "";
  }
  return message;
}


export default {
  checkEmail,
  checkName,
  checkPhone,
  checkUser,
  changeAge
}
