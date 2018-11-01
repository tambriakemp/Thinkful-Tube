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
                } else {
                    const results = data.items.map((item, index) => renderResult(item));
                    $('.videos').append(`
                    <div>
                      <h2>
                      <a class="js-result-name" href="${result.html_url}" target="_blank">${result.name}</a> by <a class="js-user-name" href="${result.owner.html_url}" target="_blank">${result.owner.login}</a></h2>
                      <p>Number of watchers: <span class="js-watchers-count">${result.watchers_count}</span></p>
                      <p>Number of open issues: <span class="js-issues-count">${result.open_issues}</span></p>
                    </div>
                  `);

                }
                //     $('.videos').append(`<div class="grid">${}</div>`);


                //     // let html = "";
                //     // let entries = data.items;
                    
                //     // $.each(entries, function (index, data) {
                //     //     let title = data.snippet.title;
                //     //     let thumb = data.snippet.thumbnails.high.url;

                //         // html += '<p>' + title + '</p>';
                //         // html += '<img src="' + thumb + '">';

                //     // }); 
                    
                //     // $('.videos').append(`<div class="grid">${html}</div>`);
                // }
            
                
        });                
    });
});