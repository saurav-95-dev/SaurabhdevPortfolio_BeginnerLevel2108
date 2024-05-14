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
});

// Form submission handling
document.getElementById('contact-form').addEventListener('submit', e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');

    // Send form data to server or display a confirmation message
    console.log(`Name: ${name}, Email: ${email}, Message: ${message}`);
    // Here you can add code to send the form data to a server using AJAX or fetch
    // You can also display a confirmation message to the user
});

//................................................................................................................

function showQRCode() {
    const qrCodeContainer = document.getElementById("qr-code-container");
    const paymentDetails = document.getElementById("payment-details");
  
    // Show the QR code container
    qrCodeContainer.style.display = "block";
  
    // Show the payment details section
    paymentDetails.style.display = "block";
  
    // You can set the source of the QR code image here after adding it
    // Example: document.getElementById("qr-code-img").src = "path/to/qr-code-image.png";
  }
  
  function submitPaymentDetails() {
    // Fetch payment details
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;
    const paymentScreenshot = document.getElementById("payment-screenshot").files[0];
  
    // Handle payment details submission (e.g., send data to server)
    // You can implement this part based on your backend requirements
  }
  function previewImage(event) {
    const fileInput = event.target;
    const file = fileInput.files[0];
  
    const imagePreview = document.getElementById('image-preview');
    const previewImg = document.getElementById('preview-img');
    imagePreview.classList.remove('hidden');
  
    const reader = new FileReader();
    reader.onload = function (e) {
      previewImg.src = e.target.result;
    }
    reader.readAsDataURL(file);
  }
  
  function removeImage() {
    const imagePreview = document.getElementById('image-preview');
    const previewImg = document.getElementById('preview-img');
    imagePreview.classList.add('hidden');
    previewImg.src = '#';
  }
  
  function submitPaymentDetails() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    const imagePreview = document.getElementById('image-preview').innerHTML;
  
    // Here you can handle the submission of payment details, including the uploaded image
  }
  
  
  document.addEventListener('DOMContentLoaded', function() {
    var video = document.getElementById('intro-video');
    var playButton = document.querySelector('.play-button');
    
    playButton.addEventListener('click', function() {
        video.play();
        playButton.style.display = 'none'; // Hide the play button once playback starts
    });
});
