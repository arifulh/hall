(function(window, sclient, $) {

    sclient.init();
    $(window).on('statechangecomplete', function() {
        // _.defer(function() { sclient.refresh(); });
    })


}(window, window.sclient, jQuery));