$('.navTrigger').click(function () {
    $(this).toggleClass('active');
    console.log("Clicked menu");
    $("#mainListDiv").toggleClass("show_list");
    $("#mainListDiv").fadeIn();

});
// static/js/scripts.js


const slides = document.querySelectorAll('.testimonial-slide');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

let currentSlide = 0;

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        if (i === index) {
            slide.classList.add('active');
        }
    });
    document.querySelector('.testimonial-container').style.transform = `translateX(-${index * 100}%)`;
}

nextBtn.addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
});

prevBtn.addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
});

// Optional: Auto-slide every 5 seconds
setInterval(() => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}, 5000);

// static/js/scripts.js

const blogSlides = document.querySelectorAll('.blog-slide');
const prevBlogBtn = document.querySelector('.blog-controls .prev');
const nextBlogBtn = document.querySelector('.blog-controls .next');

let currentBlogSlide = 0;

function showBlogSlide(index) {
    blogSlides.forEach((slide, i) => {
        slide.classList.remove('active');
        if (i === index) {
            slide.classList.add('active');
        }
    });
    document.querySelector('.blog-container').style.transform = `translateX(-${index * 100}%)`;
}

nextBlogBtn.addEventListener('click', () => {
    currentBlogSlide = (currentBlogSlide + 1) % blogSlides.length;
    showBlogSlide(currentBlogSlide);
});

prevBlogBtn.addEventListener('click', () => {
    currentBlogSlide = (currentBlogSlide - 1 + blogSlides.length) % blogSlides.length;
    showBlogSlide(currentBlogSlide);
});

// Optional: Auto-slide every 5 seconds
setInterval(() => {
    currentBlogSlide = (currentBlogSlide + 1) % blogSlides.length;
    showBlogSlide(currentBlogSlide);
}, 5000);



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
