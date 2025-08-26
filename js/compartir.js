function cancelar() {
    window.location.href = "index.html"
}

function compartir() {
    window.location.href = "compartir_resultados.html"
}

function reset() {
    document.getElementById('email_receptor').value = '';
    document.getElementById('subject').value = '';
    document.getElementById('comentario').value = '';

}


function enviar() {
    const form = document.getElementById('formulario_compartir');
    var emailr = form.email_receptor.value;
    var alert_correo = `<i class='fas fa-exclamation-triangle'></i> Debe ingresar el correo electrónico`;
    var alert_redirect = `<i class="fa fa-external-link" aria-hidden="true"></i> Redireccionando al gestor de correo`;
    var alert_valido = `<i class='fas fa-exclamation-triangle'></i> Debe ingresar el correo electrónico válido`;

    var emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;


    if (emailr == "") {
        $(".alert").html(alert_correo);
        return false;
    }

    if (!emailRegex.test(emailr)){
        $(".alert").html(alert_valido);
        return false;
    }

  
    $(".alert").html(alert_redirect)
        window.location = 'mailto: ' + $("#email_receptor").val() + '?subject=' + $("#subject").val() + '&body=' + $("#comentario").val();
        return true;
   

}


