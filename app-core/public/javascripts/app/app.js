PrimusClient.init();
_initTransitions();

$(function() {

    $('form:not("#signup, #signin")').each(function() {
        var $form = $(this);
        var action = $form.attr('action');
        var method = $form.attr('method');
        $form.submit(function() {
            $.ajax({ type: method, url: action, data: $form.serialize(),
                success: function(data) { console.log(data) } });
            return false;
        });
    });

})