const colors = require('colors');
const {
    startMenu,
    pausa,
    leerInput,
    borrarTarea,
    confirmacionBorrado,
} = require('./helpers/inquirer');

const Tareas = require('./clases/tareas');
const { grabarArchivo, existeArchivo } = require('./helpers/ManejoDB');
//--------------------------------------

const data = existeArchivo();
const tareas = new Tareas();
if (data) {
    tareas.rellena_listado(data);
    tareas.listado = tareas.getListadoArr;
}

const main = async () => {
    do {
        console.clear();
        opt = await startMenu();

        switch (opt) {
            case '1':
                const descripcion = await leerInput('Introduzca la tarea a añadir');
                tareas.crearTarea(descripcion);
                break;

            case '2':
                tareas.listadoCompleto();

                break;

            case '3':
                tareas.listarPendientes_Completadas(true);
                break;

            case '4':
                tareas.listarPendientes_Completadas(false);
                break;

            case '6':
                let tareaSeleccionada = await borrarTarea(tareas.getListadoArr);
                let index = tareas.listado.findIndex((tarea) => tarea.id === tareaSeleccionada);
                const respuesta = await confirmacionBorrado(
                    'Seguro que quiere borrar la tarea selecionada??'
                );
                if (respuesta) tareas.listado.splice(index, 1);

                break;
        }
        grabarArchivo(tareas.getListadoArr);
        await pausa();
    } while (opt !== '0');
};

main();

//esto es una prueba que deberia estar solamente en refactorización
