'use strict';

function initApp() {

    $('.featured-video').hide();
    $('#search-form').on('submit', function (ev) {
        ev.preventDefault();
        console.log('For submitted! But we are not doing anything - yet.');

        // const searchCriteriaTarget = $(ev.currentTarget).find('#query');
        let searchCriteria = $('#query').val();

        console.log({ searchCriteria });

        // searchCriteriaTarget.val("");

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
    // handleResetSearch();

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
        let desc = data.snippet.description.substring(0, 100);


        $('.videos').append(`
                         <div class="col-3" data-key="${vid}">

                            <img src="${thumbnail}" alt="" class="thumb">
                            <div class="details">
                                <h4><a href="#" class="play-video">${title}</a></h4>
                                <p>${desc}</p>
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
    <iframe width="560" height="315" src="https://www.youtube.com/embed/${id}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
    `);
}

// $('.featured-video').on('click', function () {
//     let id = $(this).attr('data-key');
//     mainVid(id);
// });

// function renderSearch (data) {
//         console.log('We got an answer:', data);

//         var html = "";
//         var entries = data.items;

//         if (data.items.length === 0) {
//             $('.videos').append(`<p>Sorry, we can't find any results for that search criteria. Please search again.</p>`)
//             // show the user that we've got no results from YouTube
//         } else {
//             $.each(entries, function (index, data) {
//                 let title = data.snippet.title;
//                 let thumbnail = data.snippet.thumbnails.medium.url;
//                 //variable holding data.part.property
//                 let videoId = data.id.videoId;

//                 html += '<div class="col-3"><img src="' + thumbnail + '">';
//                 html += '<div class="col-3-container"><a href="#" id="' + videoId + '" class="video-link">' + title + '</a></div></div>';
//             }); 

//             $('.videos').html(html);

// $('.video-link').on('click', function(ev) {
//     $('.featured-video').show();

//     $('#video').src += videoId;
// })

//         }
// }
// function handleResetSearch () {
//     $('.videos').remove('.col-3');

//     handleApiData();
// }

// function initApp() {
//     handleApiData();
//     handleResetSearch();
// }

$(initApp);
