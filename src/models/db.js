const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/crudarabe', { useNewUrlParser: true }, (err) => {
    if (!err) { console.log('Conexión a MongoDB exitosa.') }
    else { console.log('Error en la conexión de la base de datos : ' + err) }
});

require('./solicitud.model');