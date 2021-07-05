const fs = require('fs');
const archivo = './db/database.json';

const grabarArchivo = (data) => {
    fs.writeFileSync(archivo, JSON.stringify(data));
};

const existeArchivo = () => {
    if (!fs.existsSync(archivo)) {
        return null;
    }
    const info = fs.readFileSync(archivo, {
        encoding: 'utf-8',
    });
    const data = JSON.parse(info);
    return data;
};

module.exports = {
    grabarArchivo,
    existeArchivo,
};
