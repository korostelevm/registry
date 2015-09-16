
    

$('#submit_form').on('click',function(){
console.log("yo")
    
    var matches = [];
    var fixes = [];
    var good_things = ["puppies", "sunshine","candy","flowers","summer","carnivals","Fridays","music","laughter","ice cream" ];
    $(".input").each(function(i, val) {
      if ($(this).val().length>0 && $(this).hasClass('empty')) {
        matches.push($(this).attr('costume'));
      }
        if($(this).val().length>0 && $(this).hasClass('fix')){
          fixes.push($(this).attr('costume')); 
      }
    });

    if(matches.length > 1 && fixes.length == 0){
        var first = matches[Math.floor(Math.random()*matches.length)];
        matches.splice(matches.indexOf(first), 1);
        var second = matches[Math.floor(Math.random()*matches.length)];
        $('#status').html( first + " combined with " + second +" is just too evil, pick just one!")
        return;
    }
    if(matches.length > 0 && fixes.length > 0){
        console.log(fixes)
        $('#status').html( "First handle the alter-ego jawn, then pick one!")
        return;
    }
   if(fixes.length > 1){
        $('#status').html( "Fix your mistakes one at a time..")
        return;
    }
    if(matches.length == 0 && fixes.length == 0){
        var second = good_things[Math.floor(Math.random()*good_things.length)];
        $('#status').html( "Who will you be in this fight against " + second +", pick one!")
        return;
    }
    
    
    $('#create_form').ajaxSubmit({
                    url: '/register',
                    beforeSubmit: function() { console.log('creating...'); },
                    success: function(res) {
                        console.log('Run on Success');
                        console.log(res);
                        
                        update();
                        if(res.message == "exists")
                        $('#status').html( "'"+res.name+"' already registered, if that's you, reset your alter-ego and try again.")
                        if(res.message == "removed")
                        $('#status').html( res.name+" is no longer a super-villain, now just average.")
                        if(res.message == "reg")
                        $('#status').html( res.name+" is now a super-villain, that was easy.")
                        if(res.message == "wrong")
                        $('#status').html( res.name+" is not the true identity of " +res.hero +"!")

                    },
                    error: function(request, errordata, errorObject) { 
                                                update();

                        console.log(errorObject.toString()); }
                    //dataType: 'json'
        
                });
})



update();

function update(){
    $.getJSON("/get_registry", {
        type: "user_agent",
        name: null,
        mongo_ref: null,
        },
              function (response) {
                console.log(response)
                $('#registry_form').empty();
                $.each(response.superheroes, function(index, superhero){
                    $('#registry_form').append('<p>')

                    $('#registry_form').append(superhero.costume + '&nbsp;')  
                    if(superhero.alter_ego.length>0){
                        $('#registry_form').append('<span id="'+superhero._id+'_alter_ego">'+' is already coming'+' </span>');
                        $('#registry_form').append('<input id="'+superhero._id+'_alter_ego" costume = "'+superhero.costume+'" class = "pull-right input fix" type="text" name="'+superhero._id+'_update" placeholder = "Alter-ego?"/><br>');
                    }else{
                        $('#registry_form').append('<input id="'+superhero._id+'_alter_ego"  costume = "'+superhero.costume+'" class = "pull-right empty input" type="text" name="'+superhero._id+'"/><br>');
                    }
//                      $('#'+superhero._id+'_alter_ego').val(superhero.alter_ego)
                        $('#registry_form').append('<p>')
                });
    
//     $(".pull-right").each(function(i, val) {
//         console.log(this)
//        $(this).on('input',function(e){
//            alert('Changed!')
//        
//         var all = $(".pull-right");
//         var others = all.splice(all.index($(this)));
//        console.log(others)
//         $(others).each(function(i, val) {
////             $(this).prop('disabled', true);
//         });
//         });
//    });
    

    
 });
}