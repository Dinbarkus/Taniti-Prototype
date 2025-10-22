const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('.primary-nav');

hamburger.addEventListener('click', () => {
  nav.classList.toggle('active');
});

document.addEventListener("DOMContentLoaded", () => {
  const calendarGrid = document.getElementById("calendar-grid");
  const monthYear = document.getElementById("month-year");
  const eventDetails = document.getElementById("event-details");
  const prevBtn = document.getElementById("prev-month");
  const nextBtn = document.getElementById("next-month");

  // === Sample event data for prototype ===
  const events = {
    "2025-10-21": "Cultural Dance Festival - Taniti Town Center",
    "2025-10-25": "Local Cuisine Fair - Harbor Plaza",
    "2025-10-30": "Coral Reef Cleanup - South Shore Beach"
  };

  let currentYear = new Date().getFullYear();
  let currentMonth = new Date().getMonth(); // 0-indexed

  // === Function to build calendar ===
  function buildCalendar(year, month) {
    calendarGrid.innerHTML = "";

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const monthName = new Date(year, month).toLocaleString("default", { month: "long" });

    // Update header text
    monthYear.textContent = `${monthName} ${year}`;

    // Fill leading blank spaces
    for (let i = 0; i < firstDay; i++) {
      const blank = document.createElement("div");
      blank.classList.add("day", "inactive");
      calendarGrid.appendChild(blank);
    }

    // Create day boxes
    for (let d = 1; d <= daysInMonth; d++) {
      const date = new Date(year, month, d);
      const dateString = date.toISOString().split("T")[0];
      const day = document.createElement("div");
      day.classList.add("day");
      day.textContent = d;

      // Highlight event days
      if (events[dateString]) {
        day.classList.add("event-day");
        day.addEventListener("click", () => {
          showEventDetails(monthName, d, events[dateString]);
        });
      } else {
        day.addEventListener("click", () => {
          showEventDetails(monthName, d, "No events scheduled for this day.");
        });
      }

      calendarGrid.appendChild(day);
    }
  }

  // === Function to update event details ===
  function showEventDetails(monthName, day, message) {
    eventDetails.innerHTML = `
      <h3>${monthName} ${day}</h3>
      <p>${message}</p>
    `;
  }

  // === Navigation buttons ===
  if (prevBtn && nextBtn) {
    prevBtn.addEventListener("click", () => {
      currentMonth--;
      if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
      }
      buildCalendar(currentYear, currentMonth);
    });

    nextBtn.addEventListener("click", () => {
      currentMonth++;
      if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
      }
      buildCalendar(currentYear, currentMonth);
    });
  }

  // === Initialize ===
  buildCalendar(currentYear, currentMonth);
});

// === FAQ ACCORDION ===
document.querySelectorAll('.faq-question').forEach(button => {
  button.addEventListener('click', () => {
    const faqItem = button.parentElement;
    faqItem.classList.toggle('active');
  });
});