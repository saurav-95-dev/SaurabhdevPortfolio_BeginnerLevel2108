// script.js

// Smooth scrolling effect for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Dynamic content loading for projects (simulated asynchronous data loading)
window.addEventListener('DOMContentLoaded', () => {
    const projectsContainer = document.querySelector('.projects-container');
    if (projectsContainer) {
        fetch('projects.json') // Assume projects are stored in a JSON file
            .then(response => response.json())
            .then(projects => {
                projects.forEach(project => {
                    const projectDiv = document.createElement('div');
                    projectDiv.classList.add('project');
                    projectDiv.innerHTML = `
                        <h3>${project.title}</h3>
                        <p>${project.description}</p>
                        <a href="${project.github}" target="_blank">GitHub Repository</a>
                    `;
                    projectsContainer.appendChild(projectDiv);
                });
            })
            .catch(error => console.error('Error loading projects:', error));
    }
});

// Form submission handling — redirects to WhatsApp with a pre-filled message
const WHATSAPP_NUMBER = '917985665273'; // country code + number, no + or spaces

const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', e => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('Message');

        const text =
            `Hello Nimmi's Kitchen, I'd like to get in touch.%0A%0A` +
            `*Name:* ${encodeURIComponent(name)}%0A` +
            `*Email:* ${encodeURIComponent(email)}%0A` +
            `*Message:* ${encodeURIComponent(message)}`;

        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, '_blank');
        e.target.reset();
    });
}

//................................................................................................................

function showQRCode() {
    const qrCodeContainer = document.getElementById("qr-code-container");
    const paymentDetails = document.getElementById("payment-details");

    qrCodeContainer.classList.remove('hidden');
    paymentDetails.classList.remove('hidden');
}

function submitPaymentDetails() {
    // Fetch payment details
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;
    const paymentScreenshot = document.getElementById("payment-screenshot").files[0];

    if (!name) {
        alert('Please enter your name before sending.');
        return;
    }

    const text =
        `Hello Nimmi's Kitchen, here are my payment details.%0A%0A` +
        `*Name:* ${encodeURIComponent(name)}%0A` +
        `*Email:* ${encodeURIComponent(email || 'Not provided')}%0A` +
        `*Message:* ${encodeURIComponent(message || 'None')}` +
        (paymentScreenshot
            ? `%0A%0A(I'm attaching my payment screenshot in the next message.)`
            : '');

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, '_blank');

    if (paymentScreenshot) {
        alert("WhatsApp is opening with your details pre-filled.\n\nWhatsApp links can't auto-attach files, so after sending this message, please attach your payment screenshot directly in the chat.");
    }
}

function previewImage(event) {
    const fileInput = event.target;
    const file = fileInput.files[0];
    if (!file) return;

    const imagePreview = document.getElementById('image-preview');
    const previewImg = document.getElementById('preview-img');
    imagePreview.classList.remove('hidden');

    const reader = new FileReader();
    reader.onload = function (e) {
        previewImg.src = e.target.result;
    };
    reader.readAsDataURL(file);
}

function removeImage() {
    const imagePreview = document.getElementById('image-preview');
    const previewImg = document.getElementById('preview-img');
    imagePreview.classList.add('hidden');
    previewImg.src = '#';
}

//................................................................................................................
// Key Ingredients modal: clicking a dish's "Key Ingredients" button reads
// that dish's data-dish / data-price / data-ingredients attributes (set on
// the parent .project div) and displays them in a shared modal card.

document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById('ingredients-modal');
    if (!modal) return;

    const modalDishName = document.getElementById('modal-dish-name');
    const modalDishPrice = document.getElementById('modal-dish-price');
    const modalIngredientsList = document.getElementById('modal-ingredients-list');
    const closeBtn = modal.querySelector('.modal-close');

    document.querySelectorAll('.key-ingredients-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            const card = btn.closest('.project');
            if (!card) return;

            const dishName = card.dataset.dish || 'Dish';
            const price = card.dataset.price || '';
            const ingredients = (card.dataset.ingredients || '')
                .split(',')
                .map(i => i.trim())
                .filter(Boolean);

            modalDishName.textContent = dishName;
            modalDishPrice.textContent = price ? `\u20B9${price}` : 'N/A';

            modalIngredientsList.innerHTML = '';
            ingredients.forEach(item => {
                const li = document.createElement('li');
                li.textContent = item;
                modalIngredientsList.appendChild(li);
            });

            modal.classList.remove('hidden');
        });
    });

    function closeModal() {
        modal.classList.add('hidden');
    }

    closeBtn.addEventListener('click', closeModal);

    // Click on the dark backdrop (outside the card) also closes it
    modal.addEventListener('click', function (e) {
        if (e.target === modal) closeModal();
    });

    // Escape key closes it too
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
            closeModal();
        }
    });
});

//................................................................................................................
// Kitchen intro video: click play button -> hide photos, show & play video.
// Clicking the video itself pauses/resumes. When the video ends, the
// photos + play button reappear so it's ready to be replayed.

document.addEventListener('DOMContentLoaded', function () {
    const video = document.getElementById('intro-video');
    const playButton = document.querySelector('.intro-video-overlay .play-button');
    const photoPair = document.querySelector('.intro-photo-pair');
    const overlay = document.querySelector('.intro-video-overlay');

    if (!video || !playButton) return;

    playButton.addEventListener('click', function () {
        photoPair.style.visibility = 'hidden';
        overlay.classList.add('is-active');
        video.classList.add('is-playing');
        playButton.style.display = 'none';
        video.currentTime = 0;
        video.play();
    });

    // Tap/click the playing video to pause or resume it
    video.addEventListener('click', function () {
        if (video.paused) {
            video.play();
        } else {
            video.pause();
        }
    });

    // When the clip finishes, reset back to the photo + play button state
    video.addEventListener('ended', function () {
        video.classList.remove('is-playing');
        overlay.classList.remove('is-active');
        photoPair.style.visibility = 'visible';
        playButton.style.display = 'block';
    });
});