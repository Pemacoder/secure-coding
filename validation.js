document.getElementById("signupForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const fullName = document.getElementById("fullname").value;
  const email = document.getElementById("email").value;
  const age = document.getElementById("age").value;
  const gender = document.getElementById("gender").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  clearErrors();
  const [isNameValid, name, nameError] = validateFullName(fullName);
  console.log(gender);
  if (!isNameValid) {
    document.getElementById("nameError").innerText = nameError;
    document.getElementById("nameError").style.display = "block";
  }
  const [isEmailValid, validEmail, emailError] = validateEmail(email);
  if (!isEmailValid) {
    document.getElementById("emailError").innerText = emailError;
    document.getElementById("emailError").style.display = "block";
  }
  const [isAgeValid, validAge, ageError] = validateAge(age);
  if (!isAgeValid) {
    document.getElementById("ageError").innerText = ageError;
    document.getElementById("ageError").style.display = "block";
  }
  const [isGenderValid, validGender, genderError] = validateGender(gender);
  if (!isGenderValid) {
    document.getElementById("genderError").innerText = genderError;
    document.getElementById("genderError").style.display = "block";
  }
  const [isPasswordValid, validPassword, passwordError] = validatePassword(
    password,
    confirmPassword
  );
  if (!isPasswordValid) {
    document.getElementById("passwordError").innerText = passwordError;
    document.getElementById("passwordError").style.display = "block";
  }
  const [isConfirmPasswordValid, validConfirmPassword, confirmPasswordError] =
    validateConfirmPassword(password, confirmPassword);
  if (!isConfirmPasswordValid) {
    document.getElementById("confirmPasswordError").innerText =
      confirmPasswordError;
    document.getElementById("confirmPasswordError").style.display = "block";
  }
  if (
    !isNameValid ||
    !isEmailValid ||
    !isAgeValid ||
    !isGenderValid ||
    !isPasswordValid ||
    !isConfirmPasswordValid
  ) {
    return;
  }
  document.getElementById("successMessage").innerText =
    "Form Submitted Successfully";
  document.getElementById("successMessage").style.display = "block";
});

const validateFullName = (fullName) => {
  if (fullName === "") {
    return [false, fullName, "Name cannot be empty"];
  }
  if (fullName.length < 4 || fullName.length > 50) {
    return [false, fullName, "Name should be between 4 and 50 characters"];
  }
  const pattern = `^[a-zA-Z]([a-zA-Z.'-]{2,48})[a-zA-Z]$`;

  if (!fullName.match(pattern)) {
    return [
      false,
      fullName,
      "Name should contain only alphabets except for fullstop, hyphen, apostrophe and spaces between the alphabets",
    ];
  }
  return [true, fullName.trim(), ""];
};

const validateEmail = (email) => {
  const pattern = `^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$`;
  if (email === "") {
    return [false, email, "Email cannot be empty"];
  }
  if (!email.match(pattern)) {
    return [
      false,
      email.trim(),
      "Invalid email address. Enter it in test1-2@gmail.com format",
    ];
  }
  return [true, email.trim(), ""];
};

const validateAge = (age) => {
  //check empty age number
  if (age === undefined || age === null || isNaN(age)) {
    return [false, age, "Age should be a number and it cannot be empty"];
  }
  if (age === 0) {
    return [false, age, "Age cannot be 0"];
  }
  return [true, age.trim(), ""];
};

const validateGender = (gender) => {
  if (["male", "female", "other"].includes(gender.toLowerCase())) {
    return [true, gender.trim(), ""];
  }
  return [false, gender.trim(), "Not a valid gender"];
};

const validatePassword = (password, confirmPassword) => {
  if (password === "") {
    return [false, password, "Password cannot be empty"];
  }
  //   const hasNumber = "/[d/]".test(password);
  //   const hasUpper = "/[A-Z]/".test(password);
  //   const hasLower = "/[a-z]/".test(password);
  //   const hasSpecial = "/[W_]/".test(password);
  //   if (!hasNumber || !hasUpper || !hasLower || !hasSpecial) {
  //     return [
  //       false,
  //       password.trim(),
  //       "Password should contain atleast one number, one uppercase and lowercase letterand one special character",
  //     ];
  //   }
  //   if (!(password.length <= 8 || password.length >= 20)) {
  //     return [
  //       false,
  //       password.trim(),
  //       "Password should be between 8 and 20 characters",
  //     ];
  //   }
  const pattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,20}$/;
  if (!pattern.test(password)) {
    return [
      false,
      password.trim(),
      "Password should contain atleast one number, one uppercase and lowercase letter and one special character between 8 and 20 characters",
    ];
  }
  return [true, password.trim(), ""];
};
const validateConfirmPassword = (password, confirmPassword) => {
  if (confirmPassword === "") {
    return [false, confirmPassword, "Confirm Password cannot be empty"];
  }
  if (password !== confirmPassword) {
    return [false, password, "Confirm Password do not match with password"];
  }
  return [true, confirmPassword.trim(), ""];
};
const clearErrors = () => {
  const errorElements = document.querySelectorAll(".error");
  errorElements.forEach((element) => {
    element.style.display = "none";
  });
  document.getElementById("successMessage").style.display = "none";
};
