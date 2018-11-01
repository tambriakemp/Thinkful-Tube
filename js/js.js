'use strict';

function initApp() {
    $('#search-form').on('submit', function (ev) {
        ev.preventDefault();
        console.log('For submitted! But we are not doing anything - yet.');

        let searchCriteria = $('#query').val();
        console.log({ searchCriteria });

        getRequest(searchCriteria);
    });
}

function getRequest(searchCriteria) {

        let url = 'https://www.googleapis.com/youtube/v3/search';
        let data = {    part: 'snippet, id',
                        q: searchCriteria,
                        type: 'video',
                        key: 'AIzaSyDt5iuCf8m9QH2C_6hwNQF76W_mFnsfers'
        };

        $.get(url, data, renderSearch);
}
    
        
function renderSearch (data) {
        console.log('We got an answer:', data);
        
        var html = "";
        var entries = data.items;

        if (data.items.length === 0) {
            $('.videos').append(`<p>Sorry, we can't find any results for that search criteria. Please search again.</p>`)
            // show the user that we've got no results from YouTube
        } else {
            $.each(entries, function (index, data) {
                let title = data.snippet.title;
                let thumbnail = data.snippet.thumbnails.medium.url;
                //variable holding data.part.property
                let videoId = data.id.videoId;

                html += '<div class="col-3"><!--<a href="https://youtube.com/embed/' + videoId + '?rel=0">' + title + '</a>-->';
                html += '<img src="' + thumbnail + '"></div>';
            }); 
            
            $('.videos').html(html);

        }
}


$(initApp);