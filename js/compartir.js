
const data = JSON.parse(sessionStorage.getItem('data'));
var title = `${data.Title} (${data.Type})`;
var comment = `${data.Year} 
Director: ${data.Director} 
Actores: ${data.Actors} 
${data.Plot}`;
document.getElementById('subject').value = title;
document.getElementById('comentario').value = comment;


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
    var emailr = email_receptor.value;
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


function enviarPorWhatsapp(){ 
    var alert_redirect = `<i class="fa fa-external-link" aria-hidden="true"></i> Redireccionando a WhatsApp`;

    $(".alert").html(alert_redirect)
        window.open("https://wa.me/?text=" + title + comment);
        return true;
}



