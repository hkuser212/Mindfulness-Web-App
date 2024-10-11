// JavaScript for Chart.js and loading recommendations
document.addEventListener('DOMContentLoaded', () => {
  // Chart for Activity Logging
  const activityCtx = document.getElementById('activityChart').getContext('2d');
  const activityChart = new Chart(activityCtx, {
      type: 'bar',
      data: {
          labels: ['Meditation', 'Yoga', 'Breathing Exercises', 'Mindfulness Sessions'],
          datasets: [{
              label: 'Activity Log (Hours)',
              data: [5, 3, 2, 4],
              backgroundColor: ['rgba(75, 192, 192, 0.2)'],
              borderColor: ['rgba(75, 192, 192, 1)'],
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              y: {
                  beginAtZero: true
              }
          }
      }
  

  });
});

  
  // Chart for Mood Tracking
  const moodCtx = document.getElementById('moodChart').getContext('2d');
  const moodChart = new Chart(moodCtx, {
      type: 'line',
      data: {
          labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5'],
          datasets: [{
              label: 'Mood Score',
              data: [3, 4, 2, 5, 4],
              fill: false,
              borderColor: 'rgba(153, 102, 255, 1)',
              tension: 0.1
          }]
      },
      options: {
          scales: {
              y: {
                  beginAtZero: true
              }
          }
      }
  });



window.onload = function () {
    var sidebar = document.getElementById("sidebar");
    var content = document.getElementById("content");
    var resizing = false;
  
    sidebar.addEventListener("mousemove", function (e) {
      if (
        e.clientX >= sidebar.offsetWidth - 10 &&
        e.clientX <= sidebar.offsetWidth + 10
      ) {
        sidebar.style.cursor = "ew-resize";
        document.body.style.userSelect = "none";
      } else {
        sidebar.style.cursor = "default";
      }
    });
  
    sidebar.addEventListener("mousedown", function (e) {
      if (
        e.clientX >= sidebar.offsetWidth - 10 &&
        e.clientX <= sidebar.offsetWidth + 10
      ) {
        resizing = true;
        document.body.style.cursor = "ew-resize";
      }
    });
  
    document.addEventListener("mouseup", function (e) {
      resizing = false;
      document.body.style.cursor = "default";
      document.body.style.userSelect = "auto";
    });
  
    document.addEventListener("mousemove", function (e) {
      if (resizing) {
        // Ensure sidebar width does not go below minimum width
        var newWidth = Math.max(150, Math.min(400, e.clientX));
        sidebar.style.width = newWidth + "px";
        content.style.marginLeft = newWidth + "px";
      }
    });
  };
  
  document.addEventListener('DOMContentLoaded', () => {
    const signInBtn = document.getElementById("signIn");
    const signUpBtn = document.getElementById("signUp");
    const firstForm = document.getElementById("form1");
    const secondForm = document.getElementById("form2");
    const container = document.querySelector(".container");

    // Ensure that these elements exist in the DOM before attaching event listeners
    if (signInBtn && signUpBtn && firstForm && secondForm && container) {
        signInBtn.addEventListener("click", () => {
            container.classList.remove("right-panel-active");
        });

        signUpBtn.addEventListener("click", () => {
            container.classList.add("right-panel-active");
        });

        firstForm.addEventListener("submit", (e) => e.preventDefault());
        secondForm.addEventListener("submit", (e) => e.preventDefault());
    } else {
        console.error("One or more elements are missing from the DOM.");
    }
});

document.addEventListener("DOMContentLoaded", function() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
      const question = item.querySelector('.faq-question');
      
      question.addEventListener('click', () => {
          // Close all open answers
          faqItems.forEach(i => {
              if (i !== item) {
                  i.classList.remove('active');
              }
          });

          // Toggle the clicked item
          item.classList.toggle('active');
      });
  });
});


document.addEventListener("DOMContentLoaded", function() {
    const audioElement = document.getElementById('breathing-audio'); // Ensure this is initialized when DOM is ready

    const breathingText = document.getElementById('breathing-text');
    let isBreatheIn = true;

    function breathingCycle() {
        if (isBreatheIn) {
            breathingText.textContent = 'Breathe In';
        } else {
            breathingText.textContent = 'Breathe Out';
        }
        isBreatheIn = !isBreatheIn;
    }

    // Change every 4 seconds
    setInterval(breathingCycle, 4000);

    // Function to play audio
    window.playAudio = function() {  // Define playAudio on the window object
        if (audioElement.paused) {
            audioElement.play();
        } else {
            audioElement.pause();
        }
    };

    // Initialize breathing text
    breathingCycle(); // Initialize to start with "Breathe In"
});



let slider = document.getElementById('slider');

function slideLeft() {
    slider.scrollLeft -= 300;  // Adjust this value based on card width and margin
}

function slideRight() {
    slider.scrollLeft += 300;  // Adjust this value based on card width and margin
}



// audio fro meditae section

document.addEventListener('DOMContentLoaded', function() {
    const audioCards = document.querySelectorAll('.audio-card');
    let currentlyPlaying = null;

    audioCards.forEach(card => {
        const button = card.querySelector('.play-pause-btn');
        const audioSrc = card.dataset.audio;
        let audio = new Audio(audioSrc);

        button.addEventListener('click', function() {
            if (currentlyPlaying && currentlyPlaying !== audio) {
                currentlyPlaying.pause();
                currentlyPlaying.currentTime = 0;
                currentlyPlaying.parentElement.querySelector('.play-pause-btn').textContent = 'Play';
            }

            if (audio.paused) {
                audio.play();
                button.textContent = 'Pause';
                currentlyPlaying = audio;
            } else {
                audio.pause();
                button.textContent = 'Play';
                currentlyPlaying = null;
            }
        });

        audio.addEventListener('ended', function() {
            button.textContent = 'Play';
            currentlyPlaying = null;
        });
    });
});




function showContent(tabId) {
    // Remove 'active' class from all tabs and tab contents
    var tabs = document.querySelectorAll('.tab');
    tabs.forEach(function(tab) {
        tab.classList.remove('active');
    });

    var contents = document.querySelectorAll('.tab-content');
    contents.forEach(function(content) {
        content.classList.remove('active');
    });

    // Add 'active' class to the clicked tab and its corresponding content
    document.querySelector(`#${tabId}`).classList.add('active');
    event.target.classList.add('active');

}