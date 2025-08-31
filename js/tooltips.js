function applyTooltipsSetting() {
    const showTooltips = localStorage.getItem('showTooltips');
    const tooltipIcons = document.querySelectorAll('.tooltip-icon');

    tooltipIcons.forEach(icon => {
        if (showTooltips === 'false') {
            icon.style.display = 'none';
        } else {
            icon.style.display = 'inline-flex';
        }
    });
}


function adjustTooltipPosition(tooltip) {
    if (!tooltip) return;
    
    const rect = tooltip.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const padding = 15;
    
    
    tooltip.classList.remove('tooltip-left', 'tooltip-right', 'tooltip-top');
    

    if (rect.top < padding) {
        tooltip.classList.add('tooltip-top');
        tooltip.style.bottom = 'auto';
        tooltip.style.top = '100%';
        tooltip.style.marginBottom = '0';
        tooltip.style.marginTop = '8px';
    }
    

    if (rect.bottom > viewportHeight - padding) {
        if (!tooltip.classList.contains('tooltip-top')) {
            tooltip.classList.add('tooltip-top');
            tooltip.style.bottom = 'auto';
            tooltip.style.top = '100%';
            tooltip.style.marginBottom = '0';
            tooltip.style.marginTop = '8px';
        }
    }
    

    if (rect.right > viewportWidth - padding) {
        tooltip.classList.add('tooltip-left');
        tooltip.style.left = 'auto';
        tooltip.style.right = '0';
        tooltip.style.transform = 'translateX(0)';
    }
    

    if (rect.left < padding) {
        tooltip.classList.add('tooltip-right');
        tooltip.style.left = '0';
        tooltip.style.transform = 'translateX(0)';
    }
    

    if (!tooltip.classList.contains('tooltip-left') && 
        !tooltip.classList.contains('tooltip-right') && 
        !tooltip.classList.contains('tooltip-top')) {
        tooltip.style.left = '50%';
        tooltip.style.transform = 'translateX(-50%)';
    }
    

    setTimeout(() => {
        const newRect = tooltip.getBoundingClientRect();
        

        if (newRect.width > viewportWidth - 20) {
            tooltip.style.maxWidth = (viewportWidth - 20) + 'px';
        }
        
        if (newRect.height > viewportHeight - 20) {
            tooltip.style.maxHeight = (viewportHeight - 20) + 'px';
            tooltip.style.overflowY = 'auto';
        }
    }, 50);
}


function showTooltip(tooltip) {
    if (!tooltip) return;
    
    tooltip.style.opacity = '1';
    tooltip.style.visibility = 'visible';
    

    setTimeout(() => adjustTooltipPosition(tooltip), 10);
}


function hideTooltip(tooltip) {
    if (!tooltip) return;
    
    tooltip.style.opacity = '0';
    tooltip.style.visibility = 'hidden';
}


function initTooltips() {

    document.addEventListener('DOMContentLoaded', function() {
        applyTooltipsSetting();
        

        const tooltipIcons = document.querySelectorAll('.tooltip-icon');
        tooltipIcons.forEach(icon => {
            let hideTimeout;
            

            icon.addEventListener('mouseenter', function() {
                const tooltip = this.querySelector('.tooltip-content');
                if (tooltip) {
                    clearTimeout(hideTimeout);
                    showTooltip(tooltip);
                }
            });
            
            icon.addEventListener('mouseleave', function() {
                const tooltip = this.querySelector('.tooltip-content');
                if (tooltip) {
                    hideTimeout = setTimeout(() => hideTooltip(tooltip), 300);
                }
            });
            

            icon.addEventListener('touchstart', function(e) {
                e.preventDefault();
                const tooltip = this.querySelector('.tooltip-content');
                if (tooltip) {
                    clearTimeout(hideTimeout);
                    showTooltip(tooltip);
                    

                    hideTimeout = setTimeout(() => hideTooltip(tooltip), 3000);
                }
            });
            

            icon.addEventListener('focus', function() {
                const tooltip = this.querySelector('.tooltip-content');
                if (tooltip) {
                    clearTimeout(hideTimeout);
                    showTooltip(tooltip);
                }
            });
            
            icon.addEventListener('blur', function() {
                const tooltip = this.querySelector('.tooltip-content');
                if (tooltip) {
                    hideTimeout = setTimeout(() => hideTooltip(tooltip), 300);
                }
            });
        });
    });


    window.addEventListener('storage', function(e) {
        if (e.key === 'showTooltips') {
            applyTooltipsSetting();
        }
    });
    

    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            const visibleTooltips = document.querySelectorAll('.tooltip-content[style*="opacity: 1"]');
            visibleTooltips.forEach(tooltip => {
                adjustTooltipPosition(tooltip);
            });
        }, 100);
    });
    

    let scrollTimeout;
    window.addEventListener('scroll', function() {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            const visibleTooltips = document.querySelectorAll('.tooltip-content[style*="opacity: 1"]');
            visibleTooltips.forEach(tooltip => {
                adjustTooltipPosition(tooltip);
            });
        }, 50);
    });
}


initTooltips();
