document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('header');
    const navUl = document.querySelector('nav ul');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelectorAll('nav ul li a');
    const backToTopBtn = document.getElementById('backToTopBtn');
    
    // Set Tahun Saat Ini di Footer
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // Fungsi untuk Header Berubah saat Scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
            backToTopBtn.classList.add('active');
        } else {
            header.classList.remove('scrolled');
            backToTopBtn.classList.remove('active');
        }
    });

    // Toggle Menu Hamburger
    hamburger.addEventListener('click', () => {
        navUl.classList.toggle('active');
        // Mengganti ikon hamburger menjadi close (opsional)
        const icon = hamburger.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });

    // Menutup Menu Mobile saat Tautan Diklik
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navUl.classList.contains('active')) {
                navUl.classList.remove('active');
                const icon = hamburger.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
            
            // Logika untuk menandai link aktif
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });

    // Logika untuk menandai link aktif saat halaman dimuat (untuk home)
    const setActiveLink = () => {
        let currentSection = 'home';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100; // Offset untuk penyesuaian
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === currentSection) {
                link.classList.add('active');
            }
        });
    };
    
    // Jalankan saat scroll dan load
    window.addEventListener('scroll', setActiveLink);
    window.addEventListener('load', setActiveLink);

    // Smooth scroll for nav links and back-to-top button
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    /* Fungsionalitas Typing Effect (Animated Text) - Dibuat dengan CSS di file asli, 
       disini saya hanya membiarkan CSS yang bekerja, tetapi jika Anda ingin 
       membuatnya lebih dinamis dengan JS, Anda bisa menggunakan kode berikut:
    
    const typingTextElement = document.querySelector('.hero-content h1');
    const textToType = 'Halo, Saya Muhammad Rifqi Fathurrahman';
    typingTextElement.textContent = ''; // Kosongkan teks awal
    
    let charIndex = 0;
    function type() {
        if (charIndex < textToType.length) {
            typingTextElement.textContent += textToType.charAt(charIndex);
            charIndex++;
            setTimeout(type, 100); // Kecepatan mengetik
        }
    }
    // type(); // Uncomment ini jika ingin menggunakan typing effect dari JS
    */
});
