// --- PHẦN 1: CẤU HÌNH NGÔN NGỮ (DICTIONARY) ---
const defaultLang = 'en';

const translations = {
    vi: {
        reasons: [
            "khi TÔI ĐANG HỎI",
            "trong CHỦ ĐỀ NÀY",
            "vì ĐANG LÀ CHỦ ĐỀ NHẠY CẢM",
            "vì NGƯỜI HỎI KHÔNG THÍCH ĐÙA",
            "vì LÀM THẾ LÀ BẤT LỊCH SỰ",
            "trong THỜI GIAN NÀY. Hãy quay lại sau"
        ],
        copySuccess: "Đã sao chép!",
    },
    en: {
        reasons: [
            "when I AM ASKING",
            "in THIS THREAD",
            "because THIS IS SENSITIVE",
            "because THE ASKER IS SERIOUS",
            "as IT IS DISRESPECTFUL",
            "at THIS MOMENT. Come back later"
        ],
        copySuccess: "Copied!",
    }
};

const otherLangs = Object.keys(translations).filter(lang => lang !== defaultLang);


// --- PHẦN 2: TỰ ĐỘNG CHUYỂN HƯỚNG (AUTO REDIRECT) ---
function autoRedirect() {
    // 1. Kiểm tra session xem đã redirect chưa
    if (sessionStorage.getItem('lang_redirected_session')) {
        return;
    }

    const userLang = navigator.language || navigator.userLanguage;
    const path = window.location.pathname;

    // 2. Tìm ngôn ngữ mục tiêu
    const targetLang = otherLangs.find(lang => userLang.startsWith(lang));

    // 3. Logic: Nếu tìm thấy ngôn ngữ mục tiêu VÀ đang KHÔNG ở trang đó
    if (targetLang && !path.includes(`/${targetLang}/`)) {

        // Đánh dấu session để không redirect lại nữa
        sessionStorage.setItem('lang_redirected_session', 'true');

        // Đánh dấu "vừa mới redirect xong" để hiện thông báo
        sessionStorage.setItem('just_redirected_flag', 'true');

        // Chuyển hướng
        window.location.href = `/${targetLang}/`;
    }
}

// --- PHẦN 3: HIỂN THỊ THÔNG BÁO SAU KHI CHUYỂN HƯỚNG ---
function checkRedirectMessage() {
    // Chỉ chạy nếu có cờ "just_redirected_flag"
    if (sessionStorage.getItem('just_redirected_flag') === 'true') {

        // Vì navbar nằm trong iframe, ta phải gửi tin nhắn vào iframe đó
        // Đợi một chút để iframe load xong
        const iframe = document.querySelector('iframe');

        if (iframe) {
            iframe.onload = function () {
                iframe.contentWindow.postMessage('showRedirectMessage', '*');
            };
            // Phòng trường hợp iframe đã load xong trước khi script chạy
            if (iframe.contentWindow) {
                iframe.contentWindow.postMessage('showRedirectMessage', '*');
            }
        }

        // Xóa cờ ngay lập tức để F5 không hiện lại
        sessionStorage.removeItem('just_redirected_flag');
    }
}

// Gọi hàm redirect (nếu chưa redirect)
autoRedirect();

// --- PHẦN 4: TEXT ANIMATION & LOGIC (GIỮ NGUYÊN) ---

function detectLanguage() {
    const path = window.location.pathname;
    const foundLang = otherLangs.find(lang => path.includes(`/${lang}/`));
    if (foundLang) return foundLang;
    return defaultLang;
}

const currentLang = detectLanguage();
const config = translations[currentLang] || translations[defaultLang];
const reasons = config.reasons;

const container = document.getElementById('dynamic-container');

let loopNum = 0;
let isDeleting = false;
let txtPrefix = '';
let txtContent = '';
let html = '';

const typingSpeed = 50;
const deletingSpeed = 25;
const pauseEnd = 3000;
const pauseStart = 500;

function type() {
    if (!reasons || reasons.length === 0) return;

    const i = loopNum % reasons.length;
    const fullText = reasons[i];

    let fullPrefix = "";
    let fullContent = "";
    const firstSpace = fullText.indexOf(' ');

    if (firstSpace !== -1) {
        fullPrefix = fullText.substring(0, firstSpace);
        fullContent = fullText.substring(firstSpace + 1);
    } else {
        fullContent = fullText;
    }

    if (isDeleting) {
        if (txtContent.length > 0) {
            txtContent = fullContent.substring(0, txtContent.length - 1);
        } else if (txtPrefix.length > 0) {
            txtPrefix = fullPrefix.substring(0, txtPrefix.length - 1);
        }
    } else {
        if (txtPrefix.length < fullPrefix.length) {
            txtPrefix = fullPrefix.substring(0, txtPrefix.length + 1);
        } else if (txtContent.length < fullContent.length) {
            txtContent = fullContent.substring(0, txtContent.length + 1);
        }
    }

    html = '';
    if (fullPrefix) {
        html += `<span class="prefix">${txtPrefix}</span> `;
    }
    html += `<span class="content">${txtContent}</span>`;

    if (container) {
        container.innerHTML = html;
    }

    let delta = isDeleting ? deletingSpeed : typingSpeed;

    if (!isDeleting) delta += Math.random() * 50;

    if (!isDeleting && txtPrefix === fullPrefix && txtContent === fullContent) {
        delta = pauseEnd;
        isDeleting = true;
    } else if (isDeleting && txtPrefix === '' && txtContent === '') {
        isDeleting = false;
        loopNum++;
        delta = pauseStart;
    }

    setTimeout(type, delta);
}

document.addEventListener('DOMContentLoaded', () => {
    // Gọi hàm check tin nhắn sau khi DOM đã load
    checkRedirectMessage();

    if (container) {
        type();
    }
});

function copyLink() {
    const url = window.location.href;
    const tempInput = document.createElement("textarea");
    tempInput.value = url;
    tempInput.style.position = "fixed";
    tempInput.style.opacity = "0";
    document.body.appendChild(tempInput);
    tempInput.focus();
    tempInput.select();
    try {
        document.execCommand("copy");
        const msg = document.getElementById('copy-msg');
        if (msg) {
            msg.innerText = config.copySuccess;
            msg.classList.add('visible');
            setTimeout(() => {
                msg.classList.remove('visible');
            }, 2000);
        }
    } catch (err) {
        console.error('Không thể copy', err);
    }
    document.body.removeChild(tempInput);
}

// --- PHẦN 5: AUTO RESIZE IFRAME (MỚI) ---
window.addEventListener('message', function (event) {
    if (event.data && event.data.type === 'setHeight') {
        const iframe = document.querySelector('iframe');
        if (iframe) {
            iframe.style.height = event.data.height + 'px';
        }
    }
});
