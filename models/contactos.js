const db = require('../conection');

async function consultar(){
    let results = db
    .promise()
    .query('SELECT * from predios')
    .then( ([results]) => {
        return results
    })
    .catch( e => console.log(e))
    return await results;
}
async function baja(id){
    let results = db
    .promise()
    .query('DELETE from predios WHERE numero_predio= ?',[id],(error, result, fields)=>{
        if (error) return console.error(error.message)
    })
    .then( () => {
        return 'Registro eliminado';
    })
}

async function alta(datos){
  let datos2 = [datos.numero_predio, datos.numero_usuario, datos.nombre_predio, datos.nombre_propietario, datos.tipo_cultivo, datos.cuerpos_agua, datos.tipo_cuerpo_agua, datos.direccion, datos.ciudad, datos.estado, datos.pais, datos.tam_predio, datos.tipo_riego, datos.tipo_suelo, datos.coordenadas, datos.imagen];
  let query = db
  .promise()
  .query('INSERT INTO predios (numero_predio, numero_usuario, nombre_predio, nombre_propietario, tipo_cultivo, cuerpos_agua, tipo_cuerpo_agua, direccion, ciudad, estado, pais, tam_predio, tipo_riego, tipo_suelo, coordenadas, imagen) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',datos2)
  .then(()=>{
    console.log('datos insertados')
  })
  .catch(e => console.log(e));
  return query;
}

async function registrarUsuario(datos){
  let datos2 = [datos.usuario, datos.clave];
  let query = db
  .promise()
  .query('INSERT INTO usuarios (usuario, clave) VALUES (?,?)',datos2)
  .then(()=>{
    console.log('datos insertados')
  })
  .catch(e => console.log(e));
  return query;
}

async function modi(datos, id){
    //let datos2 = [datos.nombre, datos.ap_pat, datos.ap_mat, datos.email, datos.tel, datos.fnac, datos.foto];
    console.log(datos)
    console.log('>>>>>>'+id+'<<<<<<')
    const text_query = `UPDATE predios SET nombre_predio = "${datos.nombre_predio}", nombre_propietario = "${datos.nombre_propietario}", tipo_cultivo = "${datos.tipo_cultivo}", cuerpos_agua = "${datos.cuerpos_agua}",direccion = "${datos.direccion}", ciudad = "${datos.ciudad}", estado = "${datos.estado}", pais = "${datos.pais}", tam_predio = "${datos.tam_predio}", tipo_riego = "${datos.tipo_riego}", tipo_suelo = "${datos.tipo_suelo}", coordenadas = "${datos.coordenadas}", imagen = "${datos.imagen}" WHERE numero_predio = "${id}" `;
 
    console.log(text_query)

    let query = db
    .promise()
    .query(text_query)
    .then(()=>{
      console.log('datos modificados')
    })
    .catch(e => console.log(e));
    return query;
  }

async function login(usuario, clave) {
  let results = db
    .promise()
    .query(`SELECT * from usuarios WHERE usuario= "${usuario}" AND clave= "${clave}"`)
    .then( ([results]) => {
        return results
    })
    .catch( e => console.log(e))
    return await results;
}
module.exports = {
    consultar: consultar,
    baja: baja,
    alta: alta,
    modi: modi,
    login: login,
    register: registrarUsuario
}