import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import jwt from 'jsonwebtoken';

const app = express();
const port = 3000; // Elige el puerto que desees

// Middleware para analizar el cuerpo de las solicitudes
app.use(bodyParser.json());

// Middleware para permitir CORS
app.use(cors({
  origin: 'http://localhost:4200' // Cambia esto por la URL de tu frontend
}));

// Middleware para recibir JSON en las peticiones
app.use(express.json());

// Simulando una base de datos en memoria
let users = []; // Aquí almacenarás los usuarios

// Ruta de registro
app.post('/user', (req, res) => {
  const { username, password, name, surname, mail, address, rfc } = req.body;

  // Aquí podrías agregar validaciones, comprobar si el usuario ya existe, etc.
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

// Ruta de login
app.post('/login', (req, res) => {
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

app.get('/', (req, res) => {
  res.send('¡Hola Mundo!');
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});