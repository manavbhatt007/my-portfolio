// Typing Effect for Hero Section
const roles = ["UI/UX Designer   ", "Creative Thinker   ", "Problem Solver   ", "Innovation Explorer   ", "Learner   "];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingText = document.querySelector(".typing-text");

function typeEffect() {
    const currentRole = roles[roleIndex];
    if (isDeleting) {
        typingText.textContent = currentRole.substring(0, charIndex--);
    } else {
        typingText.textContent = currentRole.substring(0, charIndex++);
    }

    if (!isDeleting && charIndex === currentRole.length) {
        isDeleting = true;
        setTimeout(typeEffect, 1000);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        setTimeout(typeEffect, 300);
    } else {
        setTimeout(typeEffect, isDeleting ? 50 : 100);
    }
}

// Matrix Background Effect
function createInteractiveMatrix() {
    const canvas = document.getElementById('matrixCanvas');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = "日ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ0123456789";
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(-Math.floor(Math.random() * 20));

    let mouseX = -100;
    let mouseY = -100;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function draw() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.03)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.font = `${fontSize}px monospace`;

        for (let i = 0; i < drops.length; i++) {
            const char = chars.charAt(Math.floor(Math.random() * chars.length));
            const x = i * fontSize;
            const y = drops[i] * fontSize;

            const distToMouse = Math.sqrt((x - mouseX) ** 2 + (y - mouseY) ** 2);
            if (distToMouse < 100) {
                ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
                ctx.font = `${fontSize * 1.5}px monospace`;
            } else {
                const hue = 120 + (y / canvas.height) * 60;
                ctx.fillStyle = `hsla(${hue}, 100%, 50%, 0.4)`;
                ctx.font = `${fontSize}px monospace`;
            }

            ctx.fillText(char, x, y);

            if (y > canvas.height && Math.random() > 0.99) {
                drops[i] = 0;
            }

            drops[i] += 0.5;
        }

        requestAnimationFrame(draw);
    }

    draw();

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Splash Screen Matrix Effect
function createSplashMatrix() {
    const canvas = document.getElementById('matrixCanvasSplash');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = "01ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const fontSize = 16;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);

    function draw() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#00ffcc';
        ctx.font = `${fontSize}px monospace`;

        for (let i = 0; i < drops.length; i++) {
            const text = chars.charAt(Math.floor(Math.random() * chars.length));
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }

        requestAnimationFrame(draw);
    }

    draw();

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Terminal Functionality
const terminal = {
    output: document.querySelector('.terminal-output'),
    input: document.getElementById('terminal-command'),

    init() {
        this.input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                this.processCommand(this.input.value);
                this.input.value = '';
            }
        });

        this.typeText('> Establishing secure connection...', 50)
            .then(() => this.typeText('> Connection established', 30))
            .then(() => this.typeText('> Terminal ready', 30));
    },

    typeText(text, speed) {
        return new Promise(resolve => {
            const line = document.createElement('p');
            this.output.appendChild(line);

            let i = 0;
            const typing = setInterval(() => {
                if (i < text.length) {
                    line.textContent += text.charAt(i);
                    i++;
                } else {
                    clearInterval(typing);
                    resolve();
                }
            }, speed);
        });
    },

    processCommand(cmd) {
        const response = document.createElement('p');
        this.output.appendChild(response);

        if (cmd.toLowerCase() === 'help') {
            response.textContent = '> Available commands: contact, about, projects, clear';
        } else if (cmd.toLowerCase() === 'clear') {
            this.output.innerHTML = '';
        } else if (cmd.toLowerCase().startsWith('contact')) {
            response.textContent = '> Opening secure contact channel...';
            // Here you would actually submit the form
        } else {
            response.textContent = `> Command not recognized: ${cmd}`;
        }

        this.output.scrollTop = this.output.scrollHeight;
    }
};

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    typeEffect();
    createInteractiveMatrix();
    createSplashMatrix();
    terminal.init();

    // Hamburger menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('show');
    });

    // Scroll animation for project cards
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    });

    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach(el => observer.observe(el));

    // Fade out splash screen after delay
    setTimeout(() => {
        const splash = document.getElementById('splash-screen');
        splash.style.opacity = '0';
        splash.style.visibility = 'hidden';
    }, 2500);

    // Add classified stickers to project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        const sticker = document.createElement('div');
        sticker.className = 'classified-sticker';
        sticker.textContent = Math.random() > 0.5 ? 'TOP SECRET' : 'CLASSIFIED';
        card.appendChild(sticker);
    });
});