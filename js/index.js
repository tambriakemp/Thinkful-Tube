'use strict';

function initApp() {
    getRequest();

    handleSearch();

}

function handleSearch() {
    // $('.featured-video').hide();
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
    let data = {
        part: 'snippet, id',
        maxResults: '9',
        q: searchCriteria,
        type: 'video',
        key: 'AIzaSyDt5iuCf8m9QH2C_6hwNQF76W_mFnsfers'
    };

    $.get(url, data, renderSearch);
}

function renderSearch(data) {
    console.log('We got an answer:', data);
    // 
    $('.videos').html('');

    $.each(data.items, function (i, data) {

        let title = data.snippet.title;
        let thumbnail = data.snippet.thumbnails.medium.url;
        //variable holding data.part.property
        let vid = data.id.videoId;
        // let desc = data.snippet.description.substring(0, 100);
        let chan = data.snippet.channelTitle;

        $('.videos').append(`
                         <div class="col-3" data-key="${vid}">

                            <img src="${thumbnail}" alt="" class="thumb">
                            <div class="details">
                                <h4><a href="#" class="play-video" title="Play Selected Video">${title}</a></h4>
                                <p class="channel-title">${chan}</p>

                            </div>

                        </div>
                    `);
    });

    $('.videos').on('click', '.col-3', function () {
        var id = $(this).attr('data-key');
        featuredVid(id);
    });
}

function featuredVid(id) {
    $('.featured-video').show().html(`
    <iframe src="https://www.youtube.com/embed/${id}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
    `);
}

$(initApp);


//[ ] Pagination
//[ ] Add second api to pull statistics data for view count and channel name
//[ ] Show a link for more from the channel that each video came from
//[ ] add if statement for no results back
//[ ] show featured on load of app



