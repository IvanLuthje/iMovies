function cancelar() {
    var respuesta = confirm('Desea volver a la pagina principal?')
    if (respuesta == true) {
        location.href = "index.html"
    }
    else {
        return false;
    }
}

function reset() {
    location.reload(true)
}

function enviar() {
    const form = document.getElementById('formulario_compartir');
    // const emaile = form.email_emisor.value;
    const emailr = form.email_receptor.value;

    const comentario = form.info.value;

    // if (emaile == "") {
    //     $(".alert").html("Debe ingresar el correo electrónico");
    //     return false;
    // }

    // if (emaile == "/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/") {
    //     $(".alert").html("Debe ingresar el correo electrónico válido");
    //     return false;
    // }


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

const nodemailer = require('nodemailer');

// Configura el transporte
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com", // Cambia por el servidor SMTP que uses
    port: 587, // Puerto SMTP (587 para STARTTLS, 465 para SSL/TLS)
    secure: false, // True si usas SSL/TLS
    auth: {
        user: "luthjem1@gmail.com", // Tu correo electrónico
        pass: "", // Tu contraseña
    },
});

// Configura el correo a enviar
const mailOptions = {
    from: '"Nombre Remitente" <tu_correo@example.com>', // Remitente
    to: "destinatario1@example.com, destinatario2@example.com", // Destinatarios
    subject: "Asunto del correo", // Asunto
    text: "Hola, este es el contenido del correo en texto plano.", // Contenido en texto plano
    html: "<b>Hola, este es el contenido del correo en HTML.</b>", // Contenido en HTML
};

// Enviar el correo
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.error("Error al enviar el correo:", error);
    }
    console.log("Correo enviado:", info.response);
});