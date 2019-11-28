var elixir = require('laravel-elixir');

elixir(function(mix) {

    mix.less([
        './node_modules/normalize.less/normalize.less',
        './assets/less/style.less',
        // './assets/less/core/*.less',
        // './assets/less/blocks/*.less',

    ], 'public/css/app.css');

    mix.scripts([
        './node_modules/jquery/dist/jquery.js',
        './assets/js/app.js',
    ], 'public/js/app.js');


});
