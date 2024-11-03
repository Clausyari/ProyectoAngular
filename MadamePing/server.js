import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import jwt from 'jsonwebtoken';

const app = express();
const port = 3000; // Puerto donde se ejecutará el backend

// Middleware para analizar el cuerpo de las solicitudes
app.use(bodyParser.json());

// Middleware para permitir CORS desde el puerto 4200 (donde corre el frontend en Angular)
app.use(cors({
  origin: 'http://localhost:4200' // Cambia esto al puerto de tu frontend
}));

// Middleware para recibir JSON en las peticiones
app.use(express.json());

// Simulando una base de datos en memoria para usuarios y regiones
let users = []; // Aquí almacenarás los usuarios
let regions = []; // Aquí almacenarás las regiones

// Ruta de registro de usuarios
app.post('/user', (req, res) => {
  console.log('Datos recibidos para registro de usuario:', req.body);
  const { username, password, name, surname, mail, address, rfc } = req.body;

  // Validación y creación del usuario
  const newUser = {
    username,
    password, // En producción, nunca guardes la contraseña en texto plano
    name,
    surname,
    mail,
    address,
    rfc,
    rol_id: 1, // Rol por defecto
    region_id: 1 // Región por defecto
  };

  users.push(newUser); // Añadir el nuevo usuario a la "base de datos"
  res.status(201).json({ message: 'Usuario registrado con éxito.' });
});

// Ruta de login de usuarios
app.post('/login', (req, res) => {
  console.log('Solicitud de login recibida en el backend:', req.body);
  const { username, password } = req.body;

  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
      const token = jwt.sign({ username: user.username, rol_id: user.rol_id }, 'k@9f7C$2w3*Q!0b8G#d&1Zp@h2T^4Vm*', { expiresIn: '1h' });
      res.status(200).json({
          token: token,
          rol: user.rol_id,
          user: user.username
      });
  } else {
      res.status(401).json({ message: 'Credenciales incorrectas.' });
  }
});

// Ruta para obtener todas las regiones
app.get('/region', (req, res) => {
  res.json(regions); // Devuelve la lista de regiones
});

// Ruta para crear una nueva región
app.post('/regions', (req, res) => {
  console.log('Datos de nueva región:', req.body);
  const newRegion = {
    region_id: regions.length + 1, // ID autoincremental
    status: 1,
    ...req.body
  };
  regions.push(newRegion);
  res.status(201).json({ message: 'Región creada con éxito.' });
});

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('¡Hola Mundo!');
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

// Ruta para actualizar una región
app.put('/regions/:id', (req, res) => {
  const id = parseInt(req.params.id);
  console.log('Actualizando región con ID:', id, 'y datos:', req.body);
  const regionIndex = regions.findIndex(region => region.region_id === id);

  if (regionIndex === -1) {
    return res.status(404).json({ message: 'Región no encontrada.' });
  }

  // Actualiza la región con los nuevos datos
  regions[regionIndex] = { region_id: id, ...req.body };
  res.status(200).json({ message: 'Región actualizada con éxito.' });
});

// Ruta para desactivar una región
app.delete('/regions/:id', (req, res) => {
  const id = parseInt(req.params.id);
  console.log('Desactivando región con ID:', id);
  const regionIndex = regions.findIndex(region => region.region_id === id);

  if (regionIndex === -1) {
      return res.status(404).json({ message: 'Región no encontrada.' });
  }

  // Cambiar el estado de la región a inactivo
  regions[regionIndex].status = 0; // 0 significa inactivo
  res.status(200).json({ message: 'Región desactivada con éxito.' });
});

// Ruta para habilitar una región
app.put('/regions/:id/enable', (req, res) => {
  const id = parseInt(req.params.id);
  console.log('Activando región con ID:', id);
  const regionIndex = regions.findIndex(region => region.region_id === id);

  if (regionIndex === -1) {
      return res.status(404).json({ message: 'Región no encontrada.' });
  }

  // Cambiar el estado de la región a activo
  regions[regionIndex].status = 1; // 1 significa activo
  res.status(200).json({ message: 'Región activada con éxito.' });
});
