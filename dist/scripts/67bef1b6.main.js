(function() {

  require.config({
    paths: {
      hm: 'vendor/hm',
      esprima: 'vendor/esprima',
      jquery: 'vendor/jquery.min'
    },
    shims: {}
  });

  require(['app'], function(app) {});

}).call(this);
