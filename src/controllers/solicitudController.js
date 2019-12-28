const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Solicitud = mongoose.model('Solicitud');

router.get('/', (req, res) => {
    res.render("solicitud/addOrEdit", {
        viewTitle: "Crear solicitud"
    });
});

router.post('/', (req, res) => {
    if (req.body._id == '')
        insertRecord(req, res);
        else
        updateRecord(req, res);
});


function insertRecord(req, res) {
    var solicitud = new Solicitud();
    solicitud.NombreCompleto = req.body.NombreCompleto;
    solicitud.email = req.body.email;
    solicitud.Problema = req.body.Problema;
    solicitud.Info = req.body.Info;
    solicitud.Estatus = req.body.Estatus;
    solicitud.save((err, doc) => {
        if (!err)
            res.redirect('solicitud/list');
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("solicitud/addOrEdit", {
                    viewTitle: "Crear solicitud",
                    solicitud: req.body
                });
            }
            else
                console.log('Error durante la inserción del registro : ' + err);
        }
    });
}

function updateRecord(req, res) {
    Solicitud.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('solicitud/list'); }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("solicitud/addOrEdit", {
                    viewTitle: 'Actualizar solicitud',
                    solicitud: req.body
                });
            }
            else
                console.log('Error durante la actualización del registro : ' + err);
        }
    });
}


router.get('/list', (req, res) => {
    Solicitud.find((err, docs) => {
        if (!err) {
            res.render("solicitud/list", {
                list: docs
            });
        }
        else {
            console.log('Error al recuperar la lista de solicitudes :' + err);
        }
    });
});


function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'NombreCompleto':
                body['NombreCompletoError'] = err.errors[field].message;
                break;
            case 'email':
                body['emailError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}

router.get('/:id', (req, res) => {
    Solicitud.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("solicitud/addOrEdit", {
                viewTitle: "Actualizar solicitud",
                solicitud: doc
            });
        }
    });
});

router.get('/delete/:id', (req, res) => {
    Solicitud.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/solicitud/list');
        }
        else { console.log('Error al eliminar la solicitud :' + err); }
    });
});

module.exports = router;