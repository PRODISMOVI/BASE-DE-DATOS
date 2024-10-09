let grupos = {};

function agregarAlumno() {
    let nombre = document.getElementById("nombre").value;
    let apellidos = document.getElementById("apellidos").value;
    let edad = document.getElementById("edad").value;
    let grupo = document.getElementById("grupo").value;

    let materias = ["Matemáticas", "Español", "Historia", "Geografía", "Ciencias"];
    let totalCalificaciones = 0;
    let cantidadMaterias = materias.length;

    let calificacionesAlumno = [];
    for (let i = 0; i < cantidadMaterias; i++) {
        let calificacion = parseFloat(document.getElementById(materias[i]).value);
        calificacionesAlumno.push(calificacion);
        totalCalificaciones += calificacion;
    }

    let promedioAlumno = totalCalificaciones / cantidadMaterias;

    let alumno = {
        nombre: nombre,
        apellidos: apellidos,
        edad: edad,
        grupo: grupo,
        materias: materias,
        calificaciones: calificacionesAlumno,
        promedio: promedioAlumno
    };

    if (!grupos[grupo]) {
        grupos[grupo] = {
            alumnos: [],
            promedioGrupo: 0
        };
    }
    grupos[grupo].alumnos.push(alumno);

    let totalPromedios = 0;
    grupos[grupo].alumnos.forEach(al => totalPromedios += al.promedio);
    grupos[grupo].promedioGrupo = totalPromedios / grupos[grupo].alumnos.length;

    mostrarTabla();
    mostrarPromediosGrupo();
    document.getElementById("formularioAlumno").reset();
}

function mostrarTabla() {
    let tabla = document.getElementById("tablaAlumnos");
    tabla.innerHTML = "<tr><th>Nombre</th><th>Apellidos</th><th>Edad</th><th>Grupo</th><th>Materias con Calificaciones</th><th>Promedio</th></tr>";
    for (let grupo in grupos) {
        grupos[grupo].alumnos.forEach(alumno => {
            let row = tabla.insertRow();
            row.insertCell(0).innerHTML = alumno.nombre;
            row.insertCell(1).innerHTML = alumno.apellidos;
            row.insertCell(2).innerHTML = alumno.edad;
            row.insertCell(3).innerHTML = alumno.grupo;
            let materiasCalificaciones = alumno.materias.map((materia, index) => `${materia}: ${alumno.calificaciones[index]}`).join(", ");
            row.insertCell(4).innerHTML = materiasCalificaciones;
            row.insertCell(5).innerHTML = alumno.promedio.toFixed(2);
        });
    }
}

function mostrarPromediosGrupo() {
    let tablaGrupo = document.getElementById("tablaPromediosGrupo");
    tablaGrupo.innerHTML = "<tr><th>Grupo</th><th>Promedio del Grupo</th></tr>";
    for (let grupo in grupos) {
        let row = tablaGrupo.insertRow();
        row.insertCell(0).innerHTML = grupo;
        row.insertCell(1).innerHTML = grupos[grupo].promedioGrupo.toFixed(2);
    }
}

function buscarAlumno() {
    let buscar = document.getElementById("buscar").value.toLowerCase();
    let tabla = document.getElementById("tablaAlumnos");
    tabla.innerHTML = "<tr><th>Nombre</th><th>Apellidos</th><th>Edad</th><th>Grupo</th><th>Materias con Calificaciones</th><th>Promedio</th></tr>";
    for (let grupo in grupos) {
        let alumnosEncontrados = grupos[grupo].alumnos.filter(alumno => 
            alumno.nombre.toLowerCase().includes(buscar) || 
            alumno.apellidos.toLowerCase().includes(buscar) ||
            alumno.promedio.toFixed(2) === buscar
        );
        alumnosEncontrados.forEach(alumno => {
            let row = tabla.insertRow();
            row.insertCell(0).innerHTML = alumno.nombre;
            row.insertCell(1).innerHTML = alumno.apellidos;
            row.insertCell(2).innerHTML = alumno.edad;
            row.insertCell(3).innerHTML = alumno.grupo;
            let materiasCalificaciones = alumno.materias.map((materia, index) => `${materia}: ${alumno.calificaciones[index]}`).join(", ");
            row.insertCell(4).innerHTML = materiasCalificaciones;
            row.insertCell(5).innerHTML = alumno.promedio.toFixed(2);
        });
    }
}

function ordenartablaAlumnos(ascendente) {
    const tabla = document.getElementById("tablaAlumnos").tBodies[0];
    const filas = Array.from(tabla.rows);
    
    filas.sort((a, b) => {
        const aPromedio = parseFloat(a.cells[2].innerText);
        const bPromedio = parseFloat(b.cells[2].innerText);
        return ascendente ? aPromedio - bPromedio : bPromedio - aPromedio;
    });

    filas.forEach(fila => tabla.appendChild(fila));
}


function actualizarFechaHora() {
    const ahora = new Date();
    const fecha = ahora.toLocaleDateString();
    const hora = ahora.toLocaleTimeString();
    document.getElementById('fechaHora').innerText = `Fecha: ${fecha} - Hora: ${hora}`;
}

actualizarFechaHora();
setInterval(actualizarFechaHora, 1000); // Actualiza cada segundo