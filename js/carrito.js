$(function() {   
    var costeTotal=0;

    anadirCompra();
    //borra la fila con el casco que no interesa:
    $(".close").click(eventoBorrar);

    //envia la lista de la compra:
    $("#validarCompra").click(enviarListaCompra);

  var myArray;

    function anadirCompra() {

        //añadir cascos a la lista de compra
        myArray = JSON.parse(sessionStorage.getItem('listaCompra')) || [];
        console.log(myArray.length);

        //muestra un mensaje si no hay ningún artículo seleccionado
        if (myArray.length==0) {
            $("#listaVacia").css("display","show");
            $("#tablaLista").css("display","none");
            $("#tablaCosteFinal").css("display","none");
            $("#datosCliente").css("display","none");
        }
        else {
            $("#listaVacia").css("display","none");
            $("#tablaLista").css("display","auto");
            $("#tablaCosteFinal").css("display","auto");
            $("#datosCliente").css("display","auto");
        };

        
        //recorre  el array con la lista y crea las filas
        costeTotal=0;
        for (var i = 0; i < myArray.length; i++) {
            var element = myArray[i];

            //crea el nodo (filaCasco) para la tabla con la lista de la compra:
            var nodo=$("<tr>");

            var modeloCasco=$("<td>").html(myArray[i].modelo);
            nodo.append(modeloCasco);
            var tallaCasco=$("<td>").html(myArray[i].talla);
            nodo.append(tallaCasco);
            var precioCasco=$("<td>").html(myArray[i].precio+'€');
            nodo.append(precioCasco);
            var unidadesCasco=$("<td>").html(1);
            nodo.append(unidadesCasco);
            var cerrar=$("<td>").html('<a href="#" class="close">&times;</a>BORRAR');
            nodo.append(cerrar);
            //indico donde quiero añadir ese nodo mediante un id
            $("#listaCompra").append(nodo); 

            //crea el nodo con el coste TOTAL de los artículos al final de la tabla
            var suma=parseInt(myArray[i].precio);
            costeTotal=costeTotal+suma;

        };
        //crea el nodo con el precio total de la compra:
        var nodoFinal=$("<tr>").addClass('success');
        var sumaTotal=$("<td>").html('TOTAL COMPRA: '+costeTotal+'€');
        nodoFinal.append(sumaTotal); 
        $("#costeFinal").append(nodoFinal);

    };

    
    function eventoBorrar(){
        
        //elimina de myArray el casco borrado
        var borrar = $(this).parent().parent();

        var cascoActivo= $(borrar).index();
        costeTotal -= myArray[cascoActivo-1].precio;

        myArray.splice(cascoActivo-1, 1)

        //borra la fila con el casco que se ha eliminado
        $(this).parent().parent().remove();

        sessionStorage.clear();
        sessionStorage.setItem('listaCompra', JSON.stringify(myArray));


        //borra todo y creo la lista actualizada 
        //$('nodo').remove();
        //anadirCompra();

        $('.success').find('td').html('TOTAL COMPRA: '+costeTotal+'€');

        //actualizo el carrito de la navbar
        var numArticulos=myArray.length;
        $(".navbar").find(".carrito").html('<img src="img/carrito.png" alt="cesta compra" width="30px" /><br/>'+numArticulos+" artículos");
 
    };

    
    
    //envia un email con la lista de la compra
    function enviarListaCompra(){
        var email = 'mailto:info@cascomotos.com';
        var compra= "";

        var nombreCliente=$("#inputNombre").val();
        var apellidoCliente=$("#inputApellidos").val();
        var direccionCliente=$("#inputCalle").val();
        var emailCliente=$("#inputEmail").val();
        var datosCliente=nombreCliente+' '+apellidoCliente+'\n'+direccionCliente +'\n'+emailCliente;

        for (var i = 0; i < myArray.length; i++) {
            var modeloArticulo= myArray[i].modelo;
            var tallaArticulo= myArray[i].talla;
            var precioArticulo= myArray[i].precio;

            compra = compra+ modeloArticulo+' talla: '+tallaArticulo+ ' precio: '+precioArticulo+'\n';
        }
        
        var mensaje= email + '?Subject=' + compra;

        $('#validarCompra').attr('href', mensaje);
        alert('Confirmada compra: '+'\n'
                +compra+'\n'
                +'Datos Personales: '+ '\n'+
                datosCliente);
        
    };
});


