let isScrolled = false;
let startY = null;
let currentY = null;
let isAnimating = false;

// 桌面端滚轮逻辑
window.addEventListener('wheel', (e) => {
    if (isAnimating) return;
    isAnimating = true;

    if (e.deltaY > 0 && !isScrolled) {
        isScrolled = true;
        moveToContent();
    } else if (e.deltaY < 0 && isScrolled) {
        isScrolled = false;
        moveToTitle();
    }

    setTimeout(() => isAnimating = false, 500);
}, { passive: false });

// 移动端触摸逻辑
window.addEventListener('touchstart', (e) => {
    if (isAnimating) return;
    startY = e.touches[0].clientY;
}, { passive: false });

window.addEventListener('touchmove', (e) => {
    if (!startY || isAnimating) return;
    currentY = e.touches[0].clientY;
    const deltaY = currentY - startY;

    if (Math.abs(deltaY) > 10) e.preventDefault();

    if (!isScrolled && deltaY < 0) {
        document.querySelector('.title-section').style.transform = `translateY(${deltaY}px)`;
        document.querySelector('.content-section').style.top = `${100 + (deltaY / 33.33)}vh`;
    } else if (isScrolled && deltaY > 0) {
        document.querySelector('.title-section').style.transform = `translateY(${deltaY - 100}px)`;
    }
}, { passive: false });

window.addEventListener('touchend', (e) => {
    if (!startY || isAnimating) return;
    isAnimating = true;

    const deltaY = currentY - startY;
    const minDelta = 50;

    if (!isScrolled && deltaY < -minDelta) {
        isScrolled = true;
        moveToContent();
    } else if (isScrolled && deltaY > minDelta) {
        isScrolled = false;
        moveToTitle();
    } else {
        if (isScrolled) moveToContent();
        else moveToTitle();
    }

    setTimeout(() => {
        isAnimating = false;
        startY = null;
        currentY = null;
    }, 500);
});

// 统一动画函数
function moveToContent() {
    document.querySelector('.title-section').style.transform = 'translateY(-100%)';
    document.querySelector('.content-section').style.top = '0';
}

function moveToTitle() {
    document.querySelector('.title-section').style.transform = 'translateY(0)';
    document.querySelector('.content-section').style.top = '100vh';
}
