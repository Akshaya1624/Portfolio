// --- Typewriter Effect Script ---
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


// Function to handle the active navigation link highlighting (from previous code)
function highlightActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.navbar a');
    const scrollPosition = window.pageYOffset;
    
    // Define the offset (adjust this value if your header height changes)
    const headerOffset = 120; 

    sections.forEach(section => {
        const sectionTop = section.offsetTop - headerOffset;
        const sectionHeight = section.clientHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            // Remove 'active' from all links
            navLinks.forEach(link => {
                link.classList.remove('active');
            });
            
            // Add 'active' to the corresponding link
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


// Primary initialization when the window loads
window.onload = function() {
    // 1. Initialize Typewriter Effect
    var elements = document.getElementById('typewriter-text');
    if (elements) {
        var toRotate = ['Full Stack Developer', 'Java Developer', 'Cybersecurity Enthusiast'];
        var period = 2000; // Time (in ms) to wait before deleting/starting next word
        new TxtType(elements, toRotate, period);
    }
    
    // 2. Run the highlight function immediately on load
    highlightActiveNavLink();
    
    // 3. Resume Download Link Functionality
    const resumeBtn = document.querySelector('.download-btn');
    if (resumeBtn) {
        // Sets the path for the resume file you uploaded
        resumeBtn.href = './Resume-Akshaya M.pdf';
    }
};


// Smooth Scrolling for all internal links (from previous code)
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


// Event Listener for Scroll Highlighting (from previous code)
window.addEventListener('scroll', highlightActiveNavLink);