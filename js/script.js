function loadData() {

    let $body = $('body');
    let $wikiElem = $('#wikipedia-links');
    let $nytHeaderElem = $('#nytimes-header');
    let $nytElem = $('#nytimes-articles');
    let $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview
    let streetStr = $('#street').val();
    let cityStr = $('#city').val();
    let imgSrc = "http://maps.googleapis.com/maps/api/streetview?size=600x300&location=" + streetStr + "," + cityStr;
    $body.append('<img class="bgimg" src=' + imgSrc + '/>');

    // New York Times
    let url = 'https://api.nytimes.com/svc/search/v2/' +
        'articlesearch.json?q=' + cityStr +
        '&sort=newest&api-key=cf9c7b4041244e59b05931de84704d5e';

    $.getJSON(url, function (data) {
        let docs;
        let doc;
        let items;

        $nytHeaderElem.text('New York Times Articles About ' + cityStr);

        docs = data.response.docs;
        for (doc of docs) {
            $nytElem.append('<li class="article">' +
                '<a href="' + doc.web_url + '">' + doc.headline.main + '</a>' +
                '<p>' + doc.snippet + '</p>' +
                '</li>');
        }

        // console.log(JSON.stringify(data));
    }).fail(function () {
        $nytHeaderElem.text('New York Times Articles About ' + cityStr + ' Could Not Be Loaded');
    });

    // Wikipedia queries using JSONP
    // http://api.jquery.com/jquery.ajax/
    // https://www.mediawiki.org/wiki/API:Main_page
    // https://www.mediawiki.org/wiki/API:Cross-site_requests
    let wikipUrl = 'https://en.wikipedia.org/w/api.php?action=opensearch'
    + '&search=' + cityStr + '&format=json&callback=foo';

    // var wikiRequestTimeout = setTimeout(function(){
    //     $wikiElem.text("failed to get wikipedia resources");
    // }, 8000);

    $.ajax({
        url : wikipUrl,
        dataType: "jsonp",
        headers: { 'Api-User-Agent': 'minicourse-ajax-project/1.0'},
        success : function (data, textStatus, jqXHR) {
            for (let i=0; i<data[1].length; i++){
                $("#wikipedia-links").append(
                    '<li><a href="' + data[3][i] + '">' + data[1][i] + '</a>'
                )
            };

            // clearTimeout(wikiRequestTimeout);
        }});
    return false;
}

$('#form-container').submit(loadData);
