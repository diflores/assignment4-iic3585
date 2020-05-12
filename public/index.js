const songList = document.getElementById("song-list");

// Fetch Songs from local server
fetch("https://diflores.pythonanywhere.com/song_list")
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error(response.statusText);
    }
  })
  .then(data => {
    data.forEach(song => {
      const songName = song.slice(0, -4);
      const li = document.createElement("li");
      const songURL = `https://diflores.pythonanywhere.com/songs/?song_name=${song}`;
      li.innerHTML = `
        <div class="song-container">
          <a data-song href="${songURL}">
            &#9654; ${songName}
          </a>
          <i class="fas fa-heart to-be-saved" onclick="likeSong(event, '${songURL}')"></i>
        </div>
      `;

      songList.appendChild(li);
    });
  })
  .then(() => {
    // Create playlist
    // https://gomakethings.com/a-simple-progressively-enhanced-audio-player-with-vanilla-js/
    Array.prototype.forEach.call(
      document.querySelectorAll("[data-song]"),
      function (song) {
        // Create a new Audio object for the song
        song.audio = new Audio(song.href);

        // Add a11y attributes
        song.setAttribute("role", "button");
        song.setAttribute("aria-pressed", "false");
      }
    );

    document.addEventListener(
      "click",
      function (event) {
        // Ignore clicks on elements that aren't the song link
        if (!event.target.hasAttribute("data-song")) return;

        // Prevent link default
        event.preventDefault();

        // If the item is already playing, hit pause
        if (event.target.getAttribute("aria-pressed") == "true") {
          event.target.audio.pause();
          event.target.setAttribute("aria-pressed", "false");
          return;
        }

        // Otherwise, play it
        event.target.audio.play();
        event.target.setAttribute("aria-pressed", "true");
      },
      false
    );
  });

function likeSong(event, songURL) {
  if (event.target.style.color !== "rgb(140, 36, 188)") {
    // Style heart
    event.target.style.color = "#8C24BC";
    event.target.setAttribute("song-url", songURL);
    event.target.classList.add("to-be-saved");
    event.target.classList.add("saved");
    // Save song in cache
    caches.open("pages-cache-v1").then(function (cache) {
      return cache.addAll([songURL]);
    });
  } else {
    // Back to original style
    event.target.style.color = "black";
    event.target.classList.remove("saved");
    event.target.classList.add("to-be-saved");
  }
}
