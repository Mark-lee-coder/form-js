function submitForm() {
  var fname = document.getElementById("fname");
  var sname = document.getElementById("sname");
  var email = document.getElementById("email");
  var phone = document.getElementById("phone");
  var company = document.getElementById("company");
  var application = document.getElementById("application");

  var fnameError = document.getElementById("fname-error");
  var snameError = document.getElementById("sname-error");
  var emailError = document.getElementById("email-error");
  var phoneError = document.getElementById("phone-error");
  var companyError = document.getElementById("company-error");
  var applicationError = document.getElementById("application-error");

  var errorMessage = document.getElementById("error-message");
  var thankYouMessage = document.getElementById("thank-you");

  // Reset previous error messages
  fnameError.textContent = "";
  snameError.textContent = "";
  emailError.textContent = "";
  phoneError.textContent = "";
  companyError.textContent = "";
  applicationError.textContent = "";

  // Check if all fields are filled correctly
  if (
    fname.checkValidity() &&
    sname.checkValidity() &&
    email.checkValidity() &&
    phone.checkValidity() &&
    company.checkValidity() &&
    application.checkValidity()
  ) {
    // Hide the error message
    errorMessage.style.display = "none";

    // Display the thank you message
    thankYouMessage.style.display = "block";

    // You can also submit the form to a server here if needed
    // Example: document.getElementById('myForm').submit();
    // Alert message
    alert("Thank you for submitting the form!");
    submitData(
      fname.value,
      sname.value,
      email.value,
      phone.value,
      company.value,
      application.value
    );
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

    if (!application.checkValidity()) {
      applicationError.textContent = "Please enter a valid application name.";
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

function submitData(fname, lname, email, phoneNum, company, application) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      fname: fname,
      lname: lname,
      phoneNum: phoneNum,
      email: email,
      company: company,
      application: application,
    }),
  };

  fetch("http://localhost:3000/write-to-csv", requestOptions)
    .then((response) => response.json()) // Parse the response as JSON
    .then((data) => {
      console.log(data); // Handle the response data
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
