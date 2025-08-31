let undoSystemInitialized = false;


function initializeUndoSystem() {
  if (undoSystemInitialized) return;
  
  const floatingUndoBtn = document.getElementById('floatingUndoBtn');
  const floatingUndoContainer = document.getElementById('floatingUndoContainer');
  
  if (floatingUndoBtn && floatingUndoContainer) {

    checkUndoAvailability();
    

    floatingUndoBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      const lastActionData = localStorage.getItem('lastAction');
      if (lastActionData) {
        undoLastAction();
      } else {
        showSimpleNotification('Нет действий для отмены');
      }
    });
    

    setTimeout(() => {
      floatingUndoContainer.classList.add('visible');
    }, 500);
    
    undoSystemInitialized = true;
  }
}


function checkUndoAvailability() {
  const lastActionData = localStorage.getItem('lastAction');
  if (lastActionData) {

    enableUndoButton();
  } else {
    disableUndoButton();
  }
}


function enableUndoButton() {
  const floatingUndoContainer = document.getElementById('floatingUndoContainer');
  if (floatingUndoContainer) {
    floatingUndoContainer.classList.remove('disabled');
    floatingUndoContainer.classList.add('visible');
  }
}


function disableUndoButton() {
  const floatingUndoContainer = document.getElementById('floatingUndoContainer');
  if (floatingUndoContainer) {
    floatingUndoContainer.classList.add('disabled');
    floatingUndoContainer.classList.remove('visible');
  }
}


function updateUndoButtonState() {
  checkUndoAvailability();
}


function undoLastAction() {
  const lastActionData = localStorage.getItem('lastAction');
  if (lastActionData) {
    const lastAction = JSON.parse(lastActionData);
    

    if (lastAction.type === 'approve') {

      restoreProductCard(lastAction.productName);
      showSimpleNotification(`Действие отменено: товар "${lastAction.productName}" не был одобрен`);
    }
    

    localStorage.removeItem('lastAction');
    

    const notification = document.getElementById('approvalNotification');
    if (notification) {
      if (notification.countdown) {
        clearInterval(notification.countdown);
      }
      notification.style.animation = 'slideOutRight 0.3s ease';
      setTimeout(() => {
        if (document.body.contains(notification)) {
          document.body.removeChild(notification);
        }
      }, 300);
    }
    

    const floatingUndoContainer = document.getElementById('floatingUndoContainer');
    if (floatingUndoContainer) {
      floatingUndoContainer.classList.add('disabled');
      floatingUndoContainer.classList.remove('visible');
    }
  } else {
    showSimpleNotification('Нет действий для отмены');
  }
}


function restoreProductCard(productName) {
  const removedCardHTML = localStorage.getItem('removedProductCard');
  if (removedCardHTML) {

    const tempContainer = document.createElement('div');
    tempContainer.innerHTML = removedCardHTML;
    const restoredCard = tempContainer.firstElementChild;
    
    if (restoredCard) {

      const productsGrid = document.querySelector('.products-grid');
      if (productsGrid) {

        productsGrid.appendChild(restoredCard);
        

        restoredCard.style.animation = 'fadeIn 0.3s ease';
        restoredCard.style.opacity = '0';
        setTimeout(() => {
          restoredCard.style.opacity = '1';
        }, 10);
        
        localStorage.removeItem('removedProductCard');
        showSimpleNotification(`Карточка товара "${productName}" восстановлена`);
      } else {
        showSimpleNotification('Контейнер товаров не найден');
      }
    } else {
      showSimpleNotification('Ошибка при восстановлении карточки товара');
    }
  } else {
    showSimpleNotification(`Карточка товара "${productName}" не найдена для восстановления`);
  }
}


function showSimpleNotification(message) {

  const notification = document.createElement('div');
  notification.className = 'simple-notification';
  notification.innerHTML = `
    <div class="simple-notification-content">
      <span class="simple-notification-text">${message}</span>
      <button class="simple-notification-close">&times;</button>
    </div>
  `;
  

  document.body.appendChild(notification);
  

  const closeBtn = notification.querySelector('.simple-notification-close');
  closeBtn.onclick = () => {
    notification.style.animation = 'slideOutRight 0.3s ease';
    setTimeout(() => {
      if (document.body.contains(notification)) {
        document.body.removeChild(notification);
      }
    }, 300);
  };
  

  setTimeout(() => {
    if (document.body.contains(notification)) {
      notification.style.animation = 'slideOutRight 0.3s ease';
      setTimeout(() => {
        if (document.body.contains(notification)) {
          document.body.removeChild(notification);
        }
      }, 300);
    }
  }, 5000);
}


document.addEventListener('DOMContentLoaded', function() {
  initializeUndoSystem();
  
  setInterval(checkUndoAvailability, 5000);
});


window.undoLastAction = undoLastAction;
window.restoreProductCard = restoreProductCard;
window.showSimpleNotification = showSimpleNotification;
window.enableUndoButton = enableUndoButton;
window.disableUndoButton = disableUndoButton;
