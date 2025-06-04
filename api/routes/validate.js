var express = require('express');
var router = express.Router();

function validarRUT(rut) {
    // Eliminar puntos y guión
    rut = rut.replace(/\./g, '').replace(/-/g, '');

    // Separar cuerpo y dígito verificador
    const cuerpo = rut.slice(0, -1);
    const dv = rut.slice(-1).toUpperCase();

    // Validar largo mínimo
    if (cuerpo.length < 7) return false;

    // Calcular dígito verificador
    let suma = 0;
    let multiplo = 2;

    for (let i = cuerpo.length - 1; i >= 0; i--) {
        suma += parseInt(cuerpo[i]) * multiplo;
        multiplo = multiplo === 7 ? 2 : multiplo + 1;
    }

    const dvEsperado = 11 - (suma % 11);
    const dvCalculado = dvEsperado === 11 ? '0' : dvEsperado === 10 ? 'K' : dvEsperado.toString();

    // Comparar dígito verificador
    return dv === dvCalculado;
}

router.get('/', function(req, res) {
    rut = req.query.rut
    msg = validarRUT(rut) ? 'RUT válido' : 'RUT inválido'
    res.json({ data: msg})
});


module.exports = router;