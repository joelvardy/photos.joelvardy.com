var elixir = require('laravel-elixir');

elixir.config.assetsPath = 'app/assets';

elixir(function (mix) {

    mix.sass('app.scss');

    mix.scripts([
        '../../../bower_components/jquery/dist/jquery.min.js',
        '../../../bower_components/wookmark/wookmark.min.js',
        '../../../bower_components/jquery-colorbox/jquery.colorbox-min.js',
    ], elixir.config.publicPath+'/js/libs.js');

    mix.browserify('app.js', elixir.config.publicPath+'/js/app.js');

});
