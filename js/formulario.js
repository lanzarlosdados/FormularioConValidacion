const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');

const expresiones = {
	usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	password: /^.{4,12}$/, // 4 a 12 digitos.
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	telefono: /^\d{7,14}$/ // 7 a 14 numeros.
}
const campos = {
	usuario: false,
	nombre: false,
	password: false,
	correo: false,
	telefono: false,
	terminos:false
}

const validarFormulario = (e)=>{
	
	const inputName = e.target.name;
	const inputValue = e.target.value;
	
	if (inputName !== 'terminos'){
		
		switch(inputName){

			case "password2":
				validarPassword2();
				break;
			case "password":
				validarCampo(inputName,inputValue);
				validarPassword2();
				break;
			default:
				validarCampo(inputName,inputValue);
				break;
		}
	
	}
	
};

function validarPassword2(){
	const password2= document.getElementById('password2').value;
	const password1= document.getElementById('password').value;

	if(password1 === password2){
		
		document.getElementById( `formulario_password2` ).classList.remove('formulario-incorrecto');
		document.getElementById( `formulario_password2` ).classList.add('formulario-correcto');
		document.querySelector(`#formulario_password2 i`).classList.remove('fa-times-circle');
		document.querySelector(`#formulario_password2 i`).classList.add('fa-check-circle');
		document.querySelector(`#formulario_password2 p`).classList.remove('formulario_mensaje-error-activo');
		campos['password']=true;
	}else{

		document.getElementById( `formulario_password2` ).classList.remove('formulario-correcto');
		document.getElementById( `formulario_password2` ).classList.add('formulario-incorrecto');
		document.querySelector(`#formulario_password2 i`).classList.remove('fa-check-circle');
		document.querySelector(`#formulario_password2 i`).classList.add('fa-times-circle');
		document.querySelector(`#formulario_password2 p`).classList.add('formulario_mensaje-error-activo');
		campos['password']=false;
	}

	

}

function validarCampo(inputName,inputValue){

	if(expresiones[inputName].test(inputValue)){
		
		document.getElementById( `formulario_${inputName}` ).classList.remove('formulario-incorrecto');
		document.getElementById( `formulario_${inputName}` ).classList.add('formulario-correcto');
		document.querySelector(`#formulario_${inputName} i`).classList.remove('fa-times-circle');
		document.querySelector(`#formulario_${inputName} i`).classList.add('fa-check-circle');
		document.querySelector(`#formulario_${inputName} p`).classList.remove('formulario_mensaje-error-activo');
		campos[inputName]=true;
	}else{

		document.getElementById( `formulario_${inputName}` ).classList.remove('formulario-correcto');
		document.getElementById( `formulario_${inputName}` ).classList.add('formulario-incorrecto');
		document.querySelector(`#formulario_${inputName} i`).classList.remove('fa-check-circle');
		document.querySelector(`#formulario_${inputName} i`).classList.add('fa-times-circle');
		document.querySelector(`#formulario_${inputName} p`).classList.add('formulario_mensaje-error-activo');
		campos[inputName]=false;

	}
}


inputs.forEach((input)=>{
	input.addEventListener('keyup', validarFormulario);  //Keyup=Cuando el usuario levanta la tela
	input.addEventListener('blur', validarFormulario); //blur=Cuando el usuario hace click fuera del input

});

formulario.addEventListener('submit',(e)=>{
	e.preventDefault();

	const terminos = document.getElementById('terminos');
	if(campos.usuario && campos.nombre && campos.password && campos.correo && campos.telefono && terminos.checked ){
		formulario.reset();

		document.getElementById('formulario__mensaje').classList.remove('formulario__mensaje-activo');


		document.getElementById('formulario-exito').classList.add('formulario-exito-activo');
		setTimeout(() => {
			document.getElementById('formulario-exito').classList.remove('formulario-exito-activo');
		}, 5000);

		document.querySelectorAll('.formulario-correcto').forEach((icono) => {
			icono.classList.remove('formulario-correcto');
		});
	} else {
		document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
	}
});
























/* const campos = {
	usuario: false,
	nombre: false,
	password: false,
	correo: false,
	telefono: false
}

const validarFormulario = (e) => {
	switch (e.target.name) {
		case "usuario":
			validarCampo(expresiones.usuario, e.target, 'usuario');
		break;
		case "nombre":
			validarCampo(expresiones.nombre, e.target, 'nombre');
		break;
		case "password":
			validarCampo(expresiones.password, e.target, 'password');
			validarPassword2();
		break;
		case "password2":
			validarPassword2();
		break;
		case "correo":
			validarCampo(expresiones.correo, e.target, 'correo');
		break;
		case "telefono":
			validarCampo(expresiones.telefono, e.target, 'telefono');
		break;
	}
}

const validarCampo = (expresion, input, campo) => {
	if(expresion.test(input.value)){
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle');
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle');
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
		campos[campo] = true;
	} else {
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle');
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
		campos[campo] = false;
	}
}

const validarPassword2 = () => {
	const inputPassword1 = document.getElementById('password');
	const inputPassword2 = document.getElementById('password2');

	if(inputPassword1.value !== inputPassword2.value){
		document.getElementById(`grupo__password2`).classList.add('formulario__grupo-incorrecto');
		document.getElementById(`grupo__password2`).classList.remove('formulario__grupo-correcto');
		document.querySelector(`#grupo__password2 i`).classList.add('fa-times-circle');
		document.querySelector(`#grupo__password2 i`).classList.remove('fa-check-circle');
		document.querySelector(`#grupo__password2 .formulario__input-error`).classList.add('formulario__input-error-activo');
		campos['password'] = false;
	} else {
		document.getElementById(`grupo__password2`).classList.remove('formulario__grupo-incorrecto');
		document.getElementById(`grupo__password2`).classList.add('formulario__grupo-correcto');
		document.querySelector(`#grupo__password2 i`).classList.remove('fa-times-circle');
		document.querySelector(`#grupo__password2 i`).classList.add('fa-check-circle');
		document.querySelector(`#grupo__password2 .formulario__input-error`).classList.remove('formulario__input-error-activo');
		campos['password'] = true;
	}
}

inputs.forEach((input) => {
	input.addEventListener('keyup', validarFormulario);
	input.addEventListener('blur', validarFormulario);
});

formulario.addEventListener('submit', (e) => {
	e.preventDefault();

	const terminos = document.getElementById('terminos');
	if(campos.usuario && campos.nombre && campos.password && campos.correo && campos.telefono && terminos.checked ){
		formulario.reset();

		document.getElementById('formulario__mensaje-exito').classList.add('formulario__mensaje-exito-activo');
		setTimeout(() => {
			document.getElementById('formulario__mensaje-exito').classList.remove('formulario__mensaje-exito-activo');
		}, 5000);

		document.querySelectorAll('.formulario__grupo-correcto').forEach((icono) => {
			icono.classList.remove('formulario__grupo-correcto');
		});
	} else {
		document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
	}
}); */