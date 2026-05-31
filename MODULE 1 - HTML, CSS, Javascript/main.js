console.log("Welcome to the Community Portal");

window.onload = function () {
  alert("Page loaded successfully");
  loadPreference();
  fetchEvents();
};

let formStarted = false;

document.addEventListener("input", function () {
  formStarted = true;
});

window.onbeforeunload = function () {
  if (formStarted) {
    return "You have unfinished form changes.";
  }
};

class Event {
  constructor(name, date, category, location, seats) {
    this.name = name;
    this.date = date;
    this.category = category;
    this.location = location;
    this.seats = seats;
  }
}

Event.prototype.checkAvailability = function () {
  return this.seats > 0;
};

let events = [
  new Event("Music Festival", "2026-06-20", "music", "Town Hall", 5),
  new Event("Sports Day", "2026-06-25", "sports", "Community Ground", 4),
  new Event("Art Workshop", "2026-07-01", "workshop", "Art Center", 3)
];

console.log(Object.entries(events[0]));

function addEvent(name, date, category, location, seats) {
  events.push(new Event(name, date, category, location, seats));
}

addEvent("Baking Workshop", "2026-07-05", "workshop", "Community Kitchen", 6);

function createRegistrationCounter() {
  let total = 0;

  return function () {
    total++;
    console.log("Total registrations:", total);
  };
}

const countRegistration = createRegistrationCounter();

const eventList = document.getElementById("eventList");
const categoryFilter = document.getElementById("categoryFilter");
const searchBox = document.getElementById("searchBox");

function displayEvents(category = "all", searchText = "") {
  eventList.innerHTML = "";

  let clonedEvents = [...events];

  let filteredEvents = clonedEvents.filter(function (event) {
    return category === "all" || event.category === category;
  });

  filteredEvents = filteredEvents.filter(function (event) {
    return event.name.toLowerCase().includes(searchText.toLowerCase());
  });

  const formattedNames = filteredEvents.map(function (event) {
    return "Workshop on " + event.name;
  });

  console.log(formattedNames);

  filteredEvents.forEach(function (event) {
    if (event.checkAvailability()) {
      const card = document.createElement("div");
      card.className = "eventCard";

      const { name, date, category, location, seats } = event;

      card.innerHTML = `
        <h3>${name}</h3>
        <p>Date: ${date}</p>
        <p>Category: ${category}</p>
        <p>Location: ${location}</p>
        <p>Seats Available: ${seats}</p>
        <button onclick="registerUser('${name}')">Register</button>
      `;

      eventList.appendChild(card);
    }
  });
}

function registerUser(eventName) {
  try {
    const selectedEvent = events.find(function (event) {
      return event.name === eventName;
    });

    if (selectedEvent && selectedEvent.seats > 0) {
      selectedEvent.seats--;
      countRegistration();
      alert("Registered successfully for " + selectedEvent.name);
      displayEvents(categoryFilter.value, searchBox.value);
    } else {
      throw new Error("No seats available");
    }
  } catch (error) {
    console.log("Registration error:", error.message);
  }
}

function filterEventsByCategory(category, callback) {
  const filtered = events.filter(function (event) {
    return category === "all" || event.category === category;
  });

  callback(filtered);
}

categoryFilter.onchange = function () {
  filterEventsByCategory(categoryFilter.value, function () {
    displayEvents(categoryFilter.value, searchBox.value);
  });
};

searchBox.addEventListener("keydown", function () {
  setTimeout(function () {
    displayEvents(categoryFilter.value, searchBox.value);
  }, 100);
});

document.getElementById("registerForm").addEventListener("submit", function (event) {
  event.preventDefault();

  const form = event.target;
  const name = form.elements["name"].value;
  const email = form.elements["email"].value;
  const selectedEvent = form.elements["selectedEvent"].value;

  console.log("Submitting form...");
  console.log("Name:", name);
  console.log("Email:", email);
  console.log("Event:", selectedEvent);

  if (name === "" || email === "" || selectedEvent === "") {
    document.getElementById("message").innerText = "Please fill all fields.";
  } else {
    submitRegistration({ name, email, selectedEvent });
  }
});

function submitRegistration(userData) {
  document.getElementById("message").innerText = "Submitting...";

  setTimeout(function () {
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        "Content-type": "application/json"
      }
    })
    .then(function (response) {
      return response.json();
    })
    .then(function () {
      document.getElementById("message").innerText =
        "Registration successful!";
      formStarted = false;
    })
    .catch(function () {
      document.getElementById("message").innerText =
        "Mock registration saved locally.";
      formStarted = false;
    });
  }, 1000);
}

function validatePhone() {
  const phone = document.getElementById("phone").value;

  if (phone.length !== 10 || isNaN(phone)) {
    alert("Phone number must contain 10 digits");
  }
}

function showFee() {
  const eventType = document.getElementById("eventType").value;
  const feeOutput = document.getElementById("feeOutput");

  if (eventType === "music") {
    feeOutput.innerText = "Event Fee: ₹100";
  } else if (eventType === "sports") {
    feeOutput.innerText = "Event Fee: ₹50";
  } else if (eventType === "workshop") {
    feeOutput.innerText = "Event Fee: ₹150";
  } else {
    feeOutput.innerText = "";
  }
}

function countCharacters() {
  const feedback = document.getElementById("feedback");
  const count = document.getElementById("charCount");

  count.innerText = "Characters: " + feedback.value.length;
}

function enlargeImage(img) {
  img.style.width = "300px";
  img.style.height = "200px";
}

function savePreference() {
  const eventType = document.getElementById("eventType").value;
  localStorage.setItem("preferredEvent", eventType);
  sessionStorage.setItem("lastSelected", eventType);
}

function loadPreference() {
  const saved = localStorage.getItem("preferredEvent");

  if (saved) {
    document.getElementById("eventType").value = saved;
    showFee();
  }
}

function clearPreferences() {
  localStorage.clear();
  sessionStorage.clear();
  alert("Preferences cleared");
}

function findNearbyEvents() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        document.getElementById("locationOutput").innerText =
          "Latitude: " + position.coords.latitude +
          ", Longitude: " + position.coords.longitude;
      },
      function (error) {
        if (error.code === error.PERMISSION_DENIED) {
          document.getElementById("locationOutput").innerText =
            "Permission denied.";
        } else if (error.code === error.TIMEOUT) {
          document.getElementById("locationOutput").innerText =
            "Location request timed out.";
        } else {
          document.getElementById("locationOutput").innerText =
            "Unable to get location.";
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 5000
      }
    );
  } else {
    document.getElementById("locationOutput").innerText =
      "Geolocation not supported.";
  }
}

function videoReady() {
  document.getElementById("videoMessage").innerText = "Video ready to play";
}

function fetchEvents() {
  const loading = document.getElementById("loading");

  async function getData() {
    try {
      const mockData = JSON.stringify(events);
      const blob = new Blob([mockData], { type: "application/json" });
      const url = URL.createObjectURL(blob);

      const response = await fetch(url);
      const data = await response.json();

      console.log("Fetched mock events:", data);
      loading.style.display = "none";
      displayEvents();
    } catch (error) {
      loading.innerText = "Failed to load events.";
    }
  }

  getData();
}

$(document).ready(function () {
  $("#registerBtn").click(function () {
    $(".eventCard").fadeOut(500).fadeIn(500);
  });
});

console.log("React or Vue helps build large projects using reusable components.");