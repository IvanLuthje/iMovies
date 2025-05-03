function cancelar() {
    window.location.href = "index.html"
}

function reset() {
    document.getElementById('email_receptor').value = '';
    document.getElementById('subject').value = '';
    document.getElementById('comentario').value = '';

}


function enviar() {
    const form = document.getElementById('formulario_compartir');
    const emailr = form.email_receptor.value;
    var alert_correo = `<i class='fas fa-exclamation-triangle'></i> Debe ingresar el correo electrónico`;
    var alert_redirect= `<i class="fa fa-external-link" aria-hidden="true"></i> Redireccionando al gestor de correo`;

    if (emailr == "") {
        $(".alert").html(alert_correo);
        return false;
    }

    if (emailr == "^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$.") {
        $(".alert").html("Debe ingresar el correo electrónico válido");
        return true;
    }

    else {
        $(".alert").html(alert_redirect)
        window.location = 'mailto: ' + $("#email_receptor").val() + '?subject=' + $("#subject").val() + '&body=' + $("#comentario").val();
        return true;
    }


}


