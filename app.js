/* jshint browser: true, jquery: true, camelcase: true, indent: 2, undef: true, quotmark: single, maxlen: 80, trailing: true, curly: true, eqeqeq: true, forin: true, immed: true, latedef: true, newcap: true, nonew: true, unused: true, strict: true */

var main = function() {
    'use strict';

    document.getElementById('comment-section').innerHTML = 'comment1';
    document.getElementById('comment-section').innerHTML = 'comment2';
    document.getElementById('comment-section').innerHTML = 'comment3';

    $('#average-button').on('click', function() {
        $.ajax({
            contentType: 'application/json',
            type: 'POST',
            url: 'http://localhost:3000/average',
            data: JSON.stringify({
                'array': '[1,2,3,4]'
            }),
            dataType: 'json',
            success: function(data) {
                window.alert('Result: ' + data.result);
            }
        });
    });
};

$(document).ready(main);
