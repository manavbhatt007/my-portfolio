// Enhanced Project Detail Interactions
document.addEventListener('DOMContentLoaded', function() {
    // Animate elements on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.problem-card, .solution-card, .result-item, .gallery-item');

        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;

            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Set initial styles
    const setInitialStyles = function() {
        const elements = document.querySelectorAll('.problem-card, .solution-card, .result-item, .gallery-item');
        elements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = `all 0.5s ease ${index * 0.1}s`;
        });
    };

    setInitialStyles();
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on load

    // Interactive gallery
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            this.classList.toggle('zoomed');
        });
    });

    // // Matrix background with lower opacity
    // const canvas = document.getElementById('matrixCanvas');
    // const ctx = canvas.getContext('2d');
    // canvas.width = window.innerWidth;
    // canvas.height = window.innerHeight;

    // const chars = "01日ﾊﾐﾋｰｳｼABCDEFGHIJKLMNOPQRSTUVWXYZ";
    // const fontSize = 14;
    // const columns = canvas.width / fontSize;
    // const drops = Array(Math.floor(columns)).fill(1);

    // function draw() {
    //     ctx.fillStyle = 'rgba(0, 0, 0, 0.03)';
    //     ctx.fillRect(0, 0, canvas.width, canvas.height);

    //     ctx.fillStyle = '#00ff99';
    //     ctx.font = `${fontSize}px monospace`;

    //     for (let i = 0; i < drops.length; i++) {
    //         const text = chars.charAt(Math.floor(Math.random() * chars.length));
    //         ctx.fillText(text, i * fontSize, drops[i] * fontSize);

    //         if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
    //             drops[i] = 0;
    //         }
    //         drops[i]++;
    //     }
    // }

    // setInterval(draw, 50);

    // window.addEventListener('resize', () => {
    //     canvas.width = window.innerWidth;
    //     canvas.height = window.innerHeight;
    // });

    // Glitch effect for project title
    const glitchTitle = document.querySelector('.glitch');
    if (glitchTitle) {
        setInterval(() => {
            glitchTitle.style.textShadow = `
                ${Math.random() * 5}px ${Math.random() * 5}px 0 #0ff,
                ${Math.random() * -5}px ${Math.random() * -5}px 0 #f0f
            `;
        }, 100);
    }
});