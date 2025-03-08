$(document).ready(function () {
    // Toggle menu on click
    $('#menu').click(function () {
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });

    // Scroll and load event handling
    $(window).on('scroll load', function () {
        $('#menu').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');

        // Scroll to top button visibility
        if (window.scrollY > 60) {
            $('#scroll-top').addClass('active');
        } else {
            $('#scroll-top').removeClass('active');
        }

        // Scroll spy for navbar links
        $('section').each(function () {
            let height = $(this).height();
            let offset = $(this).offset().top - 200;
            let top = $(window).scrollTop();
            let id = $(this).attr('id');

            if (top > offset && top < offset + height) {
                $('.navbar ul li a').removeClass('active');
                $('.navbar').find(`[href="#${id}"]`).addClass('active');
            }
        });
    });

    // Smooth scrolling for anchor links
    $('a[href*="#"]').on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top,
        }, 500, 'linear');
    });

// Contact form submission
document.getElementById('contact-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent default form submission

    const formData = new URLSearchParams(new FormData(this));

    fetch('http://localhost:3000/send-email', { // Ensure the URL matches your server
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formData
    })
    .then(response => {
        console.log('Response Status:', response.status); // Log response status
        return response.json(); // Parse JSON response
    })
    .then(result => {
        console.log('Server response:', result); // Debugging
        if (result.status === 'success') { // Check status in JSON response
            alert('Form Submitted Successfully');
            document.getElementById('contact-form').reset(); // Reset the form
        } else {
            alert('Form Submitted Successfully');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Form Submitted Successfully');
    });
});


    

    // Change document title and favicon on visibility change
    document.addEventListener('visibilitychange', function () {
        if (document.visibilityState === "visible") {
            document.title = "Portfolio | Vikash Kumar";
            $("#favicon").attr("href", "assets/images/atom.png");
        } else {
            document.title = "Portfolio | Vikash Kumar";
            $("#favicon").attr("href", "assets/images/atom.png");
        }
    });

    // Typed.js effect for dynamic text
    new Typed(".typing-text", {
        strings: ["frontend development", "backend development", "Internet of Things", "Machine Learning"],
        loop: true,
        typeSpeed: 50,
        backSpeed: 25,
        backDelay: 500,
    });

    // Scroll reveal animations for various sections
    const srtop = ScrollReveal({
        origin: 'top',
        distance: '80px',
        duration: 1000,
        reset: true
    });

    srtop.reveal('.home .content h3', { delay: 200 });
    srtop.reveal('.home .content p', { delay: 200 });
    srtop.reveal('.home .content .btn', { delay: 200 });
    srtop.reveal('.home .image', { delay: 400 });
    srtop.reveal('.home .social-icons li', { interval: 200 });

    srtop.reveal('.about .content h3', { delay: 200 });
    srtop.reveal('.about .content .tag', { delay: 200 });
    srtop.reveal('.about .content p', { delay: 200 });
    srtop.reveal('.about .content .abuttons .btn', { delay: 200 });

    srtop.reveal('.skills .container', { interval: 200 });
    srtop.reveal('.skills .container .bar', { delay: 400 });

    srtop.reveal('.project .project-container', { interval: 200 });
    srtop.reveal('.project .project-container-2', { interval: 200 });
    srtop.reveal('.project .project-container-3', { interval: 200 });

    srtop.reveal('.contact .container', { delay: 400 });
    srtop.reveal('.contact .container .form-group', { delay: 400 });

    // Disable developer mode key shortcuts
    document.onkeydown = function (e) {
        if (e.keyCode == 123 || (e.ctrlKey && e.shiftKey && ['I', 'C', 'J'].includes(String.fromCharCode(e.keyCode))) || (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0))) {
            return true;
        }
    };
});
