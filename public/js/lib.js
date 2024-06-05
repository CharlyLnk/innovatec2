function saludo(){
    alert('Hola');
}

// Funcion para eliminar 
async function eliminar(nodo){
    let id = nodo.parentNode.parentNode.getAttribute('pos');

    let response = await fetch('http://localhost:3000/baja',{
        method: 'POST',
        body: JSON.stringify({
            "id": id
        })
    });

    let result = await response.json();

    if (result.ok_res){
        location.href = 'http://localhost:3000/consulta';
    }else{
        alert('Hubo un error')
    }
}
//-------------------------------------------------------------------

//Funcion que envia datos al servidor, para insertar un nuevo contacto 
async function envia(){
  alert('Se van a enviar los datos');
  let imagen = document.getElementById('imagen');

  let nombre_predio = document.getElementById('nombre_predio').value;
  //let numero_usuario = document.getElementById('numero_usuario').value;
  let nombre_propietario = document.getElementById('nombre_propietario').value;
  let tipo_cultivo = document.getElementById('tipo_cultivo').value;
  let cuerpos_agua = document.getElementById('cuerpos_agua').value;
  let tipo_cuerpo_agua = document.getElementById('tipo_cuerpo_agua').value;
  let direccion = document.getElementById('direccion').value;
  let ciudad = document.getElementById('ciudad').value;
  let estado = document.getElementById('estado').value;
  let pais = document.getElementById('pais').value;
  let tam_predio = document.getElementById('tam_predio').value;
  let tipo_riego = document.getElementById('tipo_riego').value;
  let tipo_suelo = document.getElementById('tipo_suelo').value;
  let coordenadas = document.getElementById('coordenadas').value;

  if (imagen.value == ''){
    alert('Debe seleccionar un archivo');
    return
  }

  // Validar que el campo tipo_cuerpo_agua no esté vacío
  if (cuerpos_agua === 'Si' && !tipo_cuerpo_agua) {
    alert('Debe seleccionar un tipo de cuerpo de agua.');
    return;
  }

  const formData = new FormData();
  formData.append('imagen',imagen.files[0]);
  formData.append('imagen', imagen);
  formData.append('nombre_predio', nombre_predio);
  //formData.append('numero_usuario', numero_usuario);
  formData.append('nombre_propietario', nombre_propietario);
  formData.append('tipo_cultivo', tipo_cultivo);
  formData.append('cuerpos_agua', cuerpos_agua);
  formData.append('tipo_cuerpo_agua', tipo_cuerpo_agua);
  formData.append('direccion', direccion);
  formData.append('ciudad', ciudad);
  formData.append('estado', estado);
  formData.append('pais', pais);
  formData.append('tam_predio', tam_predio);
  formData.append('tipo_riego', tipo_riego);
  formData.append('tipo_suelo', tipo_suelo);
  formData.append('coordenadas', coordenadas);

  try {
    let respo = await fetch('http://localhost:3000/datos', {
      method: 'POST',
      body: formData
    });

    let result = await respo.json();

    if (result.ok_res) {
      location.href = 'http://localhost:3000/consulta';
    } else {
      alert('Hubo un error');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Hubo un error en la comunicación con el servidor');
  }
}


//--------------------------------------------------------------------

//Funcion que envia datos al servidor, para modificar un contacto 
async function modifica(){
  alert('Se van a enviar los datos');

  let numero_predio = document.getElementById('numero_predio2').value; // Cambiado el id a 'numero_predio' según el HTML proporcionado
  let imagenx = document.getElementById('imagen2');
  let nombre_predio = document.getElementById('nombre_predio2').value; // Ajustado a 'nombre_predio' según el HTML proporcionado
  let nombre_propietario = document.getElementById('nombre_propietario2').value; // Ajustado a 'nombre_propietario' según el HTML proporcionado
  let tipo_cultivo = document.getElementById('tipo_cultivo2').value;
  let cuerpos_agua = document.getElementById('cuerpos_agua2').value;
  let tipo_cuerpo_agua = document.getElementById('tipo_cuerpo_agua2').value;
  let direccion = document.getElementById('direccion2').value;
  let ciudad = document.getElementById('ciudad2').value;
  let estado = document.getElementById('estado2').value;
  let pais = document.getElementById('pais2').value;
  let tam_predio = document.getElementById('tam_predio2').value;
  let tipo_riego = document.getElementById('tipo_riego2').value;
  let tipo_suelo = document.getElementById('tipo_suelo2').value;
  let coordenadas = document.getElementById('coordenadas2').value;
  let nombre_imagen=''
  nombre_imagen = document.getElementById('nom_imagen').value;

  if (imagenx.value == ''){
    alert('Debe seleccionar un archivo');
    return
 }

  
  const formData = new FormData()
  
  formData.append('imagen',imagenx.files[0]); // Comentado porque no parece estar relacionado con la lógica de esta función
  
  formData.append('numero_predio',numero_predio); // Ajustado a 'id_predio' según el HTML proporcionado
  formData.append('imagen',nombre_imagen); // Comentado porque no parece estar relacionado con la lógica de esta función
  formData.append('nombre_predio',nombre_predio);
  formData.append('nombre_propietario',nombre_propietario);
  // Los siguientes campos deben ser ajustados de manera similar según los nombres que deseas usar en el servidor
  formData.append('tipo_cultivo',tipo_cultivo);
  formData.append('cuerpos_agua',cuerpos_agua);
  formData.append('tipo_cuerpo_agua',tipo_cuerpo_agua);
  formData.append('direccion',direccion);
  formData.append('ciudad',ciudad);
  formData.append('estado',estado);
  formData.append('pais',pais);
  formData.append('tam_predio',tam_predio);
  formData.append('tipo_riego',tipo_riego);
  formData.append('tipo_suelo',tipo_suelo);
  formData.append('coordenadas',coordenadas);

  let respo = await fetch('http://localhost:3000/actualiza',{
    method: 'POST',
    body: formData
  });

  let result = await respo.json();

  if (result.ok_res){
    location.href = 'http://localhost:3000/consulta';
  }else{
    alert('Hubo un error');
  }
}

//--------------------------------------------------------------------

// Funcion para actualizar imagen en editar contacto
function readURL(input) {
  if (input.files && input.files[0]) { //Revisamos que el input tenga contenido
    var reader = new FileReader(); //Leemos el contenido
    
    reader.onload = function(e) { //Al cargar el contenido lo pasamos como atributo de la imagen de arriba
      $('#imagen').attr('src', e.target.result);
    }
    
    reader.readAsDataURL(input.files[0]);
  }
}
//-------------------------------------------------------------  

//Funcion que muestra formulario para modificare contacto en una ventana modal 
function show_editar(nodo){
  
  let id = nodo.parentNode.parentNode.getAttribute('pos');
  console.log(id)
  let fila = nodo.parentNode.parentNode;
  console.log(fila)
  $('#nombre_predio2').val(fila.cells[2].innerHTML);
  $('#nombre_propietario2').val(fila.cells[3].innerHTML);
  $('#tipo_cultivo2').val(fila.cells[4].innerHTML);
  $('#cuerpos_agua2').val(fila.cells[5].innerHTML);
  $('#tipo_cuerpo_agua2').val(fila.cells[6].innerHTML);
  $('#direccion2').val(fila.cells[7].innerHTML);
  $('#ciudad2').val(fila.cells[8].innerHTML);
  $('#estado2').val(fila.cells[9].innerHTML);
  $('#pais2').val(fila.cells[10].innerHTML);
  $('#tam_predio2').val(fila.cells[11].innerHTML);
  $('#tipo_riego2').val(fila.cells[12].innerHTML);
  $('#tipo_suelo2').val(fila.cells[13].innerHTML);
  $('#coordenadas2').val(fila.cells[14].innerHTML);
  $('#numero_predio2').val(id);

  /* let fecha = (fila.cells[5].innerHTML).split('/');

  let newFecha=''
  newFecha = newFecha+fecha[2]

  if (fecha[1].length ==1 ){
    newFecha = newFecha+'-0'+fecha[1]
  }else{
    newFecha = newFecha+'-'+fecha[1]
  }

  if (fecha[0].length ==1 ){
    newFecha = newFecha+'-0'+fecha[0]
  }else{
    newFecha = newFecha+'-'+fecha[0] 
  }*/

  //$('#fnac2').val(newFecha);

  $('#imagen').attr('src',fila.cells[16].firstChild.getAttribute('src'));
  $('#nom_imagen').attr('value',fila.cells[16].firstChild.getAttribute('nom'));


  $('#exampleModal2').modal('show'); 

  $("#imagen2").change(function() { //Cuando el input cambie (se cargue un nuevo archivo) se va a ejecutar de nuevo el cambio de imagen y se verá reflejado.
    readURL(this);
  });

}
//--------------------------------------------------------

async function login(){
  alert('Login');
  let usuario = document.getElementById('usu').value;
  let clave = document.getElementById('cve').value;

 // let numero_usuario = document.getElementById('numero_usuario').values;
  const formData = new FormData()
  formData.append('usuario',usuario);
  formData.append('clave',clave);
  //formData.append('numero_usuario',numero_usuario);
  
  let respo = await fetch('http://localhost:3000/login',{
    method: 'POST',
    body: formData
  });

  let result = await respo.json();
  console.log("json result:",result);
  if (result.ok_res){
    location.href = 'http://localhost:3000/consulta';
  }else{
    alert('Hubo un error');
  }
}

function logout() {
  alert('logout');
  window.location.href = 'http://localhost:3000/logout';
}


// Función para registrar un nuevo usuario
async function registrarUsuario() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;

  // Validar que todos los campos estén completos
  if (username === '' || password === '' || confirmPassword === '') {
      alert('Por favor complete todos los campos');
      return;
  }

  // Validar que las contraseñas coincidan
  if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
  }

  // Enviar datos al servidor para el registro
  try {
      const response = await fetch('/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (data.success) {
          alert('Usuario registrado exitosamente');
          // Redirigir al usuario a la página de inicio de sesión
          window.location.href = '/login';
      } else {
          alert('Error al registrar usuario: ' + data.error);
      }
  } catch (error) {
      console.error('Error:', error);
      alert('Hubo un error en la comunicación con el servidor');
  }
}

// Agrega un event listener al formulario de registro para llamar a la función registrarUsuario
document.getElementById('register-form').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevenir el envío del formulario por defecto
  registrarUsuario(); // Llamar a la función para registrar el usuario
});