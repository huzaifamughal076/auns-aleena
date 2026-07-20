document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================
    // 1. LOADING SCREEN CONTROLLER
    // ==========================================
    const loader = document.getElementById("loader");
    window.addEventListener("load", () => {
        setTimeout(() => {
            loader.style.opacity = "0";
            setTimeout(() => loader.style.display = "none", 500);
        }, 800);
    });

    // ==========================================
    // 2. ENVELOPE OPENING CINEMATIC SEQUENCE
    // ==========================================
    const openBtn = document.getElementById("open-btn");
    const envelopeWrapper = document.getElementById("envelope-wrapper");
    const envelopeContainer = document.getElementById("envelope-container");
    const envelope = document.getElementById("envelope");
    const flap = document.getElementById("env-flap");
    const waxSeal = document.getElementById("wax-seal");
    const sealCrack = document.getElementById("seal-crack");
    const ribbon = document.getElementById("env-ribbon");
    const invitationCard = document.getElementById("invitation-card");
    const mainContent = document.getElementById("main-content");
    const bgMusic = document.getElementById("bg-music");
    const musicToggle = document.getElementById("music-toggle");
    const particlesContainer = document.getElementById("env-particles");

    // Create JS gold particles
    function createGoldParticles() {
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement("div");
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 3 + 1}px;
                height: ${Math.random() * 3 + 1}px;
                background: radial-gradient(circle, #F3E5AB, #D4AF37);
                border-radius: 50%;
                pointer-events: none;
                box-shadow: 0 0 4px rgba(212, 175, 55, 0.3);
                top: ${Math.random() * 100}%;
                left: ${Math.random() * 100}%;
                opacity: ${Math.random() * 0.4 + 0.1};
                animation: gpFloat ${Math.random() * 4 + 3}s ease-in-out infinite;
                animation-delay: ${Math.random() * 4}s;
            `;
            particlesContainer.appendChild(particle);
        }
    }
    createGoldParticles();

    // Insert keyframe for particle animation if not present
    if (!document.getElementById("particle-keyframes")) {
        const style = document.createElement("style");
        style.id = "particle-keyframes";
        style.textContent = `
            @keyframes gpFloat {
                0%, 100% { transform: translateY(0) scale(1); opacity: 0.2; }
                25% { transform: translateY(-20px) scale(1.5); opacity: 0.8; }
                50% { transform: translateY(-8px) scale(0.7); opacity: 0.3; }
                75% { transform: translateY(-15px) scale(1.2); opacity: 0.5; }
            }
        `;
        document.head.appendChild(style);
    }

    let invitationOpened = false;
    function openInvitation() {
        if (invitationOpened) return;
        invitationOpened = true;

        // Fade out the prompt, slide the four flaps apart + fade the seal
        openBtn.style.pointerEvents = "none";
        openBtn.style.opacity = "0";
        envelope.classList.add("open");

        // Once the flaps have mostly parted, burst of light -> reveal details
        setTimeout(() => {
            const flash = document.createElement("div");
            flash.className = "reveal-flash";
            document.body.appendChild(flash);

            // At the peak of the flash (screen fully white), swap in the site
            setTimeout(() => {
                envelopeWrapper.classList.add("open");
                mainContent.classList.remove("hidden");

                initCountdown();
                initScrollReveal();
                initPetals();
                initCustomMap();

                bgMusic.play().then(() => {
                    musicToggle.classList.add("playing");
                }).catch(() => {});
            }, 360);

            setTimeout(() => flash.remove(), 1700);
        }, 1400);
    }

    openBtn.addEventListener("click", openInvitation);
    if (waxSeal) waxSeal.addEventListener("click", openInvitation);

    // ==========================================
    // 3. CUSTOM BEAUTIFUL MAP WITH MARKER
    // ==========================================
    function initCustomMap() {
        const mapContainer = document.getElementById("custom-map");
        if (!mapContainer) return;

        // Coordinates for Le Aura Grand Marquee, Lahore
        const lat = 31.4815197;
        const lng = 74.4011883;

        // Custom gold heart-shaped marker SVG
        const markerSvg = `
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="60" viewBox="0 0 48 60">
                <defs>
                    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style="stop-color:#F3E5AB"/>
                        <stop offset="30%" style="stop-color:#D4AF37"/>
                        <stop offset="60%" style="stop-color:#AA7C11"/>
                        <stop offset="100%" style="stop-color:#F3E5AB"/>
                    </linearGradient>
                    <filter id="shadow">
                        <feDropShadow dx="0" dy="2" stdDeviation="2" flood-opacity="0.3"/>
                    </filter>
                </defs>
                <!-- Pin body -->
                <path d="M24 0 C10 0 0 10 0 24 C0 38 24 58 24 58 C24 58 48 38 48 24 C48 10 38 0 24 0Z" 
                      fill="url(#goldGrad)" filter="url(#shadow)"/>
                <!-- Inner ring -->
                <circle cx="24" cy="22" r="12" fill="none" stroke="#fff" stroke-width="1.5" opacity="0.6"/>
                <!-- Heart -->
                <path d="M24 28 C24 28 16 22 16 18 C16 15 18 13 21 13 C22.5 13 23.5 13.5 24 14.5 C24.5 13.5 25.5 13 27 13 C30 13 32 15 32 18 C32 22 24 28 24 28Z" 
                      fill="#fff" opacity="0.85"/>
                <!-- A&A text -->
                <text x="24" y="20" text-anchor="middle" font-family="'Cinzel', serif" font-size="6" font-weight="bold" fill="#fff" opacity="0.9">A&A</text>
            </svg>
        `;

        const markerHtml = `<div style="background: none; border: none;">${markerSvg}</div>`;

        const customIcon = L.divIcon({
            html: markerHtml,
            className: "custom-marker",
            iconSize: [48, 60],
            iconAnchor: [24, 58],
            popupAnchor: [0, -58]
        });

        // Initialize map with elegant style
        const map = L.map("custom-map", {
            center: [lat, lng],
            zoom: 16,
            zoomControl: true,
            scrollWheelZoom: true,
            attributionControl: true
        });

        // Warm, elegant tile layer (CartoDB Positron light with custom touch)
        L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>',
            subdomains: "abcd",
            maxZoom: 19,
            minZoom: 10
        }).addTo(map);

        // Add the beautiful custom marker
        const marker = L.marker([lat, lng], { icon: customIcon }).addTo(map);

        // Add a subtle pulse circle behind the marker
        const pulseCircle = L.circleMarker([lat, lng], {
            radius: 20,
            color: "#D4AF37",
            fillColor: "#D4AF37",
            fillOpacity: 0.08,
            weight: 1.5,
            opacity: 0.3
        }).addTo(map);

        // Animate pulse
        let pulseSize = 20;
        let growing = true;
        setInterval(() => {
            if (growing) {
                pulseSize += 0.3;
                if (pulseSize >= 28) growing = false;
            } else {
                pulseSize -= 0.3;
                if (pulseSize <= 18) growing = true;
            }
            pulseCircle.setRadius(pulseSize);
            pulseCircle.setStyle({ opacity: 0.4 - (pulseSize - 18) * 0.02 });
        }, 50);

        // Optional: open popup on marker click
        marker.bindPopup(`
            <div style="text-align:center;font-family:'Cormorant Garamond',serif;padding:5px;">
                <strong style="color:#AA7C11;font-size:16px;">Le Aura Grand Marquee</strong><br>
                <span style="color:#5C5856;font-size:13px;">Auns & Aleena Wedding</span><br>
                <span style="color:#AA7C11;font-size:12px;">14 November 2026</span>
            </div>
        `, { closeButton: true, className: "wedding-popup" });

        // Trigger a resize after map loads to ensure full rendering
        setTimeout(() => map.invalidateSize(), 300);

        // Handle tab visibility / reveal for proper map rendering
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    map.invalidateSize();
                }
            });
        }, { threshold: 0.1 });
        observer.observe(mapContainer);
    }

    // ==========================================
    // 4. BACKGROUND MUSIC LOGIC
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
        checkReveal();
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