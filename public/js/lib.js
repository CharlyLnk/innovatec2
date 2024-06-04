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
  let foto = document.getElementById('foto');
  let nombre = document.getElementById('nombre').value;
  // let nombre = $('#nombre').value;
  let ap_pat = document.getElementById('ap_pat').value;
  let ap_mat = document.getElementById('ap_mat').value;
  let e_mail = document.getElementById('e_mail').value;
  let fnac = document.getElementById('fnac').value;
  let telefono = document.getElementById('telefono').value;

  if (foto.value == ''){
     alert('Debe seleccionar un archivo');
     return
  }

  const formData = new FormData()
  formData.append('foto',foto.files[0]);
  formData.append('nom',nombre);
  formData.append('ap_pat',ap_pat);
  formData.append('ap_mat',ap_mat);
  formData.append('e_mail',e_mail);
  formData.append('fnac',fnac);
  formData.append('telefono',telefono);

  let respo = await fetch('http://localhost:3000/datos',{
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

//Funcion que envia datos al servidor, para modificar un contacto 
async function modifica(){
  alert('Se van a enviar los datos');

  let id_clave = document.getElementById('contacto_id').value;
  var fotox = document.getElementById('foto2');

  let nombre = document.getElementById('nombre2').value;
  let ap_pat = document.getElementById('ap_pat2').value;
  let ap_mat = document.getElementById('ap_mat2').value;
  let e_mail = document.getElementById('e_mail2').value;
  let fnac = document.getElementById('fnac2').value;
  let telefono = document.getElementById('telefono2').value;
  let nombre_foto=''

  nombre_foto = document.getElementById('nom_foto').value;
  
  const formData = new FormData()
  formData.append('foto',fotox.files[0]);
  formData.append('id',id_clave);
  formData.append('foto',nombre_foto);
  formData.append('nom',nombre);
  formData.append('ap_pat',ap_pat);
  formData.append('ap_mat',ap_mat);
  formData.append('e_mail',e_mail);
  formData.append('fnac',fnac);
  formData.append('telefono',telefono);

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

  let fila = nodo.parentNode.parentNode;

  $('#nombre2').val(fila.cells[0].innerHTML);
  $('#ap_pat2').val(fila.cells[1].innerHTML);
  $('#ap_mat2').val(fila.cells[2].innerHTML);
  $('#e_mail2').val(fila.cells[4].innerHTML);
  $('#contacto_id').val(id);

  let fecha = (fila.cells[5].innerHTML).split('/');

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
  }

  $('#fnac2').val(newFecha);
  $('#telefono2').val(fila.cells[3].innerHTML);
  $('#imagen').attr('src',fila.cells[6].firstChild.getAttribute('src'));
  $('#nom_foto').attr('value',fila.cells[6].firstChild.getAttribute('nom'));


  $('#exampleModal2').modal('show'); 

  $("#foto2").change(function() { //Cuando el input cambie (se cargue un nuevo archivo) se va a ejecutar de nuevo el cambio de imagen y se verá reflejado.
    readURL(this);
  });

}
//--------------------------------------------------------

async function login(){
  alert('Iniciar sesion')

  let usuario = document.getElementById('usu').value;
  let clave = document.getElementById('cve').value;

  const formData = new FormData()
  formData.append('usuario',usuario);
  formData.append('clave',clave);

  let respo = await fetch('http://localhost:3000/login',{
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
async function logout(){
  alert('Cerrando sesion');
  location.href = 'http://localhost:3000/logout'
}