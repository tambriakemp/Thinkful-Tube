$(function initApp() {
    'use strict';


    $('#search-form').on('submit', function (ev) {
        ev.preventDefault();
        console.log('For submitted! But we are not doing anything - yet.');

        let searchCriteria = $('#query').val();
        console.log({ searchCriteria });

        $.get("https://www.googleapis.com/youtube/v3/search", {
            part: 'snippet, id',
            q: searchCriteria,
            type: 'video',
            key: 'AIzaSyDt5iuCf8m9QH2C_6hwNQF76W_mFnsfers'
        },  function (data) {
                console.log('We got an answer:', data);

                if (data.items.length === 0) {
                    $('.videos').append(`<p>Sorry, we can't find any results for that search criteria. Please search again.</p>`)
                    // show the user that we've got no results from YouTube

                    //  return 
                } 
           
                
        });                
    });
});