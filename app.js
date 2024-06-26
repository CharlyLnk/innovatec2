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
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  console.log({ username, password });

  try {
    if (!username || !password) {
      return res.status(400).json({ success: false, error: 'Por favor complete todos los campos' });
    }

    const result = await ContactosModel.registrarUsuario({ usuario: username, clave: password });

    if (result.success) {
      // Envía una respuesta con redirección al cliente
      res.render('login');
      // return res.status(200).json({ success: true, redirectUrl: '/login' });
    } else {
      res.render('register');
      alert('Error al registrar usuario' );
    }
  } catch (error) {
    console.error(error);
    // return res.status(500).json({ success: false, error: 'Error al registrar usuario' });
  }
});



app.get('/login', function (req, res){
  res.render('login'); // Render the login.ejs view
});
//////////////////////////////////////////////////////
app.get('/consulta',async (req, res) =>{

  const numero_usuario = req.session.numero_usuario; //Numero usuario

  if(!req.session.usuario){
    res.render('login');
  }
    const datos = await ContactosModel.consultar(numero_usuario);
    console.log("Consulta:",datos)
    res.render('consulta',{datos})
});
/////////////////////////////////////////////////////
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

  const image = req.files.imagen;
  const tiempo = Date.now();
  const path = __dirname+'/images/'+tiempo+image.name;

  const numero_usuario = req.session.numero_usuario;
  const new_contacto = {
    nombre_predio : req.body.nombre_predio,
    numero_usuario : numero_usuario,
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
    coordenadas : req.body.coordenadas,
    imagen : tiempo+image.name,
  }

  //console.log(new_contacto);

  image.mv(path,(error)=>{
    if (error){ 
      console.log(error);
      return;
    }
  });
  
  const result = await ContactosModel.alta(new_contacto);
  res.end(JSON.stringify({ok_res: true}));
});


app.post('/login', async (req, res)=>{

  let usuario = req.body.usuario;
  let clave = req.body.clave;
debugger
  
  const result = await ContactosModel.login(usuario, clave)
  console.log("result = ",result);
  if (result[0]){
    console.log("Result[0]:",result[0]);
    req.session.usuario=result[0].usuario
    req.session.numero_usuario=result[0].numero_usuario
    console.log("=?",req.session.numero_usuario)
    res.end(JSON.stringify({ok_res: true, numero_usuario: result[0].numero_usuario}));
    console.log("aqui:",res.end(JSON.stringify({ok_res: true, numero_usuario: result[0].numero_usuario})))
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
  let titulo_imagen = '';
  if (req.files !== null) {
    const image = req.files.imagen;
    console.log('----------'+image.name+'------------');
    const tiempo = Date.now();
    const path = __dirname + '/images/' + tiempo + image.name;
    titulo_imagen = tiempo + image.name;
    // Movemos la imagen al directorio de imágenes
    await image.mv(path, (error) => {
      if (error) {
        console.log(error);
        return;
      }
    });
  } else {
    console.log('No se envió imagen');
    console.log(req.body.imagen);
    titulo_imagen = req.body.imagen;
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
    imagen: titulo_imagen
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