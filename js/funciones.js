
function agregar(){
  var id = "";
  var validate = ValidarCampos();
  if(validate == true){
    var editContact = document.getElementById('editButton').value;
    if(editContact == "false"){
        id = document.getElementById('idValueFinal').value;
    } else{
      id = document.getElementById('idValue').value;
      EliminarUsuario(id);
    }

    CrearFila(id);
    AsignarId(editContact, id);
  }
}

function CrearFila(id){
  var name = document.getElementById('nombre').value;
  var age = document.getElementById('edad').value;
  var email = document.getElementById('correo').value;

  if(ValidacionEmail(email)){
    var newRow = `<tr><td> ${id} </td><td> ${name} </td><td> ${age} </td><td> ${email} </td><td> ${AgregarBotones(id)} </td></tr> `;
    var newElement = document.createElement("TR");
    newElement.id="row_" + id;
    newElement.innerHTML=newRow;
    document.getElementById("contactos").appendChild(newElement);
    document.getElementById('editButton').value = false;

    var listEmail = document.getElementById('listEmail').value;
    listEmail = listEmail + "," + email;
    document.getElementById('listEmail').value = listEmail;
    limpiar();
  }

}


function AgregarBotones(id){
  var sectionButtons = `
    <input class=\"button\" id=\"buttonEdit_${id}\" type=\"button\" class=\"btn\" value=\"Editar\" onclick=\"EditarUsuario(${id})\"/>
    <input class=\"button\" id=\"buttonDelete_${id}\" type=\"button\" class=\"btn\" value=\"Eliminar\" onclick=\"EliminarUsuario(${id})\"/>`;
  return sectionButtons;
}

function limpiar(){
  document.getElementById('nombre').value = "";
  document.getElementById('edad').value = "";
  document.getElementById('correo').value = "";
}





function ValidacionEmail(email){
    var listEmails = document.getElementById('listEmail').value;
    var emails = [];
    var validate = true;
    if(listEmails != ""){
      emails = listEmails.split(',');
      for (let i=0; i<emails.length; i++){
        if(emails[i] == email){
          alert("El contacto que desea agregar ya se encuentra registrado. Por favor asigne otra dirección de correo");
          validate = false;
          break;
        }
      }
    }
    return validate;
}

function AsignarId(isEdit, id){
  if(isEdit == "false"){
    id = parseInt(id) + 1;
    document.getElementById('idValueFinal').value = id;
    document.getElementById('idValue').value = id;
  }else{
    var newId = document.getElementById('idValueFinal').value;
      document.getElementById('idValue').value = newId;
  }
}



function EditarUsuario(id){
  var trs = document.getElementById("row_"+id);

  var idEdit = trs.getElementsByTagName('td')[0].innerText;
  var nameEdit = trs.getElementsByTagName('td')[1].innerText;
  var ageEdit = trs.getElementsByTagName('td')[2].innerText;
  var emailEdit = trs.getElementsByTagName('td')[3].innerText;

  document.getElementById('idValue').value = idEdit;
  document.getElementById('nombre').value = nameEdit;
  document.getElementById('edad').value = ageEdit;
  document.getElementById('correo').value = emailEdit;

  document.getElementById('editButton').value = true;
  EliminarEmail(emailEdit);
}

function EliminarEmail(email){
  var listEmails = document.getElementById('listEmail').value;
  var listEmailsFinal = "";
  var emails = [];
  if(listEmails != ""){
    emails = listEmails.split(',');
    for (let i=0; i<emails.length; i++){
      if(emails[i] != email){
        listEmailsFinal = listEmailsFinal + emails[i];
      }
    }
  }
   document.getElementById('listEmail').value = listEmailsFinal;
}

function EliminarUsuario(id){
  var row = document.getElementById("row_"+id);
  row.remove();
  console.log(row);
}

function ValidarNombre(value){
  reg = /^[ñA-Za-z _]*[ñA-Za-z][ñA-Za-z _]*$/;
    if(!reg.test(value)){
      alert("El campo Nombre solo debe de contener letras en mayúsculos y/o minúsculas");
      return false;
    }
      return reg.test(value);
}

function ValidarEdad(value){
  reg = /^[0-9]*$/;
    if(!reg.test(value)){
      alert("El campo Edad, debe de contener caracteres numericos");
      return false;
    }
      return reg.test(value);
}



function ValidarCampos(){
  var validate = true;
  var validateN = true;
  var validateA = true;
  var validateE = true;

  var nombre = document.getElementById('nombre').value;
  var edad = document.getElementById('edad').value;
  var correo = document.getElementById('correo').value;


  if(nombre == ""){
    alert("El campo Nombre, es requerido");
    validateN = false;
  }else{
    validateN = ValidarNombre(nombre);
  }


  if(correo == ""){
    alert("El campo Correo Eletrónico, es requerido");
    validateE = false;
  }


  if(edad == ""){
    alert("El campo Edad, es requerido");
    validateA = false;
  }else{
    validateA = ValidarEdad(parseInt(edad));

    if(validateA){

      if(parseInt(edad) < 7 || parseInt(edad) > 80){
        alert("LA EDAD DEBE DE SER MAYOR A 7 AÑOS Y MENOR A 80");
        validateA = false;
      }
    }
  }

  if(!validateN || !validateA || !validateE){
    validate = false;
  }

  return validate;
}
