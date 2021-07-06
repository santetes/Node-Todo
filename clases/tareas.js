const colors = require('colors');
const Tarea = require('./tarea');

class Tareas {
    _listado = {};
    listado = [];

    get getListadoArr() {
        Object.keys(this._listado).forEach((key) => {
            const tarea = this._listado[key];
            this.listado.push(tarea);
        });

        return this.listado;
    }

    constructor() {
        this._listado = {};
    }

    crearTarea(desc = '') {
        const tarea = new Tarea(desc);

        this._listado[tarea.id] = tarea;
        this.listado = [];
        this.listado = this.getListadoArr;
    }
    rellena_listado(arrayData) {
        arrayData.forEach((tarea) => {
            this._listado[tarea.id] = tarea;
        });
    }
    listadoCompleto() {
        console.log('');

        let orden = 1;
        let estado = '';
        this.listado.forEach((tarea) => {
            estado = tarea.completadoEn ? `completado`.green : `pendiente`.red;
            console.log(`${orden.toString().green}. ${tarea.desc} :: ${estado}`);
            orden++;
        });
        console.log('');
    }
    listarPendientes_Completadas(boolean) {
        console.log('');

        let orden = 1;

        switch (boolean) {
            case true:
                this.listado.forEach((tarea) => {
                    let ordenStr = `${orden}.`.green;
                    if (tarea.completadoEn) {
                        console.log(`${ordenStr}  ${tarea.desc} ::  ${tarea.completadoEn.green}`);
                        orden++;
                    }
                });
                break;
            case false:
                this.listado.forEach((tarea) => {
                    let ordenStr = `${orden}.`.green;
                    if (!tarea.completadoEn) {
                        console.log(`${ordenStr}  ${tarea.desc} :: ${'pendiente'.red}`);
                        orden++;
                    }
                });
                break;
        }

        console.log('');
    }
    borrarTarea(tarea) {
        delete this._listado[tarea.tarea];
        this.listado = [];
    }
}

module.exports = Tareas;
