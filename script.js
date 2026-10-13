/**
 * Prakarti Sharma - Bougainvillea Pastel Portfolio Interactive Scripts
 * Drifting Bougainvillea Petals, Soft Pastel Sparkles, 1-Click Copy & Clean Validation
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Current Year in Footer
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // =========================================================================
  // 2. Gentle Drifting Bougainvillea Petals & Pastel Sparkles Canvas
  // =========================================================================
  const canvas = document.getElementById('bougainvillea-canvas');
  if (canvas && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    // Bougainvillea Petal Pastel Palette
    const petalColors = [
      'rgba(244, 156, 181, ',  // Pastel Bougainvillea Rose
      'rgba(251, 189, 164, ',  // Pastel Coral Peach
      'rgba(250, 213, 158, ',  // Pastel Apricot Gold
      'rgba(210, 184, 234, ',  // Pastel Lilac Wisteria
      'rgba(184, 218, 196, '   // Pastel Mint Leaf
    ];

    const particles = [];
    // Kept modest so it is serene and never crowded
    const count = window.innerWidth < 768 ? 20 : 36;

    class BougainvilleaPetal {
      constructor() {
        this.reset(true);
      }

      reset(init = false) {
        this.x = Math.random() * width;
        this.y = init ? Math.random() * height : -15;
        this.size = Math.random() * 5 + 4; // 4px to 9px papery petal size
        this.color = petalColors[Math.floor(Math.random() * petalColors.length)];
        this.speedY = Math.random() * 0.45 + 0.2; // Gentle, peaceful downward drift
        this.speedX = (Math.random() - 0.5) * 0.35;
        this.opacity = Math.random() * 0.55 + 0.35;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotSpeed = (Math.random() - 0.5) * 0.015;
        this.sway = Math.random() * Math.PI * 2;
        this.swaySpeed = Math.random() * 0.02 + 0.01;
        this.isSparkle = Math.random() > 0.65; // Some are soft twinkling micro-sparkles
      }

      update() {
        this.sway += this.swaySpeed;
        this.x += Math.sin(this.sway) * 0.4 + this.speedX;
        this.y += this.speedY;
        this.rotation += this.rotSpeed;

        if (this.y > height + 20 || this.x < -20 || this.x > width + 20) {
          this.reset(false);
        }
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);

        if (this.isSparkle) {
          // Delicate 4-point soft star
          ctx.fillStyle = `${this.color}${this.opacity * 0.8})`;
          ctx.beginPath();
          const r = this.size * 0.6;
          ctx.moveTo(0, -r);
          ctx.quadraticCurveTo(0, 0, r, 0);
          ctx.quadraticCurveTo(0, 0, 0, r);
          ctx.quadraticCurveTo(0, 0, -r, 0);
          ctx.quadraticCurveTo(0, 0, 0, -r);
          ctx.fill();
        } else {
          // Characteristic organic teardrop / papery heart shape of a bougainvillea petal
          ctx.fillStyle = `${this.color}${this.opacity})`;
          ctx.beginPath();
          const s = this.size;
          ctx.moveTo(0, -s * 0.8);
          ctx.bezierCurveTo(s * 0.7, -s * 0.8, s * 0.9, s * 0.3, 0, s);
          ctx.bezierCurveTo(-s * 0.9, s * 0.3, -s * 0.7, -s * 0.8, 0, -s * 0.8);
          ctx.fill();
        }

        ctx.restore();
      }
    }

    for (let i = 0; i < count; i++) {
      particles.push(new BougainvilleaPetal());
    }

    let animId;
    function animate() {
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }
      animId = requestAnimationFrame(animate);
    }
    animate();

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        cancelAnimationFrame(animId);
      } else {
        animate();
      }
    });
  }

  // =========================================================================
  // 3. Mobile Navigation Drawer & Overlay
  // =========================================================================
  const menuToggleBtn = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  const mobileOverlay = document.getElementById('mobile-overlay');
  const navLinks = document.querySelectorAll('.nav-link');

  function openMobileMenu() {
    menuToggleBtn.classList.add('active');
    menuToggleBtn.setAttribute('aria-expanded', 'true');
    navMenu.classList.add('active');
    mobileOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    menuToggleBtn.classList.remove('active');
    menuToggleBtn.setAttribute('aria-expanded', 'false');
    navMenu.classList.remove('active');
    mobileOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (menuToggleBtn && navMenu) {
    menuToggleBtn.addEventListener('click', () => {
      const isOpen = navMenu.classList.contains('active');
      if (isOpen) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });

    if (mobileOverlay) {
      mobileOverlay.addEventListener('click', closeMobileMenu);
    }

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        closeMobileMenu();
      });
    });
  }

  // =========================================================================
  // 4. Navbar Scroll Elevation & Scroll-To-Top Button
  // =========================================================================
  const navbar = document.getElementById('navbar');
  const scrollToTopBtn = document.getElementById('scroll-to-top');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    if (navbar) {
      if (scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    if (scrollToTopBtn) {
      if (scrollY > 400) {
        scrollToTopBtn.classList.add('show');
      } else {
        scrollToTopBtn.classList.remove('show');
      }
    }
  });

  if (scrollToTopBtn) {
    scrollToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // =========================================================================
  // 5. Active Section Tracking in Navigation
  // =========================================================================
  const sections = document.querySelectorAll('section[id]');

  function updateActiveNavLink() {
    const scrollPosition = window.scrollY + 120;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      const targetLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

      if (targetLink) {
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          navLinks.forEach(link => link.classList.remove('active'));
          targetLink.classList.add('active');
        }
      }
    });
  }

  window.addEventListener('scroll', updateActiveNavLink);
  updateActiveNavLink();

  // =========================================================================
  // 6. 1-Click Copy Email to Clipboard
  // =========================================================================
  const copyEmailBtn = document.getElementById('copy-email-btn');
  const copyTooltip = document.getElementById('copy-tooltip');
  const emailToCopy = 'prakarti.26bcon2416@jecrcu.edu.in';

  if (copyEmailBtn && copyTooltip) {
    copyEmailBtn.addEventListener('click', async () => {
      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(emailToCopy);
        } else {
          const textArea = document.createElement('textarea');
          textArea.value = emailToCopy;
          textArea.style.position = 'fixed';
          textArea.style.left = '-999999px';
          document.body.appendChild(textArea);
          textArea.focus();
          textArea.select();
          document.execCommand('copy');
          textArea.remove();
        }

        copyTooltip.textContent = 'Copied! 🌸';
        copyTooltip.classList.add('show');

        setTimeout(() => {
          copyTooltip.classList.remove('show');
          setTimeout(() => {
            copyTooltip.textContent = 'Copy';
          }, 200);
        }, 2200);
      } catch (err) {
        console.error('Failed to copy email:', err);
        copyTooltip.textContent = 'Failed';
        copyTooltip.classList.add('show');
        setTimeout(() => copyTooltip.classList.remove('show'), 2000);
      }
    });
  }

  // =========================================================================
  // 7. Interactive Message Form Validation & Mailto Generation
  // =========================================================================
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  if (contactForm) {
    const nameInput = document.getElementById('contact-name');
    const emailInput = document.getElementById('contact-email');
    const subjectInput = document.getElementById('contact-subject');
    const messageInput = document.getElementById('contact-message');

    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const subjectError = document.getElementById('subject-error');
    const messageError = document.getElementById('message-error');

    function validateEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      let isValid = true;

      nameError.classList.remove('show');
      emailError.classList.remove('show');
      subjectError.classList.remove('show');
      messageError.classList.remove('show');

      if (!nameInput.value.trim()) {
        nameError.classList.add('show');
        isValid = false;
      }

      if (!emailInput.value.trim() || !validateEmail(emailInput.value.trim())) {
        emailError.classList.add('show');
        isValid = false;
      }

      if (!subjectInput.value.trim()) {
        subjectError.classList.add('show');
        isValid = false;
      }

      if (!messageInput.value.trim()) {
        messageError.classList.add('show');
        isValid = false;
      }

      if (!isValid) {
        return;
      }

      const senderName = encodeURIComponent(nameInput.value.trim());
      const senderEmail = encodeURIComponent(emailInput.value.trim());
      const subject = encodeURIComponent(`[Portfolio Message] ${subjectInput.value.trim()}`);
      const body = encodeURIComponent(
        `Dear Prakarti,\n\n${messageInput.value.trim()}\n\nWarm regards,\n${nameInput.value.trim()}\nEmail: ${emailInput.value.trim()}`
      );

      const mailtoUrl = `mailto:prakarti.26bcon2416@jecrcu.edu.in?subject=${subject}&body=${body}`;

      formStatus.className = 'form-status-alert success';
      formStatus.innerHTML = `
        <strong>🌸 Thank you, ${nameInput.value.trim()}!</strong><br>
        Your note is prepared. Opening your default email client to send to <em>prakarti.26bcon2416@jecrcu.edu.in</em>...<br>
        <div style="margin-top: 10px;">
          <a href="${mailtoUrl}" class="btn btn-sm btn-pastel-magenta" style="display: inline-flex;">
            <span>Open Email App</span> <i class="fa-solid fa-paper-plane"></i>
          </a>
        </div>
      `;
      formStatus.style.display = 'block';

      setTimeout(() => {
        window.location.href = mailtoUrl;
      }, 700);

      contactForm.reset();
    });
  }

  // =========================================================================
  // 8. Scroll Reveal Animations (IntersectionObserver)
  // =========================================================================
  const revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.1,
      rootMargin: '0px 0px -30px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('active'));
  }
});
