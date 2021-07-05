const inquirer = require('inquirer');

const startMenu = async () => {
    const opciones = {
        type: 'list',
        name: 'seleccion',
        message: 'Seleciona una de las opciones',
        choices: [
            {
                value: '1',
                name: `${'1.'.green} Crear Tareas`,
            },
            {
                value: '2',
                name: `${'2.'.green} Listar Tareas`,
            },
            {
                value: '3',
                name: `${'3.'.green} Listar Tareas Completadas`,
            },
            {
                value: '4',
                name: `${'4.'.green} Listar Tareas Pendientes`,
            },
            {
                value: '5',
                name: `${'5.'.green} Completar Tareas`,
            },
            {
                value: '6',
                name: `${'6.'.green} Borrar Tareas`,
            },
            {
                value: '0',
                name: `${'0.'.green} Salir`,
            },
        ],
    };

    console.clear();
    console.log('===================================='.green);
    console.log('      Seleccione una Opción '.white);
    console.log('====================================\n'.green);

    const { seleccion } = await inquirer.prompt(opciones);

    return seleccion;
};

const pausa = async () => {
    const mensaje = {
        name: 'pregunta',
        type: 'input',
        message: `Pulsa ${'Enter'.green} para continuar`,
    };

    await inquirer.prompt(mensaje);
};

const leerInput = async (message) => {
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value) {
                if (value.length === 0) {
                    return 'Porfavor ingrese un valor';
                }
                return true;
            },
        },
    ];

    const { desc } = await inquirer.prompt(question);

    return desc;
};

const borrarTarea = async (tareasArr) => {
    let choices = [];

    tareasArr.forEach((tarea) => {
        choices.push({
            value: tarea.id,
            name: tarea.desc,
        });
    });

    const opciones = {
        type: 'list',
        name: 'seleccion',
        message: 'selecciona la tarea a borrar',
        choices,
    };

    const { seleccion } = await inquirer.prompt(opciones);

    return seleccion;
};

module.exports = {
    startMenu,
    pausa,
    leerInput,
    borrarTarea,
};