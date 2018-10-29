'use strict';


//function for getting youtube data
// function getDataFromYoutube () {

// }

//handle search button click
function handleSearchButton (){
    $('.form-container').on('submit','#start-button', function(event){
        event.preventDefault();
    });

    handleSearch();
}

//function for search
function handleSearch () {
    $('.form-container').on('click','#start-button', function(event){
        event.preventDefault();
    });
    //clear results
    $('.videos').html('');
    $('#search-button').html('');

    //get form input
   let q = $('#query').val();

    //Run GET request on api
    $.get("https://www.googleapis.com/youtube/v3/search",{
        part: 'snippet, id',
        q: q,
        type: 'video',
        key: 'AIzaSyDt5iuCf8m9QH2C_6hwNQF76W_mFnsfers'},
        function(data) {
            let nextPageToken = data.nextPageToken;
            let prevPageToken = data.prevPageToken;

            console.log(data);

    });

    // $('search-button').on('click', function (event) {

    //     $('videos').append('')

    // })
}

// function displaySearch(event) {
// //clear results


//     $('videos').append(`
//             <div class="3col-container">

//             </div>`)
// }


//event listener
function watchSubmit() {
    handleSearchButton();
    handleSearch();
}


$(watchSubmit);