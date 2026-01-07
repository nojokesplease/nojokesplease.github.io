// Danh sách câu "gắt" của anh Sea
const reasons = [
    "khi TÔI ĐANG HỎI",
    "trong CHỦ ĐỀ NÀY",
    "vì ĐANG TRONG CHỦ ĐỀ NHẠY CẢM",
    "vì NGƯỜI HỎI KHÔNG THÍCH ĐÙA",
    "vì LÀM THẾ LÀ BẤT LỊCH SỰ VỚI NGƯỜI HỎI",
    "trong THỜI GIAN NÀY. Hãy quay lại sau"
];

const container = document.getElementById('dynamic-container');

// Cấu hình hiệu ứng
let loopNum = 0;
let isDeleting = false;
let txtPrefix = '';
let txtContent = '';
let html = '';

// Tốc độ gõ (ms)
const typingSpeed = 50;
const deletingSpeed = 25;
const pauseEnd = 3000;
const pauseStart = 500;

function type() {
    const i = loopNum % reasons.length;
    const fullText = reasons[i];
    
    // Phân tích cú pháp: Tách prefix và content
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
    
    container.innerHTML = html;

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

document.addEventListener('DOMContentLoaded', type);

// Hàm copy link
function copyLink() {
    const url = window.location.href;
    
    // Tạo thẻ input tạm để copy
    const tempInput = document.createElement("input");
    tempInput.value = url;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);

    // Hiển thị thông báo
    const msg = document.getElementById('copy-msg');
    msg.classList.add('visible');
    setTimeout(() => {
        msg.classList.remove('visible');
    }, 2000);
}