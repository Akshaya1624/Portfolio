// --- Typewriter Effect Logic (UNCHANGED) ---
var TxtType = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.isDeleting = false;
    this.tick();
};

TxtType.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

    var that = this;
    var delta = 200 - Math.random() * 100;

    if (this.isDeleting) {
        delta /= 2;
    }

    if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
    }

    setTimeout(function() {
        that.tick();
    }, delta);
};

// Function to handle the active navigation link highlighting (UNCHANGED)
function highlightActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.navbar a');
    const scrollPosition = window.pageYOffset;
    
    // Define the offset (header height)
    const headerOffset = 120; 

    sections.forEach(section => {
        const sectionTop = section.offsetTop - headerOffset;
        const sectionHeight = section.clientHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
            });
            
            const targetLink = document.querySelector(`.navbar a[href="#${section.id}"]`);
            if (targetLink) {
                targetLink.classList.add('active');
            }
        }
    });

    // Special handling for the Home section when at the very top of the page
    const homeLink = document.querySelector('.navbar a[href="#home"]');
    const aboutSection = document.querySelector('#about');
    
    if (homeLink && aboutSection) {
        if (scrollPosition < aboutSection.offsetTop - headerOffset) {
            navLinks.forEach(link => link.classList.remove('active'));
            homeLink.classList.add('active');
        }
    }
}

// --- Dynamic Background Bubbles Generation (INCREASED COUNT) ---
function initializeBubbles() {
    const bubblesContainer = document.querySelector('.bubbles');
    if (bubblesContainer) {
        // Generate 35 to 50 particles
        const particleCount = 35 + Math.floor(Math.random() * 16); 
        
        for (let i = 0; i < particleCount; i++) {
            const bubble = document.createElement('span');
            
            // Random size (30px to 80px)
            const size = Math.random() * 50 + 30;
            bubble.style.width = `${size}px`;
            bubble.style.height = `${size}px`;
            
            // Random horizontal position
            bubble.style.left = `${Math.random() * 100}%`;
            
            // Random animation duration (8s to 20s)
            bubble.style.animationDuration = `${Math.random() * 12 + 8}s`; 
            
            // Random animation delay (up to 5s)
            bubble.style.animationDelay = `${Math.random() * 5}s`;
            
            bubblesContainer.appendChild(bubble);
        }
    }
}

// Primary initialization when the window loads (UNCHANGED)
window.onload = function() {
    // 1. Initialize Typewriter Effect
    var elements = document.getElementById('typewriter-text');
    if (elements) {
        // These are the roles that will be typed out
        var toRotate = ['Full Stack Developer', 'Java Developer', 'Cybersecurity Enthusiast'];
        var period = 2000; 
        new TxtType(elements, toRotate, period);
    }
    
    // 2. Initialize Floating Bubbles Background (Crucial for bubbles to appear)
    initializeBubbles();

    // 3. Run the highlight function immediately on load
    highlightActiveNavLink();
    
    // 4. Resume Download Link Functionality
    const resumeBtn = document.querySelector('.download-btn');
    if (resumeBtn) {
        resumeBtn.href = './Akshaya Resume.pdf';
    }
};

// Smooth Scrolling for all internal links (UNCHANGED)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Event Listener for Scroll Highlighting (UNCHANGED)
window.addEventListener('scroll', highlightActiveNavLink);
