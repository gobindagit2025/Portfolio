// ─────────────────────────────────────────
// NAVBAR SCROLL EFFECT
// ─────────────────────────────────────────
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 50);
});


// ─────────────────────────────────────────
// THEME TOGGLE (WITH LOCAL STORAGE)
// ─────────────────────────────────────────
const toggleBtn = document.getElementById("theme-toggle");
const html = document.documentElement;
const icon = document.getElementById("theme-icon");

// Load saved theme
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  html.setAttribute("data-theme", savedTheme);
  icon.className = savedTheme === "dark" ? "fas fa-moon" : "fas fa-sun";
}

toggleBtn.addEventListener("click", () => {
  const current = html.getAttribute("data-theme");
  const newTheme = current === "dark" ? "light" : "dark";

  html.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);

  icon.className = newTheme === "dark" ? "fas fa-moon" : "fas fa-sun";
});


// ─────────────────────────────────────────
// MOBILE MENU
// ─────────────────────────────────────────
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobile-menu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  mobileMenu.classList.toggle("open");
});

// Close menu on link click
document.querySelectorAll(".mobile-menu a").forEach(link => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    mobileMenu.classList.remove("open");
  });
});


// ─────────────────────────────────────────
// SCROLL REVEAL ANIMATION
// ─────────────────────────────────────────
const reveals = document.querySelectorAll(".reveal");

function revealElements() {
  reveals.forEach((el, i) => {
    const top = el.getBoundingClientRect().top;

    if (top < window.innerHeight - 80) {
      setTimeout(() => {
        el.classList.add("visible");
      }, i * 80);
    }
  });
}

window.addEventListener("scroll", revealElements);
window.addEventListener("load", revealElements);


// ─────────────────────────────────────────
// SKILL BAR ANIMATION (RUN ONCE)
// ─────────────────────────────────────────
let skillAnimated = false;

function animateSkills() {
  if (skillAnimated) return;

  const section = document.getElementById("skills");
  if (!section) return;

  const top = section.getBoundingClientRect().top;

  if (top < window.innerHeight - 100) {
    document.querySelectorAll(".skill-fill").forEach(el => {
      el.style.width = el.dataset.width + "%";
    });
    skillAnimated = true;
  }
}

window.addEventListener("scroll", animateSkills);


// ─────────────────────────────────────────
// SCROLL TO TOP BUTTON
// ─────────────────────────────────────────
const scrollBtn = document.getElementById("scroll-top");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    scrollBtn.classList.add("visible");
  } else {
    scrollBtn.classList.remove("visible");
  }
});

scrollBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});


// ─────────────────────────────────────────
// CONTACT FORM VALIDATION
// ─────────────────────────────────────────
const form = document.getElementById("contact-form");

if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    let valid = true;

    // Inputs
    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const subject = document.getElementById("subject");
    const message = document.getElementById("message");

    // Error elements
    const nameErr = document.getElementById("name-error");
    const emailErr = document.getElementById("email-error");
    const subjectErr = document.getElementById("subject-error");
    const messageErr = document.getElementById("message-error");

    // Reset
    [name, email, subject, message].forEach(input => input.classList.remove("error"));
    [nameErr, emailErr, subjectErr, messageErr].forEach(err => err.textContent = "");

    // Name
    if (name.value.trim() === "") {
      name.classList.add("error");
      nameErr.textContent = "Name is required";
      valid = false;
    }

    // Email
    if (!/^\S+@\S+\.\S+$/.test(email.value)) {
      email.classList.add("error");
      emailErr.textContent = "Enter a valid email";
      valid = false;
    }

    // Subject
    if (subject.value.trim() === "") {
      subject.classList.add("error");
      subjectErr.textContent = "Subject is required";
      valid = false;
    }

    // Message
    if (message.value.trim().length < 10) {
      message.classList.add("error");
      messageErr.textContent = "Message must be at least 10 characters";
      valid = false;
    }

    // Success
    if (valid) {
      document.getElementById("form-success").classList.remove("hidden");
      form.reset();
    }
  });
}


// ─────────────────────────────────────────
// HERO CANVAS PARTICLE ANIMATION
// ─────────────────────────────────────────
const canvas = document.getElementById("hero-canvas");

if (canvas) {
  const ctx = canvas.getContext("2d");

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  let particles = [];

  for (let i = 0; i < 60; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      dx: (Math.random() - 0.5) * 0.5,
      dy: (Math.random() - 0.5) * 0.5
    });
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
      p.x += p.dx;
      p.y += p.dy;

      if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.dy *= -1;

      ctx.fillStyle = "#7cffd4";
      ctx.fillRect(p.x, p.y, 2, 2);
    });

    requestAnimationFrame(animate);
  }

  animate();
}