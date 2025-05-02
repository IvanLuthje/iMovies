function cancelar() {
    var respuesta = confirm('Desea volver a la pagina principal?')
    if (respuesta == true) {
        location.href = "busqueda.html"
    }
    else {
        return false;
    }
}

function reset() {
    document.getElementById('email_receptor').value = '';
    document.getElementById('subject').value = '';
    document.getElementById('comentario').value = '';



}


function enviar() {
    const form = document.getElementById('formulario_compartir');
    const emailr = form.email_receptor.value;


    if (emailr == "") {
        $(".alert").html("Debe ingresar el correo electrónico");
        return false;
    }

    if (emailr == "^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$.") {
        $(".alert").html("Debe ingresar el correo electrónico válido");
        return true;
    }

    else {
        $(".alert").html("Redireccionando al gestor de correo")
        window.location = 'mailto: ' + $("#email_receptor").val() + '?subject=' + $("#subject").val() + '&body=' + $("#comentario").val();
        return true;
    }


}


