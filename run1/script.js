let isScrolled = false;
let startY = null;
let currentY = null;
let isAnimating = false;

// 桌面端：滚轮事件
window.addEventListener('wheel', (e) => {
    if (isAnimating) return;
    isAnimating = true;

    // 向下滚动时触发切换
    if (e.deltaY > 0 && !isScrolled) {
        isScrolled = true;
        document.querySelector('.title-section').style.transform = 'translateY(-100%)';
        document.querySelector('.content-section').style.top = '0';
    } 
    // 向上滚动时返回
    else if (e.deltaY < 0 && isScrolled) {
        isScrolled = false;
        document.querySelector('.title-section').style.transform = 'translateY(0)';
        document.querySelector('.content-section').style.top = '100vh';
    }

    // 重置动画状态
    setTimeout(() => {
        isAnimating = false;
    }, 500);
}, { passive: false });

// 移动端：触摸事件
window.addEventListener('touchstart', (e) => {
    if (isAnimating) return;
    startY = e.touches[0].clientY;
}, { passive: false });

window.addEventListener('touchmove', (e) => {
    if (!startY || isAnimating) return;
    currentY = e.touches[0].clientY;
    const deltaY = currentY - startY;

    // 实时拖动效果
    if (deltaY < 0) {
        document.querySelector('.title-section').style.transform = `translateY(${deltaY}px)`;
        document.querySelector('.content-section').style.top = `${100 + (deltaY / 33.33)}vh`;
    }
}, { passive: false });

window.addEventListener('touchend', (e) => {
    if (!startY || isAnimating) return;
    isAnimating = true;

    const deltaY = currentY - startY;
    const minDelta = -50;
    const velocity = Math.abs(deltaY / 300); // 简化速度计算

    // 判断最终方向
    if (deltaY < minDelta || velocity > 0.3) {
        isScrolled = true;
        document.querySelector('.title-section').style.transform = 'translateY(-100%)';
        document.querySelector('.content-section').style.top = '0';
    } else {
        isScrolled = false;
        document.querySelector('.title-section').style.transform = 'translateY(0)';
        document.querySelector('.content-section').style.top = '100vh';
    }

    // 重置状态
    setTimeout(() => {
        isAnimating = false;
        startY = null;
        currentY = null;
    }, 500);
});