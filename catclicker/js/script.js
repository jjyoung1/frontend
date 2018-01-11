(function(){
    var $counter = $('#clickcounter');
    var click_count = 0;

    function increment_counter(){

        click_count++;
        $counter[0].innerHTML = click_count.toString();
    }

    $('#cat').click(function(e){
        increment_counter();
    })
})();