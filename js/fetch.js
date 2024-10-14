document.getElementById('fetchData').addEventListener('click', fetchData);

function fetchData() {
    const url = 'https://jsonplaceholder.typicode.com/posts';  // URL que devuelve varios posts

    // Cambiamos el texto del botón al hacer clic en el botón usando document.getElementById
    document.getElementById('fetchData').textContent = 'Cargando...';
    
    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data);  // Mostramos todos los datos recibidos en la consola para verificar

            const dataContainer = document.getElementById('dataContainer');
            dataContainer.innerHTML = '';  // Limpiamos el contenedor antes de agregar nuevos datos

            // Cambiamos el borde de la tabla y el texto del botón al cargar los datos
            document.getElementById('dataTable').style.border = "2px solid green";
            document.getElementById('fetchData').textContent = 'Datos cargados';  // Cambiamos el texto del botón

            document.getElementById('dataTable').style.border = "2px solid green";
            document.getElementById('fetchData').textContent = 'Datos cargados';  // Cambiamos el texto del botón

            // Usamos data.forEach para recorrer cada post
            data.forEach(post => {
                const row = document.createElement('tr');  // Creamos una fila para la tabla

                // Mostrar el contenido de cada "celda" en la consola
                console.log(`ID: ${post.id}, Título: ${post.title}, Contenido: ${post.body}`);

                // Insertamos los datos en las celdas de la tabla
                row.innerHTML = `
                    <td>${post.id}</td>
                    <td>${post.title}</td>
                    <td>${post.body}</td>
                `;

                dataContainer.appendChild(row);  // Añadimos la fila al tbody
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);  // Mostramos el error en caso de que ocurra
            document.getElementById('fetchData').textContent = 'Error al cargar datos';  // Cambiamos el texto en caso de error
        });
}







