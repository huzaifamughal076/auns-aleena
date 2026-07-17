document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================
    // 1. LOADING SCREEN CONTROLLER
    // ==========================================
    const loader = document.getElementById("loader");
    window.addEventListener("load", () => {
        setTimeout(() => {
            loader.style.opacity = "0";
            setTimeout(() => loader.style.display = "none", 500);
        }, 800); // Elegant structural delay
    });

    // ==========================================
    // 2. ENVELOPE OPENING INTERACTION
    // ==========================================
    const openBtn = document.getElementById("open-btn");
    const envelopeWrapper = document.getElementById("envelope-wrapper");
    const mainContent = document.getElementById("main-content");
    const bgMusic = document.getElementById("bg-music");
    const musicToggle = document.getElementById("music-toggle");

    openBtn.addEventListener("click", () => {
        envelopeWrapper.classList.add("open");
        mainContent.classList.remove("hidden");
        
        // Initialize structural processing engine features sequentially
        initCountdown();
        initScrollReveal();
        initPetals();

        // Premium Audio Autoplay UX implementation Strategy
        bgMusic.play().then(() => {
            musicToggle.classList.add("playing");
        }).catch(() => {
            console.log("Autoplay variant restricted by device permission matrices. Interaction muted.");
        });
    });

    // ==========================================
    // 3. BACKGROUND MUSIC LOGIC
    // ==========================================
    musicToggle.addEventListener("click", () => {
        if (bgMusic.paused) {
            bgMusic.play();
            musicToggle.classList.add("playing");
            musicToggle.style.color = "var(--gold-dark)";
        } else {
            bgMusic.pause();
            musicToggle.classList.remove("playing");
            musicToggle.style.color = "var(--text-muted)";
        }
    });

    // ==========================================
    // 4. COUNTDOWN TIMER ENGINE
    // ==========================================
    function initCountdown() {
        const targetDate = new Date("November 14, 2026 13:00:00").getTime();

        const updateTimer = () => {
            const now = new Date().getTime();
            const distance = targetDate - now;

            if (distance < 0) {
                document.querySelector(".countdown-container").innerHTML = "<p class='gold-shimmer'>The Event Has Begun</p>";
                clearInterval(timerInterval);
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            document.getElementById("days").innerText = String(days).padStart(2, "0");
            document.getElementById("hours").innerText = String(hours).padStart(2, "0");
            document.getElementById("minutes").innerText = String(minutes).padStart(2, "0");
            document.getElementById("seconds").innerText = String(seconds).padStart(2, "0");
        };

        updateTimer();
        const timerInterval = setInterval(updateTimer, 1000);
    }

    // ==========================================
    // 5. SCROLL REVEAL (FADE-UP ENGINE)
    // ==========================================
    function initScrollReveal() {
        const reveals = document.querySelectorAll(".reveal");

        const checkReveal = () => {
            const triggerBottom = window.innerHeight * 0.85;
            reveals.forEach(reveal => {
                const revealTop = reveal.getBoundingClientRect().top;
                if (revealTop < triggerBottom) {
                    reveal.classList.add("active");
                }
            });
        };

        window.addEventListener("scroll", checkReveal);
        checkReveal(); // Initial evaluation run
    }

    // ==========================================
    // 6. ANIMATED FALLING ROSE PETALS (CANVAS)
    // ==========================================
    function initPetals() {
        const canvas = document.getElementById("petals-canvas");
        const ctx = canvas.getContext("2d");

        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        window.addEventListener("resize", () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        });

        const petalCount = 25;
        const petals = [];

        class Petal {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height - height;
                this.r = Math.random() * 6 + 4;
                this.d = Math.random() * petalCount;
                this.opacity = Math.random() * 0.4 + 0.2;
                this.flip = Math.random();
                this.flipSpeed = Math.random() * 0.03;
            }

            draw() {
                if (this.y > height) {
                    this.y = -10;
                    this.x = Math.random() * width;
                }
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.r, 0, Math.PI, true);
                ctx.fillStyle = `rgba(240, 173, 181, ${this.opacity})`;
                ctx.fill();
            }

            update() {
                this.y += Math.random() * 1 + 1;
                this.x += Math.sin(this.d) * 0.5;
                this.flip += this.flipSpeed;
            }
        }

        for (let i = 0; i < petalCount; i++) {
            petals.push(new Petal());
        }

        function animate() {
            ctx.clearRect(0, 0, width, height);
            petals.forEach(petal => {
                petal.draw();
                petal.update();
            });
            requestAnimationFrame(animate);
        }
        animate();
    }
});

// ==========================================
// 7. RSVP ACTION INTERACTION
// ==========================================
function handleRSVP(isAttending) {
    if (isAttending) {
        alert("Thank you! We look forward to celebrating our special day with you. ✨");
    } else {
        alert("Thank you for letting us know. You will be missed dearly! ❤️");
    }
}
