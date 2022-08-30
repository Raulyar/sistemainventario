

    /*--===================================
        EDITAR CATEGORIA
    ===================================-*/

$(".btnEditarCategoria").click(function(){

	var idCategoria = $(this).attr("idCategoria");

	var datos = new FormData();
	datos.append("idCategoria", idCategoria)


	$.ajax({

		url:"ajax/categorias.ajax.php",
		method: "POST",
		data: datos,
		cache: false,
		contentType: false,
		processData: false,
		dataType: "json",
		success: function(respuesta){

			$("#editarCategoria").val(respuesta["categoria"]);
			$("#idCategoria").val(respuesta["id"]);


		}

	})

})

	    /*--===================================
        ELIMINAR CATEGORIA
    	===================================-*/

 $(".btnEliminarCategoria").click(function(){

 		var idCategoria = $(this).attr("idCategoria");

 		swal({

		title: '¿Está seguro de borrar la categoria?',
		text: "¡si no lo está puede cancelar la acción!",
		type: 'warning',
		showCancelButton: true,
		confirmButtonColor: '#3085d6',
		cancelButtonColor: '#d33',
		cancelButtonText: 'Cancelar',
		confirmButtonText: 'Si, borrar categoria'

	}).then((result)=>{

		if(result.value){


			window.location = "index.php?ruta=categorias&idCategoria="+idCategoria;


		}

	})


 })  	
