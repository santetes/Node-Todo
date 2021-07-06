const colors = require('colors');
const {
    startMenu,
    pausa,
    leerInput,
    listadoBorrarTarea,
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
                let tareaSeleccionada = await listadoBorrarTarea(tareas.listado);
                const respuesta = await confirmacionBorrado(
                    'Seguro que quiere borrar la tarea selecionada??'
                );
                if (respuesta) {
                    tareas.borrarTarea(tareaSeleccionada);
                    console.log(respuesta, 'La tarea seleccionada ha sido borrada');
                    tareas.getListadoArr;
                }

                break;
        }
        grabarArchivo(tareas.listado);
        await pausa();
    } while (opt !== '0');
};

main();
