var elixir = require('laravel-elixir');

elixir(function(mix) {

    mix.less([
        './node_modules/normalize.less/normalize.less',
        './node_modules/swiper/dist/css/swiper.css',
        './assets/less/basics.less',
        './assets/less/blocks/*.less',
        // './assets/less/core/*.less',
        // './assets/less/blocks/*.less',

    ], 'public/css/app.css');

    mix.scripts([
        './node_modules/jquery/dist/jquery.js',
        './node_modules/swiper/dist/js/swiper.js',
        './assets/js/app.js',
    ], 'public/js/app.js');


});
