const mongoose = require('mongoose');

var solicitudSchema = new mongoose.Schema({
    NombreCompleto: {
        type: String,
        required: 'Este campo es requerido.'
    },
    email: {
        type: String
    },
    Problema: {
        type: String
    },
    Info: {
        type: String
    },
    Estatus: {
        type: String
    }
});

// Custom validation for email
solicitudSchema.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'E-mail incorrecto.');

mongoose.model('Solicitud', solicitudSchema);