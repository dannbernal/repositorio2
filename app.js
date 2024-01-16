document.addEventListener('DOMContentLoaded', () => {
  const productosContainer = document.getElementById('productos');
  const carritoContainer = document.getElementById('carrito');
  const listaCarrito = document.getElementById('lista-carrito');
  const totalCarrito = document.getElementById('total');

  let carrito = [];
  let productos = [];

  // Cargar productos desde JSON
  fetch('productos.json')
    .then(response => response.json())
    .then(data => {
      productos = data;
      mostrarProductos(productos);
    });

  function mostrarProductos(productos) {
    productos.forEach(producto => {
      const card = document.createElement('div');
      card.innerHTML = `
        <p>${producto.nombre} - $${producto.precio.toFixed(2)}</p>
        <button data-id="${producto.id}" class="agregar">Agregar al carrito</button>
      `;
      productosContainer.appendChild(card);

      const btnAgregar = card.querySelector('.agregar');
      btnAgregar.addEventListener('click', agregarAlCarrito);
    });
  }

  function agregarAlCarrito(event) {
    const productoId = parseInt(event.target.dataset.id);
    const productoSeleccionado = productos.find(producto => producto.id === productoId);

    if (productoSeleccionado) {
      carrito.push(productoSeleccionado);
      actualizarCarrito();
    }
  }

  function actualizarCarrito() {
    listaCarrito.innerHTML = '';
    let total = 0;

    carrito.forEach((producto, index) => {
      const li = document.createElement('li');
      li.innerHTML = `
        ${producto.nombre} - $${producto.precio.toFixed(2)}
        <button class="eliminar" data-index="${index}">Eliminar</button>
      `;
      listaCarrito.appendChild(li);

      const btnEliminar = li.querySelector('.eliminar');
      btnEliminar.addEventListener('click', eliminarDelCarrito);
      
      total += producto.precio;
    });

    totalCarrito.textContent = total.toFixed(2);

    // Guardar el estado en json
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }

  function eliminarDelCarrito(event) {
    const index = parseInt(event.target.dataset.index);
    carrito.splice(index, 1);
    actualizarCarrito();
  }
  if (localStorage.getItem('carrito')) {
    carrito = JSON.parse(localStorage.getItem('carrito'));
    actualizarCarrito();
  }
});
