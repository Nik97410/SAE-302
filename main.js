$(function () {
    var apikey = "af28f0b586375adedc32b7523c3c0bdb";
    var baseURL = 'https://api.openweathermap.org/data/2.5/weather?APPID=' + apikey + '&units=metric&lang=fr'; //appel de l'APY + affichage unité Européeene et en français

    $('#weather button').click(function (e) {
        e.preventDefault(); //coupe le rechargement de la page

        var city = $('#city');
        var cityValue = city.val();  //la valeur saisie dans le formulaire par l'utilisateur.

        var params = {
            url: baseURL + '&q=' + cityValue, // paramètres de l'url.
            method: 'GET'
        };

        $.ajax(params).done(function (reponse) { //requête ajax : si l'url est valide ->


            //affiche les informations si le nom de la ville est correcte : 
            $('.card').removeClass('d-none');

            //si il y a une erreur:  
            city.removeClass('is-invalid');   // on enlève le message d'erreur
            $('.invalid-feedback').slideUp();   //l'encadré en rouge disparait
            $('.card').show(); //affiche les informations si la ville renseignée est correcte.

            //afficher le nom de la ville
            $('.card-title').text(reponse.name); //affichage avec css bootstrap

            // on traitre la description
            $('.description-weather').text(reponse.weather[0].description);

            // on arrondit les températures
            var temperature = Math.round(reponse.main.temp) + '°';
            var tempMax = Math.round(reponse.main.temp_max) + '°';
            var tempMin = Math.round(reponse.main.temp_min) + '°';

            //afficher les températures
            $('.temp-weather').text(temperature); //affiche la temp actuelle.
            $('.temp-max-weather').text(tempMax); //affiche la temp max
            $('.temp-min-weather').text(tempMin); // affiche le temp min

            //image
            var image = reponse.weather[0].icon;
            $('.image-weather').attr('src', 'http://openweathermap.org/img/wn/' + image + '.png'); //modifie l'attrbibut de src de la page html
            $('.image-weather').attr('alt', reponse.name); //modifie l'attribut du alt

        })  //le cas ou le nom de la ville est incorrecte : 
            .fail(function () {
                $('.invalid-feedback').slideDown(); //message d'erreur s'affiche
                city.addClass('is-invalid'); //formulaire encadré en rouge
                $('.card').hide(); //le résultat ne s'affiche pas lorsque la ville renseignée est incorrecte.

            });
    });

});



// https://api.openweathermap.org/data/2.5/weather?APPID=af28f0b586375adedc32b7523c3c0bdb&q=paris

