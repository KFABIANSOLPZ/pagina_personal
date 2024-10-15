let allData = [];  // Variable para almacenar todos los datos obtenidos
let dataVisible = false;  // Variable para controlar si los datos están visibles

// Event listener para obtener datos y alternar visibilidad
document.getElementById('fetchData').addEventListener('click', toggleData);
// Event listener para la búsqueda
document.getElementById('searchBtn').addEventListener('click', searchById);

function fetchData() {
    const url = 'https://jsonplaceholder.typicode.com/posts';  // URL que devuelve varios posts

    // Reproducir sonido de cargado
    const loadingSound = document.getElementById('loadingSound');
    loadingSound.play();

    // Cambiar el texto del botón al hacer clic
    document.getElementById('fetchData').textContent = 'Cargando...';

    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.table(data);  // Mostrar los datos en la consola

            allData = data;  // Guardar los datos en una variable global
            displayData(allData);  // Mostrar todos los datos por defecto

            document.getElementById('fetchData').textContent = 'Ocultar datos';  // Cambiar el texto del botón
            dataVisible = true;  // Indicar que los datos están visibles
        })
        .catch(error => {
            console.error('Error fetching data:', error);  // Mostrar error en caso de que ocurra
            document.getElementById('fetchData').textContent = 'Error al cargar datos';  // Cambiar el texto en caso de error
        });
}

// Función para mostrar los datos en la tabla
function displayData(data) {
    const dataContainer = document.getElementById('dataContainer');
    dataContainer.innerHTML = '';  // Limpiar el contenedor antes de agregar nuevos datos

    // Recorrer los datos y agregarlos a la tabla
    data.forEach(post => {
        const row = document.createElement('tr');  // Crear una fila para la tabla

        // Insertar los datos en las celdas de la tabla
        row.innerHTML = `
            <td>${post.id}</td>
            <td>${post.title}</td>
            <td>${post.body}</td>
        `;

        dataContainer.appendChild(row);  // Añadir la fila al tbody
    });

    document.getElementById('dataTable').style.display = 'table';  // Asegurarse de que la tabla sea visible
}

// Función para alternar la visibilidad de los datos
function toggleData() {
    if (dataVisible) {
        // Si los datos están visibles, ocultarlos
        document.getElementById('dataTable').style.display = 'none';
        document.getElementById('fetchData').textContent = 'Mostrar datos';
        dataVisible = false;
    } else {
        if (allData.length === 0) {
            // Si los datos no se han cargado, hacer fetch
            fetchData();
        } else {
            // Si los datos ya están cargados, mostrarlos
            document.getElementById('dataTable').style.display = 'table';
            document.getElementById('fetchData').textContent = 'Ocultar datos';
            dataVisible = true;
        }
    }
}

// Función para buscar por ID
function searchById() {
    const searchValue = document.getElementById('searchInput').value;  // Obtener el valor ingresado
    const filteredData = allData.filter(post => post.id == searchValue);  // Filtrar por ID

    if (filteredData.length > 0) {
        displayData(filteredData);  // Mostrar solo el resultado filtrado
    } else {
        alert('No se encontraron resultados para el ID ingresado.');
    }
}

