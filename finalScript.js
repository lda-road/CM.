window.onload = () => window.scrollTo(0, 0);

document.querySelector(".listen-btn").addEventListener("click", (e) => {
  e.preventDefault();
  document.getElementById("tracklist").scrollIntoView({ behavior: "smooth" });
});

const overlay = document.getElementById("overlay");
const loginBtn = document.getElementById("loginBtn");
const errorMsg = document.getElementById("errorMsg");

loginBtn.addEventListener("click", () => {
  const user = document.getElementById("username").value.trim();
  const pass = document.getElementById("password").value.trim();

  if (user === "joji" && pass === "smithereens") {
    overlay.classList.add("unlock-animation");
    setTimeout(() => {
      overlay.classList.add("hidden");
      document.body.style.overflow = "auto";
    }, 1000);
  } else {
    errorMsg.textContent = "Wrong password or username. Try again.";
  }
});

const sidebar = document.getElementById("aboutSidebar");
const toggleBtn = document.getElementById("toggleSidebar");
const closeBtn = document.getElementById("closeSidebar");

toggleBtn.addEventListener("click", () => {
  sidebar.classList.add("active");
});

closeBtn.addEventListener("click", () => {
  sidebar.classList.remove("active");
});