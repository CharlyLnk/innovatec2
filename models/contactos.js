const db = require('../conection');

async function consultar(){
    let results = db
    .promise()
    .query('SELECT * from contactos')
    .then( ([results]) => {
        return results
    })
    .catch( e => console.log(e))
    return await results;
}
async function baja(id){
    let results = db
    .promise()
    .query('DELETE from contactos WHERE id= ?',[id],(error, result, fields)=>{
        if (error) return console.error(error.message)
    })
    .then( () => {
        return 'Registro eliminado';
    })
}

async function alta(datos){
  let datos2 = [datos.nombre, datos.ap_pat, datos.ap_mat, datos.email, datos.tel, datos.fnac, datos.foto];
  let query = db
  .promise()
  .query('INSERT INTO contactos (nombre, apellido_paterno, apellido_materno, email,telefono, fecha_nacimiento, foto) VALUES (?,?,?,?,?,?,?)',datos2)
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
    const text_query = `UPDATE contactos SET nombre = "${datos.nombre}", apellido_paterno = "${datos.ap_pat}", apellido_materno = "${datos.ap_mat}", email = "${datos.email}",telefono = "${datos.tel}", fecha_nacimiento = "${datos.fnac}", foto = "${datos.foto}" WHERE id = "${id}" `;
 
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
    login: login
}