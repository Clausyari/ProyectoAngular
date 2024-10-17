const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 8080;
const bodyParser = require('body-parser');

// Middleware de CORS
app.use(cors());

// Middleware para parsear el cuerpo de las solicitudes
app.use(express.json());

app.use(bodyParser.json());

const users = [
    { username: 'admin', password: 'admin', token: 'token1' },
    { username: 'usuario2', password: 'contraseña2', token: 'token2' }
];


const getDefaultRegions = () => {
    return [
        { region_id: 0, region: 'Norte', tag: 'N', status: 1 },
        { region_id: 1, region: 'Sur', tag: 'S', status: 1 },
        { region_id: 2, region: 'Noreste', tag: 'NE', status: 0 },
        { region_id: 3, region: 'Pacífico', tag: 'P', status: 0 },
        { region_id: 4, region: 'Oeste', tag: 'O', status: 1 },
        { region_id: 5, region: 'Sureste', tag: 'SE', status: 0 },
    ];
};

// Almacena las regiones en la variable
let regiones = getDefaultRegions();


// Ruta para obtener las regiones
app.get('/region', (req, res) => {
    res.json(regiones);
});

// Ruta para agregar una nueva región
app.post('/region', (req, res) => {
    const newRegion = req.body;
    console.log('Nueva región recibida:', newRegion);

    regiones.push(newRegion);
    res.status(201).json({
        message: 'Región registrada con éxito',
        region: newRegion
    });
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
      res.json({ token: user.token });
    } else {
      res.status(401).json({ message: 'Credenciales incorrectas' });
    }
  });

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});