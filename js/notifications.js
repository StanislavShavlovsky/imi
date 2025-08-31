document.addEventListener('DOMContentLoaded', function() {
    
    const tabButtons = document.querySelectorAll('.notifications-tab-btn');
    
    tabButtons.forEach(btn => {
      btn.addEventListener('click', function() {
        
        tabButtons.forEach(b => b.classList.remove('active'));
        
        this.classList.add('active');
        
        
        const tabType = this.getAttribute('data-tab');
        filterNotifications(tabType);
      });
    });
});


function filterNotifications(tabType) {
  const notifications = document.querySelectorAll('.notification-card');
  
  notifications.forEach(notification => {
    if (tabType === 'latest' || tabType === 'all') {
      notification.style.display = 'flex';
    } else {
      
      notification.style.display = 'flex';
    }
  });
} 