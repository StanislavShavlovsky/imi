document.addEventListener('DOMContentLoaded', function() {

    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
  

  
    // Пока  заглушка
    document.getElementById('productTitle').textContent = `Товар №${productId}`;
    document.getElementById('productDescription').textContent = `Описание товара №${productId}. Данные будут загружены с бэкенда.`;

    if (productId === "1") {
      document.getElementById('productPrice').textContent = "Цена: 100 р";
    } else {
      document.getElementById('productPrice').textContent = "Цена: 150 р";
    }
  });
  