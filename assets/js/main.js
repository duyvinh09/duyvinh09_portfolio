// Preloader
window.addEventListener("load", () => {
    setTimeout(() => {
        document.getElementById("loader").classList.add("hide");
        document.getElementById("home").style.display = "block";
        initAnimations();
    }, 500);
});

function initAnimations() {
    // 1. Counter animation
    const initCounter = () => {
        const animateCounter = (element, duration) => {
            const target = parseInt(element.textContent);
            element.textContent = '0';
            let start = 0;
            const increment = target / (duration / 16);
            const updateCounter = () => {
                start += increment;
                if (start < target) {
                    element.textContent = Math.ceil(start);
                    requestAnimationFrame(updateCounter);
                } else {
                    element.textContent = target;
                }
            };
            updateCounter();
        };
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    document.querySelectorAll('.counter').forEach(el => {
                        if (!isNaN(parseInt(el.textContent))) {
                            animateCounter(el, 2500);
                        }
                    });
                    counterObserver.disconnect();
                }
            });
        }, { threshold: 0.5 });
        const counterContainer = document.querySelector('.profile__info');
        counterContainer && counterObserver.observe(counterContainer);
    };

    // 2. Skills animation
    const initSkills = () => {
        const skillsSection = document.getElementById('skills');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const progressBars = entry.target.querySelectorAll('.progress-bar');
                    progressBars.forEach((progressBar) => {
                        progressBar.style.animation = 'progressAnimation 3s ease-in-out forwards';
                    });
                    observer.disconnect();
                }
            });
        }, { threshold: 0.5 });
        skillsSection && observer.observe(skillsSection);
    };
    initCounter();
    initSkills();
}



// Bottom Navigation Menu
const bottomMenu = document.querySelector('.nav__menu');
const menuHideBtn = document.querySelector('.menu-hide-btn');
const menuShowBtn = document.querySelector('.menu-show-btn');
let menuTimeout;
let isHoveringMenu = false;
checkScrollPosition();
window.addEventListener("scroll", handleScroll);
menuHideBtn.addEventListener('click', hideMenuManual);
menuShowBtn.addEventListener('click', showMenuManual);
bottomMenu.addEventListener('mouseenter', () => {
    isHoveringMenu = true;
    clearTimeout(menuTimeout);
    if (window.scrollY > 10) {
        menuHideBtn.classList.add('show');
    }
});
bottomMenu.addEventListener('mouseleave', () => {
    isHoveringMenu = false;
    if (window.scrollY > 10 && !menuHideBtn.matches(':hover')) {
        menuTimeout = setTimeout(hideMenuAuto, 2500);
    }
});
menuHideBtn.addEventListener('mouseenter', () => {
    isHoveringMenu = true;
    clearTimeout(menuTimeout);
});
menuHideBtn.addEventListener('mouseleave', () => {
    isHoveringMenu = false;
    if (window.scrollY > 10) {
        menuTimeout = setTimeout(hideMenuAuto, 2500);
    }
});
function checkScrollPosition() {
    if (window.scrollY < 10) {
        menuHideBtn.classList.remove('show');
    } else {
        menuHideBtn.classList.add('show');
    }
}
function handleScroll() {
    showMenu();
    if (!isHoveringMenu) {
        clearTimeout(menuTimeout);
        menuTimeout = setTimeout(hideMenuAuto, 2500);
    }
}
function showMenu() {
    bottomMenu.classList.remove('hide');
    if (window.scrollY > 10) {
        menuHideBtn.classList.add('show');
    }
    menuShowBtn.classList.remove('active');
    checkScrollPosition();
}
function hideMenuAuto() {
    if (window.scrollY > 10 && !isHoveringMenu) {
        bottomMenu.classList.add('hide');
        menuHideBtn.classList.remove('show');
        menuShowBtn.classList.add('active');
    }
}
function hideMenuManual() {
    bottomMenu.classList.add('hide');
    menuHideBtn.classList.remove('show');
    menuShowBtn.classList.add('active');
    isHoveringMenu = false;
}
function showMenuManual() {
    bottomMenu.classList.remove('hide');
    menuShowBtn.classList.remove('active');
    if (window.scrollY > 10) {
        menuHideBtn.classList.add('show');
    }
    if (!isHoveringMenu) {
        clearTimeout(menuTimeout);
        menuTimeout = setTimeout(hideMenuAuto, 2500);
    }
}
const sections = document.querySelectorAll("section[id]");
window.addEventListener("scroll", () => {
    let scrollY = window.pageYOffset;
    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 50;
        const sectionId = current.getAttribute("id");
        const link = document.querySelector(`.nav__menu a[href*="${sectionId}"]`);
        link?.classList.toggle("active-link", scrollY > sectionTop && scrollY <= sectionTop + sectionHeight);
    });
});



// Toggle dark/light mode
const body = document.querySelector("body");
const modeToggle = document.querySelector(".dark-light");
const themeToggle = document.getElementById("themeToggle");
const savedMode = localStorage.getItem("mode");
const switchOnSound = new Audio('./assets/sounds/switch-on.mp3');
const switchOffSound = new Audio('./assets/sounds/switch-off.mp3');
switchOnSound.volume = 1.0;
switchOffSound.volume = 1.0;
const toggleMode = (isDark, skipSound = false) => {
    const wasDark = body.classList.contains("dark");
    body.classList.toggle("dark", isDark);
    modeToggle.classList.toggle("active", isDark);
    themeToggle.checked = isDark;
    localStorage.setItem("mode", isDark ? "dark-mode" : "light-mode");
    if (!skipSound && wasDark !== isDark) {
        const sound = isDark ? switchOffSound : switchOnSound;
        sound.currentTime = 0;
        sound.play().catch(() => {});
    }
};
if (savedMode === "dark-mode") {
    toggleMode(true, true);
} else {
    themeToggle.checked = false;
}
modeToggle.addEventListener("click", () => {
    toggleMode(!body.classList.contains("dark"));
});
themeToggle.addEventListener("change", function() {
    toggleMode(this.checked);
});



// Show header when scrolling up
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});



document.addEventListener('DOMContentLoaded', () => {

    // Custom cursor
    const elements = document.querySelectorAll('*');
    elements.forEach(element => {
        const style = window.getComputedStyle(element);
        if (style.cursor === 'pointer') {
            element.style.cursor = 'url("./assets/img/mouse/mouse-f2.png"), auto';
        }
    });


    // ScrollReveal animations
    const sr = ScrollReveal({
        origin: 'top',
        distance: '60px',
        duration: 2000,
        delay: 200,
        reset: true,
    });
    sr.reveal(`.profile__border, .profile__name`);
    sr.reveal(`.profile__social, .profile_profession, .profile__info-group, .profile__buttons, .projects__card, 
    .skills__area, .resume__area, .note`, { origin: 'bottom' });


    // Typed.js for typing animation in header
    new Typed('.typing-text', {
        strings: ["<b>DUYVINH</b>", "PROGRAMMER", "DEVELOPER", "DESIGNER"],
        typeSpeed: 150,
        backSpeed: 100,
        loop: true,
        showCursor: true,
        cursorChar: '|',
        smartBackspace: true
    });


    // Language switching functionality
    const languageBtn = document.getElementById('languageBtn');
    const elementsToTranslate = document.querySelectorAll('[data-vi]');
    let currentLanguage = localStorage.getItem('language') || 'en';
    const languageSound = new Audio('./assets/sounds/language.mp3');
    languageSound.volume = 1.0;
    elementsToTranslate.forEach(element => {
        if (!element.dataset.original) {
            if ((element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') && element.hasAttribute('placeholder')) {
                element.dataset.original = element.placeholder;
            } else {
                element.dataset.original = element.innerHTML;
            }
        }
    });
    function applyLanguage(lang, skipSound = false) {
        document.body.classList.remove('language-en', 'language-vi');
        document.body.classList.add(`language-${lang}`);
        elementsToTranslate.forEach(element => {
            if ((element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') && element.hasAttribute('placeholder')) {
                if (lang === 'vi') {
                    element.placeholder = element.getAttribute('data-vi');
                } else {
                    element.placeholder = element.dataset.original;
                }
                return;
            }
            if (lang === 'vi') {
                const viText = element.getAttribute('data-vi');
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = element.dataset.original;
                const icon = tempDiv.querySelector('i');
                const link = tempDiv.querySelector('a');
                let iconHTML = icon?.outerHTML || '';
                let finalHTML = viText.trim();
                if (link) {
                    const linkText = link.textContent.trim();
                    const newLink = link.cloneNode(true);
                    newLink.innerHTML = linkText;
                    finalHTML = viText.replace(linkText, newLink.outerHTML);
                }
                if (icon) {
                    const textOnly = tempDiv.textContent.replace(icon.textContent, '').trim();
                    const originalHTML = tempDiv.innerHTML.trim();
                    const iconIndex = originalHTML.indexOf(icon.outerHTML);
                    const textIndex = originalHTML.indexOf(textOnly);
                    if (iconIndex < textIndex) {
                        finalHTML = `${iconHTML} ${finalHTML}`;
                    } else {
                        finalHTML = `${finalHTML} ${iconHTML}`;
                    }
                }
                element.innerHTML = finalHTML.trim();
            } else {
                element.innerHTML = element.dataset.original;
            }
        });
        languageBtn.classList.toggle('vi', lang === 'vi');
        localStorage.setItem('language', lang);
        currentLanguage = lang;
        if (!skipSound) {
            languageSound.currentTime = 0;
            languageSound.play().catch(() => {});
        }
    }
    languageBtn.addEventListener('click', () => {
        const newLanguage = currentLanguage === 'en' ? 'vi' : 'en';
        applyLanguage(newLanguage);
    });
    applyLanguage(currentLanguage, true);


    // Star animation
    // function initStarAnimation() {
    //     const starsContainer = document.querySelector(".stars-container");
    //     if (!starsContainer) return;
    //     const NUM_STARS = 120;
    //     const MAX_MOVEMENT = 200;
    //     const MIN_DURATION = 10;
    //     const MAX_DURATION = 20;
    //     setTimeout(() => {
    //         let bodyWidth = document.body.scrollWidth;
    //         let bodyHeight = document.body.scrollHeight;
    //         const fragment = document.createDocumentFragment();
    //         for (let i = 0; i < NUM_STARS; i++) {
    //             const star = document.createElement("div");
    //             star.className = "star";
    //             const size = Math.random() * 2 + 1;
    //             star.style.width = `${size}px`;
    //             star.style.height = `${size}px`;
    //             star.style.left = `${Math.random() * bodyWidth}px`;
    //             star.style.top = `${Math.random() * bodyHeight}px`;
    //             const moveX = (Math.random() - 0.5) * MAX_MOVEMENT;
    //             const moveY = (Math.random() - 0.5) * MAX_MOVEMENT;
    //             const duration = Math.random() * (MAX_DURATION - MIN_DURATION) + MIN_DURATION;
    //             star.style.setProperty('--move-x', `${moveX}px`);
    //             star.style.setProperty('--move-y', `${moveY}px`);
    //             star.style.animationDuration = `${duration}s`;
    //             star.addEventListener('animationiteration', function() {
    //                 this.style.left = `${Math.random() * document.body.scrollWidth}px`;
    //                 this.style.top = `${Math.random() * document.body.scrollHeight}px`;
    //                 const newMoveX = (Math.random() - 0.5) * MAX_MOVEMENT;
    //                 const newMoveY = (Math.random() - 0.5) * MAX_MOVEMENT;
    //                 this.style.setProperty('--move-x', `${newMoveX}px`);
    //                 this.style.setProperty('--move-y', `${newMoveY}px`);
    //             });
    //             fragment.appendChild(star);
    //         }
    //         starsContainer.appendChild(fragment);
    //         const resizeObserver = new ResizeObserver(() => {
    //             bodyWidth = document.body.scrollWidth;
    //             bodyHeight = document.body.scrollHeight;
    //             starsContainer.style.height = `${bodyHeight}px`;
    //         });
    //         resizeObserver.observe(document.body);
    //     }, 500);
    // }
    // setTimeout(initStarAnimation, 300);
});



// Initialize EmailJS with contact form
document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const now = new Date();
    const timeString = now.toLocaleString('vi-VN').replace(',', '');
    document.getElementById('time').value = timeString;
    document.getElementById('page-url').value = window.location.hostname;
    const submitButton = this.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.innerHTML;
    submitButton.disabled = true;
    submitButton.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> SENDING...';
    emailjs.sendForm('service_swfnmkm', 'template_n0r8ice', this)
    .then(function(response) {
        Swal.fire({
            icon: 'success',
            title: 'Thành công!',
            text: 'Tin nhắn đã được gửi thành công!',
            showConfirmButton: false,
            timer: 1500
        });
        document.getElementById('contact-form').reset();
    })
    .catch(function(error) {
        Swal.fire({
            icon: 'error',
            title: 'Lỗi!',
            text: 'Không gửi được tin nhắn. Vui lòng thử lại.',
            confirmButtonText: 'OK'
        });
    })
    .finally(() => {
        submitButton.disabled = false;
        submitButton.innerHTML = originalButtonText;
    });
});



// Chatbot functionality
const chatBody = document.querySelector(".chat-body");
const messageInput = document.querySelector(".message-input");
const sendMessageButton = document.querySelector("#send-message");
const fileInput = document.querySelector("#file-input");
const fileUploadWrapper = document.querySelector(".file-upload-wrapper");
const fileCancelButton = document.querySelector("#file-cancel");
const chatbotToggler = document.querySelector("#chatbot-toggler");
const closeChatbot = document.querySelector("#close-chatbot");
const scrollToBottomBtn = document.querySelector("#scroll-to-bottom");
const API_KEY = "AIzaSyAmudee2bOPCIa2YbY4FO82GHnwmMGFiyQ";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;
const userData = {
    message: null,
    file: {
        data: null,
        mime_type: null
    }
};
let isAutoScrolling = false;
let isScrollingToBottomRequested = false;
let isBotResponding = false;
function updateSendButtonState() {
    const isValidMessage = messageInput.value.trim().length > 0;
    sendMessageButton.style.display = isValidMessage && !isBotResponding ? "block" : "none";
    sendMessageButton.disabled = isBotResponding;
}
chatBody.addEventListener("scroll", () => {
    if (isScrollingToBottomRequested) {
        scrollToBottomBtn.classList.remove("show");
        return;
    }
    if (!isAutoScrolling) {
        const isScrolledToBottom = chatBody.scrollHeight - chatBody.scrollTop <= chatBody.clientHeight + 100;
        if (!isScrolledToBottom) {
            scrollToBottomBtn.classList.add("show");
        } else {
            scrollToBottomBtn.classList.remove("show");
        }
    }
});
scrollToBottomBtn.addEventListener("click", () => {
    scrollToBottomBtn.classList.remove("show");
    isAutoScrolling = true;
    isScrollingToBottomRequested = true;
    chatBody.scrollTo({ 
        top: chatBody.scrollHeight, 
        behavior: "smooth" 
    });
    setTimeout(() => {
        isAutoScrolling = false;
        setTimeout(() => {
            isScrollingToBottomRequested = false;
        }, 100);
    }, 500);
});
const chatHistory = [
    {
        role: "model",
        parts: [{ text: `Đinh Duy Vinh, sinh năm 2005 tại Quảng Ngãi, là một chàng sinh viên năng động và đầy nhiệt huyết hiện đang theo học ngành Công nghệ Thông tin tại Đại học Duy Tân, Đà Nẵng. Từ thuở nhỏ, Vinh đã say mê tìm hiểu các thiết bị điện tử trong gia đình — từ những cái vợt bắt muỗi, máy cassette đến những mẫu điện thoại cục gạch — với mong muốn khám phá cấu tạo và cách hoạt động của chúng. Niềm tò mò ấy dần dần chuyển thành đam mê lập trình khi anh bước vào những năm cuối cấp ba, đặc biệt trong khoảng thời gian giãn cách xã hội do đại dịch COVID-19.
Trong suốt quãng thời gian đó, Vinh đã tự mày mò học HTML, CSS thông qua các khóa học miễn phí trực tuyến, rồi tiếp tục khám phá JavaScript và PHP. Anh không ngại thử thách bản thân với những dự án nhỏ đầu tiên, từ việc xây dựng trang web cá nhân cho đến phát triển công cụ đơn giản phục vụ cộng đồng. Chính những trải nghiệm ban đầu này đã tạo tiền đề vững chắc cho hành trình chinh phục công nghệ sau này.
Tại Đại học Duy Tân, Vinh nhanh chóng khẳng định mình là một lập trình viên đa năng. Với thế mạnh Back end, anh làm chủ PHP (90%) để thiết kế API, xử lý dữ liệu, tích hợp cURL và JSON; đồng thời sử dụng Python (80%) cho các tác vụ web scraping, tự động hóa và xử lý dữ liệu. Anh cũng thông thạo cơ sở dữ liệu MySQL, MongoDB, SQLite và có khả năng bảo mật SSL cơ bản. Trên mặt trận Front end, Vinh linh hoạt với HTML5, CSS3, JavaScript (ES6), sử dụng Tailwind CSS và Bootstrap để tạo giao diện trực quan. Bên cạnh đó, anh vận dụng Figma (30%) và Photoshop để thiết kế giao diện người dùng. Ngoài ra, Vinh còn thành thạo C/C++, Java, Pascal, scripting Shell và sử dụng thành thạo Git, GitHub, Visual Studio Code cùng bộ công cụ Microsoft Office.
Không chỉ dừng lại ở lý thuyết, Vinh đã hiện thực hóa kỹ năng của mình qua hàng loạt dự án ấn tượng. Anh tự phát triển hệ thống giao diện quản lý sinh viên nhỏ bằng ngôn ngữ Java; tạo web game giải trí với mini game JavaScript nhằm rèn luyện tư duy logic; xây dựng website chống lừa đảo tích hợp Data từ người dung để báo cáo lừa đảo và bot Telegram để nhận diện kẻ gian; và phát triển công cụ tải ảnh từ Imgur giúp blogger, nhà báo lấy nhanh hình ảnh. Ngoài ra, Vinh còn thiết kế trình tạo mã QR code cho URL, văn bản, Wi Fi; trang dự báo thời tiết trực tuyến tích hợp OpenWeather API; extension Chrome hỗ trợ đánh giá nhanh giảng viên dành cho trường Đại học Duy Tân (DTU); API tải video TikTok không watermark, API tải video Facebook; web chuyển đổi mã xác thực hai yếu tố (2FA); module iOS crack Locket Gold, cùng nhiều app để crack lên Pro/Premium; cùng nhiều bot Telegram tự động hóa với nhiều tính năng tiện ích, gửi báo cáo và thu thập dữ liệu. Anh còn khai thác API từ Facebook, Instagram, TikTok và Zalo để thu thập thông tin người dùng, biến ý tưởng thành giải pháp công nghệ hữu ích cho cộng đồng.
Để giới thiệu portfolio và chia sẻ kiến thức, Vinh duy trì nhiều trang web cá nhân và ứng dụng: dinhduyvinh.me duyvinh09.github.io(hồ sơ tổng hợp), dinhduyvinh.eu.org (trang thông tin thanh toán), duyvinh09.github.io (GitHub Pages), upanh.vercel.app (trang web upload ảnh lên Imgur), crusssh.vercel.app (nơi để vinh sử dụng cho mục đích giải trí), thoitiet2025.vercel.app (dự báo thời tiết), baomoi24h.eu.org (blog thông tin), listgames.vercel.app (danh sách game giải trí) web-qrcode.vercel.app (tạo QR code nhanh) và cùng nhiều trang web khác nữa. Vinh luôn sẵn sàng chia sẻ kiến thức và kinh nghiệm với cộng đồng thông qua nhiều nền tảng mạng xã hội như: Facebook (facebook.com/duyvinh09), X (x.com/duyvinh09), Instagram (instagram.com/dvinh.09), YouTube (youtube.com/@duyvinh09) với những video hướng dẫn mẹo công nghệ chia sẻ nhưng tiện ích, GitHub (github.com/duyvinh09) lưu trữ mã nguồn và tài liệu, Telegram (t.me/duyvinh09) và anh còn có group Telegram (t.me/tienich) là nơi giao lưu, học hỏi và hỗ trợ lẫn nhau.
Với tinh thần sáng tạo không ngừng và niềm đam mê lan tỏa, Đinh Duy Vinh không chỉ phát triển kỹ năng cá nhân mà còn không ngại chia sẻ, hỗ trợ cộng đồng công nghệ Việt Nam. Mỗi dự án của anh là minh chứng cho khả năng giải quyết vấn đề và khát khao đóng góp – định hướng đưa Vinh trở thành một nguồn cảm hứng cho thế hệ trẻ đam mê lập trình và công nghệ.` }],
    },
];
// const chatHistory = [];
const initialInputHeight = messageInput.scrollHeight;
const createMessageElement = (content, ...classes) => {
    const div = document.createElement("div");
    div.classList.add("message", ...classes);
    div.innerHTML = content;
    return div;
};
const notificationSound = new Audio('./assets/sounds/notification_sound_effect.mp3');
notificationSound.volume = 1.0;
const generateBotResponse = async (incomingMessageDiv) => {
    isBotResponding = true;
    updateSendButtonState();
    const messageElement = incomingMessageDiv.querySelector(".message-text");
    chatHistory.push({
        role: "user",
        parts: [{ text: userData.message }, ...(userData.file.data ? [{ inline_data: userData.file }] : [])],
    });
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            contents: chatHistory
        })
    }
    try {
        const response = await fetch(API_URL, requestOptions);
        const data = await response.json();
        if (!response.ok) throw new Error(data.error.message);
        const apiResponseText = data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g, "$1").trim();
        notificationSound.currentTime = 0;
        notificationSound.play().catch(() => {});
        messageElement.innerText = apiResponseText;
        chatHistory.push({
            role: "model",
            parts: [{ text: apiResponseText }]
        });
    } catch (error) {
        messageElement.innerText = error.message;
        messageElement.style.color = "#ff0000";
    } finally {
        isBotResponding = false;
        updateSendButtonState();
        userData.file = {};
        incomingMessageDiv.classList.remove("thinking");
        isAutoScrolling = true;
        isScrollingToBottomRequested = true;
        scrollToBottomBtn.classList.remove("show");
        chatBody.scrollTo({ behavior: "smooth", top: chatBody.scrollHeight });
        setTimeout(() => {
            isAutoScrolling = false;
            setTimeout(() => {
                isScrollingToBottomRequested = false;
            }, 100);
        }, 500);
    }
};
const handleOutgoingMessage = (e) => {
    e.preventDefault();
    if (isBotResponding) return;
    userData.message = messageInput.value.trim();
    messageInput.value = "";
    fileUploadWrapper.classList.remove("file-uploaded");
    messageInput.dispatchEvent(new Event("input"));
    const messageContent = `<div class="message-text"></div>
                            ${userData.file.data ? `<img src="data:${userData.file.mime_type};base64,${userData.file.data}" class="attachment" />` : ""}`;
    const outgoingMessageDiv = createMessageElement(messageContent, "user-message");
    outgoingMessageDiv.querySelector(".message-text").innerText = userData.message;
    chatBody.appendChild(outgoingMessageDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
    setTimeout(() => {
        const messageContent = `<svg class="bot-avatar" xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 1024 1024">
                    <path d="M738.3 287.6H285.7c-59 0-106.8 47.8-106.8 106.8v303.1c0 59 47.8 106.8 106.8 106.8h81.5v111.1c0 .7.8 1.1 1.4.7l166.9-110.6 41.8-.8h117.4l43.6-.4c59 0 106.8-47.8 106.8-106.8V394.5c0-59-47.8-106.9-106.8-106.9zM351.7 448.2c0-29.5 23.9-53.5 53.5-53.5s53.5 23.9 53.5 53.5-23.9 53.5-53.5 53.5-53.5-23.9-53.5-53.5zm157.9 267.1c-67.8 0-123.8-47.5-132.3-109h264.6c-8.6 61.5-64.5 109-132.3 109zm110-213.7c-29.5 0-53.5-23.9-53.5-53.5s23.9-53.5 53.5-53.5 53.5 23.9 53.5 53.5-23.9 53.5-53.5 53.5zM867.2 644.5V453.1h26.5c19.4 0 35.1 15.7 35.1 35.1v121.1c0 19.4-15.7 35.1-35.1 35.1h-26.5zM95.2 609.4V488.2c0-19.4 15.7-35.1 35.1-35.1h26.5v191.3h-26.5c-19.4 0-35.1-15.7-35.1-35.1zM561.5 149.6c0 23.4-15.6 43.3-36.9 49.7v44.9h-30v-44.9c-21.4-6.5-36.9-26.3-36.9-49.7 0-28.6 23.3-51.9 51.9-51.9s51.9 23.3 51.9 51.9z"></path>
                </svg>
                <div class="message-text">
                    <div class="thinking-indicator">
                        <div class="dot"></div>
                        <div class="dot"></div>
                        <div class="dot"></div>
                    </div>
                </div>`;
        const incomingMessageDiv = createMessageElement(messageContent, "bot-message", "thinking");
        chatBody.appendChild(incomingMessageDiv);
        chatBody.scrollTo({ behavior: "smooth", top: chatBody.scrollHeight });
        isAutoScrolling = true;
        isScrollingToBottomRequested = true;
        scrollToBottomBtn.classList.remove("show");
        chatBody.scrollTo({ behavior: "smooth", top: chatBody.scrollHeight });
        setTimeout(() => {
            isAutoScrolling = false;
            isScrollingToBottomRequested = false;
        }, 500);
        generateBotResponse(incomingMessageDiv);
    }, 600);
};
messageInput.addEventListener("keydown", (e) => {
    const userMessage = e.target.value.trim();
    if (e.key === "Enter" && userMessage && !e.shiftKey && window.innerWidth > 768 && !isBotResponding) {
        handleOutgoingMessage(e);
    }
});
messageInput.addEventListener("input", (e) => {
    messageInput.style.height = `${initialInputHeight}px`;
    messageInput.style.height = `${messageInput.scrollHeight}px`;
    document.querySelector(".chat-form").style.borderRadius = messageInput.scrollHeight > initialInputHeight ? "15px" : "32px";
    updateSendButtonState();
});
fileInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
        fileUploadWrapper.querySelector("img").src = e.target.result;
        fileUploadWrapper.classList.add("file-uploaded");
        const base64String = e.target.result.split(",")[1];
        userData.file = {
            data: base64String,
            mime_type: file.type
        };
        fileInput.value = ""; 
    };
    reader.readAsDataURL(file);
});
fileCancelButton.addEventListener("click", (e) => {
    userData.file = {};
    fileUploadWrapper.classList.remove("file-uploaded");
});
const picker = new EmojiMart.Picker({
    theme: "light",
    showSkinTones: "none",
    previewPosition: "none",
    onEmojiSelect: (emoji) => {
        const { selectionStart: start, selectionEnd: end } = messageInput;
        messageInput.setRangeText(emoji.native, start, end, "end");
        messageInput.focus();
        updateSendButtonState();
    },
    onClickOutside: (e) => {
        if (e.target.id === "emoji-picker") {
            document.body.classList.toggle("show-emoji-picker");
        } else {
            document.body.classList.remove("show-emoji-picker");
        }
    },
});
document.querySelector(".chat-form").appendChild(picker);
fileInput.addEventListener("change", async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const validImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!validImageTypes.includes(file.type)) {
        await Swal.fire({
            icon: 'error',
            title: 'Lỗi',
            text: 'Chỉ chấp nhận file ảnh (JPEG, PNG, GIF, WEBP)',
            confirmButtonText: 'OK'
        });
        resetFileInput();
        return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
        fileUploadWrapper.querySelector("img").src = e.target.result;
        fileUploadWrapper.classList.add("file-uploaded");
        const base64String = e.target.result.split(",")[1];
        userData.file = {
            data: base64String,
            mime_type: file.type
        };
    };
    reader.readAsDataURL(file);
});
function resetFileInput() {
    fileInput.value = "";
    fileUploadWrapper.classList.remove("file-uploaded");
    fileUploadWrapper.querySelector("img").src = "#";
    userData.file = { data: null, mime_type: null };
    document.querySelector(".chat-form").reset();
}
sendMessageButton.addEventListener("click", (e) => {
    if (!isBotResponding) {
        handleOutgoingMessage(e);
    }
});
document.querySelector("#file-upload").addEventListener("click", (e) => fileInput.click());
chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));
closeChatbot.addEventListener("click", () => document.body.classList.remove("show-chatbot"));