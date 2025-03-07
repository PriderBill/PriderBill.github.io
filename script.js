let isScrolled = false; // 标记是否已滚动切换

window.addEventListener('wheel', (e) => {
    if (isScrolled) return; // 防止重复触发

    // 检测滚动方向（deltaY > 0 表示向下滚动）
    if (e.deltaY > 0) {
        isScrolled = true;
        
        // 移动标题到屏幕外上方
        document.querySelector('.title-section').style.transform = 'translateY(-100%)';
        
        // 移动内容区域到视口
        document.querySelector('.content-section').style.top = '0';
        
        // 可选：禁用后续滚动事件
        document.body.style.overflow = 'hidden';
    }
}, { passive: false }); // passive: false 确保 preventDefault 有效

// 在 script.js 中添加
window.addEventListener('wheel', (e) => {
    if (e.deltaY < 0 && isScrolled) {
        isScrolled = false;
        document.querySelector('.title-section').style.transform = 'translateY(0)';
        document.querySelector('.content-section').style.top = '100vh';
        document.body.style.overflow = 'auto';
    }
});

let startY;
window.addEventListener('touchstart', (e) => {
    startY = e.touches[0].clientY;
});

window.addEventListener('touchmove', (e) => {
    if (!startY) return;
    
    const deltaY = e.touches[0].clientY - startY;
    if (deltaY < -50 && !isScrolled) { // 向上滑动
        isScrolled = true;
        document.querySelector('.title-section').style.transform = 'translateY(-100%)';
        document.querySelector('.content-section').style.top = '0';
    } else if (deltaY > 50 && isScrolled) { // 向下滑动
        isScrolled = false;
        document.querySelector('.title-section').style.transform = 'translateY(0)';
        document.querySelector('.content-section').style.top = '100vh';
    }
    startY = null;
});