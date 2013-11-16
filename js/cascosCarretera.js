var baseDeCascos = {
	carretera : {
		arrow : [
			{ref:"casco010", modelo:"Route66", marca: "BELL", peso:1500, caracteristica:"Flow ajust, antiscrash", precio:333, imagen:"img/cascos/casco5.png"},
			{ref:"casco011", modelo:"ArrowBass", marca: "BELL", peso:2000, caracteristica:"ventilación", precio:555, imagen:"img/cascos/casco6.png" },
			{ref:"casco012", modelo:"Arrow Pro", marca: "BELL", peso:1300, caracteristica:"ventilación", precio:699, imagen:"img/cascos/casco7.png" }
		],
		rootlight : [
			{ref:"casco013", modelo:"Root One", marca: "casco Root One", peso:1500, caracteristica:"ventilación", precio:333, imagen:"img/cascos/casco8.png" },
			{ref:"casco014", modelo:"Root Two", marca: "casco Root Two", peso:2000, caracteristica:"ventilación", precio:555, imagen:"img/cascos/casco9.png" },
			{ref:"casco015", modelo:"Root Mas", marca: "casco Root Mas", peso:1300, caracteristica:"ventilación", precio:699, imagen:"img/cascos/casco10.png" }
		],
		vortex : [
			{ref:"casco016", modelo:"Flack Star", marca: "casco Root One", peso:1500, caracteristica:"ventilación", precio:333, imagen:"img/cascos/casco11.png" },
			{ref:"casco017", modelo:"Monarch Tonal", marca: "casco Root Two", peso:2000, caracteristica:"ventilación", precio:555, imagen:"img/cascos/casco12.png" },
			{ref:"casco018", modelo:"Monarch Pink", marca: "casco Root Mas", peso:1300, caracteristica:"ventilación", precio:699, imagen:"img/cascos/casco13.png" }
		]  
	},

	calle : {
		urban : [
			{ref:"casco019", modelo:"UrbanBass", marca: "casco UrbanBass", peso:1500, caracteristica:"ventilación", precio:333, imagen:"img/cascos/casco14.png" },
			{ref:"casco020", modelo:"Urban Bio", marca: "casco Urban Bio", peso:2000, caracteristica:"ventilación", precio:555, imagen:"img/cascos/casco5.png" },
			{ref:"casco021", modelo:"Urban GTX", marca: "casco Urban GTX", peso:1300, caracteristica:"ventilación", precio:699, imagen:"img/cascos/casco5.png" }
		],
		asphalt : [
			{ref:"casco022", modelo:"Asphalt A", marca: "casco Asphalt A", peso:1500, caracteristica:"ventilación", precio:333, imagen:"img/cascos/casco5.png" },
			{ref:"casco023", modelo:"Asphalt T", marca: "casco Asphalt T", peso:2000, caracteristica:"ventilación", precio:555, imagen:"img/cascos/casco5.png" },
			{ref:"casco024", modelo:"Asphalt X", marca: "casco Asphalt X", peso:1300, caracteristica:"ventilación", precio:699, imagen:"img/cascos/casco5.png" }
		] 
	},

	scooter : {
		hipster : [
			{ref:"casco025", modelo:"gts", marca: "casco gts", peso:1500, caracteristica:"ventilación", precio:333, imagen:"img/cascos/casco5.png" },
			{ref:"casco026", modelo:"gtd", marca: "casco gtd", peso:2000, caracteristica:"ventilación", precio:555, imagen:"img/cascos/casco5.png" },
			{ref:"casco027", modelo:"gtx", marca: "casco gtx", peso:1300, caracteristica:"ventilación", precio:699, imagen:"img/cascos/casco5.png" }
		],
		roundabout : [
			{ref:"casco028", modelo:"gts", marca: "casco gts", peso:1500, caracteristica:"ventilación", precio:333, imagen:"img/cascos/casco5.png" },
			{ref:"casco029", modelo:"gtd", marca: "casco gtd", peso:2000, caracteristica:"ventilación", precio:555, imagen:"img/cascos/casco5.png" },
			{ref:"casco030", modelo:"gtx", marca: "casco gtx", peso:1300, caracteristica:"ventilación", precio:699, imagen:"img/cascos/casco5.png" }
		] 
	}
};


//var plantillaCasco = 
            //'<div class="span4">
            //  <img class="cascos" src="img/cascos/casco5.png">
            //  <h3>Mod. Casco</h3>
            //  <p>Precio</p>
            //  <p><a href="#casco5-modal" role="button" class="btn btn-cascomoto" data-toggle="modal">VER DETALLES &raquo; </a></p>
            //</div>'


$(function() {

	CargarCascos(baseDeCascos, 'carretera', 'arrow');


	$('.badge').click(function(e){
		$('.badge').removeClass('badge-inverse');
		$('.badge').removeClass('badge-important');
		$(this).addClass('badge-important');
	});


	$('.addCarrito').click(function(e) {
		var modDeCasco=$(this).parent().parent().find('.modal-header').find('h3').html();
		var tallaDeCasco=$(this).parent().parent().find('.modal-body').find('a .badge-important').html();
		var precioCasco=$(this).parent().parent().find('.modal-body').find('ul li.precio').html();

		alert(modDeCasco +' TALLA: '+ tallaDeCasco+' '+precioCasco);
	});

	function CargarCascos(cascos, clasificacion, linea){
		var lineaArrow = $('.' + clasificacion + linea + ' .row');


		for (var i = cascos.carretera.arrow.length - 1; i >= 0; i--) {
			
			var casco = $('<div>').addClass('span4');
			var imagen = $('<img>').addClass('cascos').attr('src', cascos.carretera.arrow[i].imagen);
			casco.append(imagen);
			var titulo = $('<h3>').html(cascos.carretera.arrow[i].modelo);
			casco.append(titulo);
			var precio = $('<p>').html('PRECIO: '+cascos.carretera.arrow[i].precio+' €');
			casco.append(precio);
			var boton = $('<a>').addClass('btn btn-cascomoto').attr('referencia', cascos.carretera.arrow[i].ref);
			boton.attr('clasificacion', clasificacion + '.' + linea);
			boton.attr('role', 'button').html('VER DETALLES &raquo;');
			var parrafoboton = $('<p>').append(boton);
			casco.append(parrafoboton);

			lineaArrow.append(casco);

			//cascos.carretera.arrow[i].marca			
			//cascos.carretera.arrow[i].caracteristica
			//cascos.carretera.arrow[i].peso
		};
	}

	$('.btn-cascomoto').click(function(){
		var referencia = $(this).attr('referencia');
		var clasif = $(this).attr('clasificacion');

		// PEDIMOS A LA BASE DE DATOS EL CASCO CON ESA REFERENCIA.
		var cascoBDD = eval('baseDeCascos.' + clasif);
		// Buscar dentro de la categoría
		for (var i = cascoBDD.length - 1; i >= 0; i--) {
			if (cascoBDD[i].ref == referencia)
			{
				cascoBDD = cascoBDD[i];
				break;
			}
		};

		// Rellenamos el diálogo:
		$('#nombreCascoModal').html('MOD: '+cascoBDD.modelo);
		$('#imagenModal').attr('src', cascoBDD.imagen);
		$('#marcaModal').html('Marca: '+cascoBDD.marca);
		$('#pesoModal').html('Peso: '+cascoBDD.peso + ' gr');
		$('#caractModal').html('Con: '+cascoBDD.caracteristica);
		$('#precioModal').html('Precio: '+cascoBDD.precio+ ' €');

		$('#modalTotal').modal();
	});
});



