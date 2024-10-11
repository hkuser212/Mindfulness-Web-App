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
  
  