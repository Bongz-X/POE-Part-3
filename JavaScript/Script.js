//Slideshow functionality
function showSlides(n) {
  let slides = document.getElementsByClassName("slide");
  let dot = document.getElementsByClassName("dot");

  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
    slides[i].classList.remove("fade");
  }
  for (let i = 0; i < dot.length; i++) {
    dot[i].classList.remove("active");
  }
  slides[slideIndex - 1].style.display = "block";
  slides[slideIndex - 1].classList.add("fade");
  dot[slideIndex - 1].classList.add("active");
}

let slideIndex = 1;
let clickcount = 0;

document.addEventListener("DOMContentLoaded", () => {
  showSlides(slideIndex);
});

//Arrow Navigation
function plusSlides(n) {
  showSlides((slideIndex += n));
  updateHeadings();
}

//Dot Navigation
function currentSlide(n) {
  slideIndex = n;
  showSlides(slideIndex);
  updateHeadings();
}

//Heading Logic
function updateHeadings() {
  const h1 = document.getElementById("title1");
  const h2 = document.getElementById("title2");

  if (!h1 || !h2) return;
  clickcount++;

  //Reset Cycle, slide 1
  if (clickcount === 1) {
    h1.classList.add("visible");
    h1.classList.remove("hidden");

    h2.classList.add("hidden");
    h2.classList.remove("visible");
  }

  //Click 1 & 2, no changes
  if (clickcount === 2) {
    h1.classList.add("hidden");
    h1.classList.remove("visible");

    h2.classList.add("visible");
    h2.classList.remove("hidden");
  }

  //Click 3, h1 fade out, h2 fade in
  if (clickcount === 3) {
    h1.classList.add("visible");
    h1.classList.remove("hidden");

    h2.classList.add("visible");
    h2.classList.remove("hidden");

    clickcount = 0;
  }
}

//Login Form Validation
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".Login-Form");
  const emailInput = document.getElementById("Email");
  const password = document.getElementById("Password");
  const errorElement = document.querySelector(".error");

  form.addEventListener("submit", (e) => {
    let messages = [];

    //Email Validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(emailInput.value.trim())) {
      messages.push("Please enter a valid email address.");
    }

    //Password validation
    const pwd = password.value.trim();

    if (pwd.length < 8) {
      messages.push("Password must be at least 8 characters long");
    }
    if (!/[A-Z]/.test(pwd)) {
      messages.push("Password must contain at least one uppercase letter");
    }
    if (!/[a-z]/.test(pwd)) {
      messages.push("Password must contain at least one lowercase letter");
    }
    if (!/[0-9]/.test(pwd)) {
      messages.push("Password must contain at least one number");
    }
    if (!/[!@#$%^&*]/.test(pwd)) {
      messages.push(
        "Password must contain at least one special character (!@#$%^&*)"
      );
    }

    //if errors exist, prevent form submission
    if (messages.length > 0) {
      e.preventDefault();
      errorElement.innerHTML = messages.join("<br>");
      errorElement.style.display = "block";
      errorElement.style.color = "red";
      errorElement.style.fontWeight = "bold";
      errorElement.style.marginBottom = "10px";
    } else {
      errorElement.style.display = "none";
    }
  });
});

//Message Form Validation
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".messageBoard form");
  const subject = document.getElementById("subject");
  const message = document.getElementById("eMessage");
  const errorElement = document.querySelector(".msg-error");
  const email = document.getElementById("Email");
  const phoneNo = document.getElementById("phoneNo");

  form.addEventListener("submit", (e) => {
    let errors = [];

    //Email Validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.value.trim())) {
      errors.push("Please enter a valid email address.");
    }

    //Phone Number Validation
    if (!/^\d{10}$/.test(phoneNo.value.trim())) {
      errors.push("Please enter a valid 10-digit phone number.");
    }

    //Subject Validation
    if (subject.value.trim().length < 5) {
      errors.push("Subject must be at least 5 characters long.");
    }

    //Message Validation
    if (message.value.trim().length < 10) {
      errors.push("Message must be at least 10 characters long.");
    }

    //if errors exist, prevent form submission
    if (errors.length > 0) {
      e.preventDefault();
      errorElement.innerHTML = errors.join("<br>");
      errorElement.style.display = "block";
      errorElement.style.color = "red";
      errorElement.style.fontWeight = "bold";
      errorElement.style.marginBottom = "10px";
    } else {
      errorElement.style.display = "none";
    }
  });
});

//Search Functionality
document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("findPhotographerInput");
  const button = document.getElementById("findPhotographerBttn");
  const message = document.getElementById("findPhotographerMsg");

  const validSpecialties = ["landscape", "portrait", "people", "architecture"];

  function performPhotographerSearch() {
    const query = input.value.trim().toLowerCase();

    if (!query) return;
    const match = validSpecialties.some((term) => query === term);
    if (match) {
      window.location.href = "Profile.html";
    } else {
      message.textContent = "No photographers found for that search";
      message.style.display = "block";
    }
  }
  button.addEventListener("click", performPhotographerSearch);

  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      performPhotographerSearch();
    }
  });
});

//Booking Form Validations
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getbyElementId("bookingForm");
  const fullNameInput = document.getbyElementId("fullName");
  const emailInput = document.getbyElementId("email");
  const bdateInput = document.getbyElementId("bdate");
  const successMessage = document.getbyElementId("successMessage");

  //Min. Date to today
  const today = new Date().toISOString().split("T")[0];
  bdateInput.setAttribute("min", today);

  //Validation Functions
  function validateFullName(name) {
    const fullName = fullNameInput.value.trim();
    const fullNameError = document.getbyElementId("fullNameError");

    if (fullName.length < 3) {
      showeEror(fullNameError, "Enter a valid full name (min. 3 characters).");
      return false;
    } else if (!/^[a-zA-Z\s]+$/.test(fullName)) {
      showError(
        fullNameInput,
        fullNameError,
        "Full name can only contain letters and spaces."
      );
      return false;
    } else {
      showSucess(fullNameInput, fullNameError);
      return true;
    }
  }
  function validateEmail(email) {
    const emailValue = emailInput.value.trim();
    const emailError = document.getbyElementId("emailError");
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(emailValue)) {
      showError(emailInput, emailError, "Please enter a valid email address.");
      return false;
    } else {
      showSucess(emailInput, emailError);
      return true;
    }
  }
  function validateBookingDate(date) {
    const selectedDate = new Date(bdateInput.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const bdateError = document.getbyElementId("bdateError");

    if (!bdateInput.value) {
      showError(bdateInput, bdateError, "Please select a booking date.");
      return false;
    } else {
      showSucess(bdateInput, bdateError);
      return true;
    }
  }
  //helpter functions to show error/sucess
  function showError(input, errorElement, message) {
    errorElement.textContent = message;
    errorElement.style.display = "block";
    input.classList.add("input-error");
    input.classList.remove("input-success");
  }
  function showSucess(input, errorElement) {
    errorElement.style.display = "none";
    input.classList.remove("input-error");
    input.classList.add("input-success");
  }

  //Real-time validation
  fullNameInput.addEventListener("blur", validateFullName);
  emailInput.addEventListener("blur", validateEmail);
  bdateInput.addEventListener("change", validateDate);

  //Form submission
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    //Validate all fields
    const isFullNameValid = validateFullName();
    const isEmailValid = validateEmail();
    const isBdateValid = validatDate();

    //If all valid, submit form
    if (isFullNameValid && isEmailValid && isBdateValid) {
      console.log("Form submitted with:", {
        fullName: fullNameInput,
        email: emailInput,
        bookingDate: bdateInput,
      });

      //show success message
      successMessage.style.display = "block";

      //Reset form
      setTimeout(function () {
        form.reset();
        successMessage.style.display = "none";

        //Remove success classes
        const successInputs = form.querySelectorAll("input");
        successInputs.forEach((input) => {
          input.classList.remove("input-success");
        });
      }, 3000);
    } else {
      const firstError = form.querySelector(".input-error");
      if (firstError) {
        firstError.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  });

  // Clear error when user starts typing in a field
  const inputs = form.querySelectorAll("input");
  inputs.forEach((input) => {
    input.addEventListener("input", function () {
      const errorElement = document.getElementById(input.id + "Error");
      if (errorElement.style.display !== "none") {
        errorElement.style.display = "none";
        input.classList.remove("input-error");
      }
    });
  });
});
