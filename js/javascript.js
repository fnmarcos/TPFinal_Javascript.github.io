const BASE_URL = 'http://localhost:3000';
const VERIFICATION_URL = `${BASE_URL}/usuarios/verificacion`;
const REGISTRATION_URL = `${BASE_URL}/usuarios/registro`;
const SEND_USER_URL = `${BASE_URL}/usuarios/envioUser`;
const GET_USER_URL = `${BASE_URL}/usuarios/getUser`;


$.get(GET_USER_URL, function (data) {

    var USER_LOGGED = data

    const FORUM_POSTS_URL = `${BASE_URL}/foro/posts/${USER_LOGGED}`;


    $(document).ready(function () {

        // MANEJO DE USUARIOS --------------------------------------------------------------------------------------------------------------

        // Login de Usuario

        $("#formularioLogin").submit(function (event) {

            event.preventDefault(); //Evita que el formulario se reenvie normalmente.

            //Obtener los datos de formulario y convertir a json
            const formData = $(this).serialize();

            //Realizar la solicitud POST
            $.post(VERIFICATION_URL, formData, function (response) {

                //Mostrar la respuesta del servidor
                if (response.message == 'Acceso concedido') {
                    $("#mensajeRespuesta").css("display", "block");
                    $("#mensajeError").css("display", "none");

                    var usuario = $("#nombreUsuario").val();

                    //Realizar la solicitud POST
                    $.post(SEND_USER_URL, { nombreUsuario: `${usuario}` }, function (res) {

                    });

                    // Redirige a foro.html en caso de acceso exitoso

                    window.location.href = "foro.html";

                } else {
                    $("#mensajeRespuesta").css("display", "none");
                    $("#mensajeError").text(response.message);
                    $("#mensajeError").css("display", "block");
                }


            });

        });

        // Registro de usuario

        $("#formularioRegistro").submit(function (event) {
            event.preventDefault(); //Evita que el formulario se reenvie normalmente.

            //Obtener los datos de formulario y convertir a json
            const formData = $(this).serialize();

            //Realizar la solicitud POST
            $.post(REGISTRATION_URL, formData, function (response) {

                if (response.message == 'Registro exitoso') {
                    $("#mensajeRespuesta").css("display", "block");
                    $("#mensajeError").css("display", "none");

                } else {
                    $("#mensajeRespuesta").css("display", "none");
                    $("#mensajeError").text(response.message);
                    $("#mensajeError").css("display", "block");
                }

            });

        });

        // MANEJO DE POSTS --------------------------------------------------------------------------------------------------------------

        // Obtener posts de usuario logueado 

        $.get(FORUM_POSTS_URL, function (dataRes) {

            $("#divPost").css("display", "none");
            $("#divForo").css("display", "block");

            var listaPosts = $('#listaPosts');

            dataRes.forEach(posts => {

                var postItem = $(`<li class="list-group-item d-flex justify-content-between align-items-center" onclick="InfoPost('${posts._id}')"> 
            
            ${posts.titulo} 

            <span class="badge badge-secondary badge-pill"> ${(posts.mensajes.length)} comentarios</span>

            </li>`);

                listaPosts.append(postItem);


            });

        });

        // Cargar nuevo comentario

        $("#formularioNuevoComentario").submit(function (event) {
            event.preventDefault(); //Evita que el formulario se reenvie normalmente.

            //Obtener los datos de formulario y convertir a json
            let formData = $(this).serialize();

            let postId = $("#tituloPost").attr("data-id");

            formData = `_id=${postId}&participante=${USER_LOGGED}&${formData}`

            // //Realizar la solicitud POST
            $.post(`${BASE_URL}/foro/comentario/${postId}`, formData, function (response) {

                //Mostrar la respuesta del servidor
                if (response.message == 'Registro exitoso') {

                    InfoPost(postId);
                    $("#divForo").css("display", "none");
                    $("#divPost").css("display", "block");
                    $("#formularioNuevoComentario").css("display", "block");

                } else {
                    $("#mensajeError").text(response.message);
                }


            });

        });

    });



});

// Obtener comentarios del post seleccionado

function InfoPost(postId) {

    $("#divForo").css("display", "none");
    $("#divPost").css("display", "block");
    $("#formularioNuevoComentario").css("display", "block");

    $.get(`${BASE_URL}/foro/post/${postId}`, function (dataResP) {

        $("#tituloPost").text(dataResP[0].titulo);
        $("#tituloPost").attr('data-id', `${postId}`);

        $("#divPostListado").empty();

        (dataResP[0].mensajes).forEach(post => {


            var postComentarios = $(`<div class="list-group-item p-2">
        
        <h6 class="list-group-item-heading text-primary">${post.participante}:</h6>
        <p class="list-group-item-text p-2"> - ${post.contenido}</p>
    
    
        </div>`);

            $("#divPostListado").append(postComentarios);

        });

    });
}


function volverPaginaAnterior() {
    window.location.href = "foro.html";
}
