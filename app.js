const express = require('express');
const ejs = require('ejs');
const ContactosModel = require('./models/contactos');
const fileUpload = require('express-fileupload');  // Modulo archivos
const session = require('express-session');

const app = express();
const PUERTO = 3000;

app.use(fileUpload()); //  Para subir archivos

app.use(express.json()); // Para permitir JSON

app.set('view engine','ejs');

app.set("views",__dirname+'/vistas').renderFile;

app.use(express.static('public/js'));
app.use(express.static('public/css'));
app.use('/images',express.static(__dirname+'/images'))// Ruta donde se almacenaran las imagenes

app.use(session({
  secret: '12345678abcd',
  resave: true,
  saveUninitialized: true
}))

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true })); // Parse form data



app.get('/', function (req, res){
    res.render('home');
});
// Register page route (assuming you have a register.ejs view)
app.get('/register', (req, res) => {
  res.render('register');
});

// Handle user registration
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  console.log({ username, password });
  try {
    // Validation (optional)
    if (!username || !password) {
      res.status(400).json({ error: 'Please fill in all fields' }); // Send appropriate error response
      return; // Prevent further processing
    }

    // Logic to register the user in the database
    const newUser = { usuario: username, clave: password }; // Assuming data structure
    const result = await ContactosModel.register(newUser); // Assuming a register function in ContactosModel

    console.log(result);
    if (result.success) {
      // Store username in session (optional)
      req.session.usuario = username;

      // Redirect to login page after successful registration
      res.redirect('/login');
    } else {
      // Handle registration failure (e.g., username already exists)
      res.status(400).json({ error: result.message || 'Error al registrar usuario' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al registrar usuario' });
  }
});


app.get('/login', function (req, res){
  res.render('login'); // Render the login.ejs view
});
app.get('/consulta',async (req, res) =>{

  if(!req.session.usuario){
    res.render('login');
  }
    const datos = await ContactosModel.consultar();
    res.render('consulta',{datos})
});

app.post('/baja', (req, res)=>{
    var body=''
    req.on('data', async(data)=>{
        body+=data;
        var id = JSON.parse(body).id;
        const result = await ContactosModel.baja(id);
        res.end(JSON.stringify({ok_res: true}))

    });
});

app.post('/datos', async (req, res)=>{
  console.log(req.files);
  //const image = req.files.foto;
  //const tiempo = Date.now();
  //const path = __dirname+'/images/'+tiempo+image.name;

  const new_contacto = {
    nombre_predio : req.body.nombre_predio,
    numero_usuario : req.body.numero_usuario,
    nombre_propietario : req.body.nombre_propietario,
    tipo_cultivo : req.body.tipo_cultivo,
    cuerpos_agua : req.body.cuerpos_agua,
    tipo_cuerpo_agua : req.body.tipo_cuerpo_agua,
    direccion : req.body.direccion,
    ciudad : req.body.ciudad,
    estado : req.body.estado,
    pais : req.body.pais,
    tam_predio : req.body.tam_predio,
    tipo_riego : req.body.tipo_riego,
    tipo_suelo : req.body.tipo_suelo,
    coordenadas : req.body.coordenadas
   //foto : tiempo+image.name,
  }

  //console.log(new_contacto);

  /* image.mv(path,(error)=>{
    if (error){ 
      console.log(error);
      return;
    }
  }); */
  
  const result = await ContactosModel.alta(new_contacto);
  res.end(JSON.stringify({ok_res: true}));
});


app.post('/login', async (req, res)=>{

  let usuario = req.body.usuario;
  let clave = req.body.clave;

console.log(usuario)
debugger
  
  const result = await ContactosModel.login(usuario, clave)

  if (result[0]){
    req.session.usuario=result[0].usuario
    res.end(JSON.stringify({ok_res: true}));
  }else{
    res.render('login')
    
  }
});

app.get('/logout', (req, res) => {
  req.session.destroy(); // Destroy the user session
  res.redirect('/login'); // Redirect to the login page
});


app.post('/actualiza', async (req, res) => {
  console.log(req.files);
  console.log('---------'+req.body.id+'-------');
  
  // Comprobamos si se envió una imagen
  let titulo_foto = '';
  if (req.files !== null) {
    const image = req.files.foto;
    console.log('----------'+image.name+'------------');
    const tiempo = Date.now();
    const path = __dirname + '/images/' + tiempo + image.name;
    titulo_foto = tiempo + image.name;
    // Movemos la imagen al directorio de imágenes
    await image.mv(path, (error) => {
      if (error) {
        console.log(error);
        return;
      }
    });
  } else {
    console.log('No se envió foto');
    console.log(req.body.foto);
    titulo_foto = req.body.foto;
  }

  const id = req.body.numero_predio; // Ajustado según el HTML proporcionado

  const new_contacto = {
    
    nombre_predio: req.body.nombre_predio,
    nombre_propietario: req.body.nombre_propietario,
    tipo_cultivo: req.body.tipo_cultivo,
    cuerpos_agua: req.body.cuerpos_agua,
    tipo_cuerpo_agua: req.body.tipo_cuerpo_agua,
    direccion: req.body.direccion,
    ciudad: req.body.ciudad,
    estado: req.body.estado,
    pais: req.body.pais,
    tam_predio: req.body.tam_predio,
    tipo_riego: req.body.tipo_riego,
    tipo_suelo: req.body.tipo_suelo,
    coordenadas: req.body.coordenadas,
    foto: titulo_foto
  };

  try {
    // Llama a una función de modelo adecuada para actualizar el contacto
    const result = await ContactosModel.modi(new_contacto, id);
    res.json({ ok_res: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok_res: false, error: 'Hubo un error en el servidor' });
  }
});





app.listen(PUERTO, function(){
    console.log('Servidor en espera http://localhost');
})