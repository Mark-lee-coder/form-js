const fs = require("fs");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;

function submitForm() {
  var fname = document.getElementById("fname");
  var sname = document.getElementById("sname");
  var email = document.getElementById("email");
  var phone = document.getElementById("phone");
  var company = document.getElementById("company");

  var fnameError = document.getElementById("fname-error");
  var snameError = document.getElementById("sname-error");
  var emailError = document.getElementById("email-error");
  var phoneError = document.getElementById("phone-error");
  var companyError = document.getElementById("company-error");

  var errorMessage = document.getElementById("error-message");
  var thankYouMessage = document.getElementById("thank-you");

  // Reset previous error messages
  fnameError.textContent = "";
  snameError.textContent = "";
  emailError.textContent = "";
  phoneError.textContent = "";
  companyError.textContent = "";

  // Check if all fields are filled correctly
  if (
    fname.checkValidity() &&
    sname.checkValidity() &&
    email.checkValidity() &&
    phone.checkValidity() &&
    company.checkValidity()
  ) {
    // Hide the error message
    errorMessage.style.display = "none";

    // Display the thank you message
    thankYouMessage.style.display = "block";

    // You can also submit the form to a server here if needed
    // Example: document.getElementById('myForm').submit();
    // Alert message
    alert("Thank you for submitting the form!");
    submitData(fname, sname, email, phone, company);
    clearForm();
  } else {
    // Display the error message
    errorMessage.style.display = "block";

    // Check and display specific error messages for each field
    if (!fname.checkValidity()) {
      fnameError.textContent = "Please enter a valid first name.";
    }

    if (!sname.checkValidity()) {
      snameError.textContent = "Please enter a valid surname.";
    }

    if (!email.checkValidity()) {
      emailError.textContent = "Please enter a valid email address.";
    }

    if (!phone.checkValidity()) {
      phoneError.textContent = "Please enter a valid 10-digit phone number.";
    }

    if (!company.checkValidity()) {
      companyError.textContent = "Please enter a valid company name.";
    }

    // Hide the thank you message
    thankYouMessage.style.display = "none";
  }
}

// Image carousel functionality
const carousel = document.getElementById("carousel");
const images = carousel.querySelectorAll("img");

function setRandomBackground() {
  const randomIndex = Math.floor(Math.random() * images.length);
  const randomImage = images[randomIndex];
  document.body.style.backgroundImage = `url('${randomImage.src}')`;
}

setRandomBackground();

setInterval(setRandomBackground, 5000);

function clearForm() {
  document.getElementById("myForm").reset();
}

function submitData(fname, lname, email, phoneNum, company) {
  // Define the CSV writer
  const csvWriter = createCsvWriter({
    path: "C:\\Users\\leonw\\OneDrive\\Desktop\\Data.csv",
    header: [
      { id: "fname", title: "First Name" },
      { id: "lname", title: "Last Name" },
      { id: "email ", title: "email" },
      { id: "phoneNum ", title: "Phone Number" },
      { id: "company ", title: "Company" },
    ],
    append: true, // Set this to true to append data to an existing file
  });

  let dataToAppend = {
    fname: fname,
    lname: lname,
    email: email,
    phoneNum: phoneNum,
    company: company,
  };

  // Append the data to the CSV file
  csvWriter
    .writeRecords(dataToAppend)
    .then(() => {
      console.log("Data appended to CSV file successfully");
    })
    .catch((err) => {
      console.error("Error appending data to CSV file:", err);
    });
}

var encodedUri = encodeURI(csv);
