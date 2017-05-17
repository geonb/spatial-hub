// http://www2.ala.org.au/commonui-bs3/js/application.js

// initialise plugins
$(function(){

    var autocompleteUrl = 'http://bie.ala.org.au/ws/search/auto.jsonp';

    if(typeof BIE_VARS != 'undefined' && BIE_VARS.autocompleteUrl){
        autocompleteUrl = BIE_VARS.autocompleteUrl;
    }

    // autocomplete on navbar search input
    $("input.general-search").autocomplete();
    $("input.general-search").autocomplete({
        source: function( request, response ) {
            $.ajax( {
                url: autocompleteUrl,
                dataType: "jsonp",
                data: {
                    term: request.term
                },
                extraParams: {limit: 100},
                success: function( data ) {
                    var rows = new Array();
                    data = data.autoCompleteList;
                    for (var i in data) {
                        var item = data[i];
                        if (item) {
                            rows.push({
                                value: item.matchedNames[0],
                                label: item.matchedNames[0]
                            });
                        }
                    }
                    response(rows);
                }
            } );
            },
        matchSubset: false,
        cacheLength: 10,
        minChars: 3,
        scroll: false,
        max: 10,
        selectFirst: false
    });

    // Mobile/desktop toggle
    // TODO: set a cookie so user's choice is remembered across pages
    var responsiveCssFile = $("#responsiveCss").attr("href"); // remember set href
    $(".toggleResponsive").click(function(e) {
        e.preventDefault();
        $(this).find("i").toggleClass("icon-resize-small icon-resize-full");
        var currentHref = $("#responsiveCss").attr("href");
        if (currentHref) {
            $("#responsiveCss").attr("href", ""); // set to desktop (fixed)
            $(this).find("span").html("Mobile");
        } else {
            $("#responsiveCss").attr("href", responsiveCssFile); // set to mobile (responsive)
            $(this).find("span").html("Desktop");
        }
    });
});