document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('addProductForm');
  
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      // Здесь можно реализовать AJAX-запрос для отправки данных формы на сервер,
      // например, с использованием fetch API:
      // fetch('/api/products', { method: 'POST', body: new FormData(form) })
  
      alert('Товар добавлен (заглушка)');
      // после добавления товара перенаправляем пользователя на главную страницу
      window.location.href = 'brand_index.html';
    });
  });
  