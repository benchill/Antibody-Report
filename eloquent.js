// eloquent.js

(function() {
    'use strict';

    // Declarations

    var add_callbacks, process_form;

    // Definitions

    add_callbacks = function(tagname, callback) {
        var i, n, x;
        x = document.getElementsByTagName(tagname);
        n = x.length;
        for(i = 0; i < n; i += 1) {
            x[i].onchange = callback;
        }
        return;
    };

    process_form = function() {
        // (placeholder)
    };

    // Invocations

    //add_callbacks('input', process_form);

    $('input[type="text"]').each(function(key, val) {
        var x, y;
        x = val.id;
        y = 'comp' + 
        val.onchange = function () {
            compatible(val.id, );
        };
        return;
    });

    return;

} ());