/*=================================
SUBIENDO LA FOTO DEL USUARIO
==================================*/

$(".nuevaFoto").change(function(){


	var imagen = this.files[0];


	
		/*=================================
		SUBIENDO LA FOTO DEL USUARIO
		==================================*/


		if(imagen["type"] != "image/jpeg" && imagen["type"] != "image/png"){

			$(".nuevaFoto").val("");


			swal({
				title: "Error al subir imagen",
				text:  "¡La imagen debe estar en formato JPG O PNG!",
				type:  "error",
				confirmButtonText: "¡cerrar¡"
			});


		}else if(imagen["size"] > 2000000){

			$(".nuevaFoto").val("");

			swal({
				title: "Error al subir imagen",
				text:  "¡La imagen no debe pesar mas de 2MB!",
				type:  "error",
				confirmButtonText: "¡cerrar¡"
			});	



		}else{


			 var datosImagen = new FileReader;
			 datosImagen.readAsDataUrl(imagen);

			 $(datosImagen).on("load", function(event){

			 	var rutaImagen = event.target.result;

			 	$(".previsualizar").attr("src", rutaImagen)



			 })

		}

})	


/*=================================
EDITAR USUARIO
==================================*/

$(".btnEditarUsuario").click(function(){

	var idUsuario = $(this).attr("idUsuario");

	var datos = new FormData();
	datos.append("idUsuario", idUsuario)

	$.ajax({

		url:"ajax/usuarios.ajax.php",
		method: "POST",
		data: datos,
		cache: false,
		contentType: false,
		processData: false,
		dataType: "json",
		success: function(respuesta){

			$("#editarNombre").val(respuesta["nombre"]);
			$("#editarUsuario").val(respuesta["usuario"]);
			$("#editarPerfil").html(respuesta["perfil"]);
			$("#editarPerfil").val(respuesta["perfil"]);
			$("#fotoActual").val(respuesta["foto"]);	

			$("#passwordActual").val(respuesta["password"]);



			if(respuesta["foto"] != ""){

				$(".previsualizar").attr("src", respuesta["foto"]);

			}

		}

	});

})

/*=================================
ACTIVAR USUARIO
==================================*/

$(".btnActivar").click(function(){

	var idUsuario = $(this).attr("idUsuario");
	var estadoUsuario = $(this).attr("estadoUsuario");

	var datos = new FormData();
	datos.append("activarId", idUsuario);
	datos.append("activarUsuario", estadoUsuario);

	$.ajax({

		url:"ajax/usuarios.ajax.php",
		method: "POST",
		data: datos,
		cache: false,
		contentType: false,
		processData: false,
		success: function(respuesta){


		}

	})

	if(estadoUsuario == 0){

		$(this).removeClass('btn-success');
		$(this).addClass('btn-danger');
		$(this).html('Desactivado');
		$(this).attr('estadoUsuario' ,1);
		
	}else{

		$(this).addClass('btn-success');
		$(this).removeClass('btn-danger');
		$(this).html('Activado');
		$(this).attr('estadoUsuario' ,0);

	}

})

/*=====================================
REVISAR SI EL USUARIO YA ESTA REGISTRADO
======================================*/

$("#nuevoUsuario").change(function(){

	$(".alert").remove();

	var usuario = $(this).val();

	var datos = new FormData();
	datos.append("validarUsuario", usuario);

	$.ajax({
		url:"ajax/usuarios.ajax.php",
		method: "POST",
		data: datos,
		cache: false,
		contentType: false,
		processData: false,
		dataType: "json",
		success: function(respuesta){

			if(respuesta){

				$("#nuevoUsuario").parent().after('<div class="alert alert-warning">Este usuario ya existe en la base de datos</div>');

				$("#nuevoUsuario").val("");


			}

		}

	})	

})

/*=====================================
ELIMINAR USUARIO
=====================================*/

$(".btnEliminarUsuario").click(function(){

	var idUsuario = $(this).attr("idUsuario");
	var fotoUsuario = $(this).attr("fotoUsuario");
	var usuario = $(this).attr("usuario");


	swal({

		title: '¿está seguro de borrar el usuario?',
		text: "¡si no lo esta puede cancelar la accion!",
		type: 'warning',
		showCancelButton: true,
		confirmButtonColor: '#3085d6',
		cancelButtonColor: '#d33',
		cancelButtonText: 'cancelar',
		confirmButtonText: 'Si, borrar usuario'

	}).then((result)=>{

		if(result.value){


			window.location = "index.php?ruta=usuarios&idUsuario="+idUsuario+"&usuario="+usuario+"fotoUsuario="+fotoUsuario;



		}

	})

})

