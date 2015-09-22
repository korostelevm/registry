var message = {
    name: null,
    costume: null
}
 
function slugify(sourceString){
return sourceString.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '')}

function IsEmail(email) {
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
}
$('.step2').hide();
$('.step3').hide();

$('#submit_form').on('click',function(){
    console.log('submitted name')
//    if(IsEmail($('#name_field').val())){
        $('.step1').hide();
        message.name = $('#name_field').val();
        update();
        $('.step2').show();
        $('#status').empty();
//    }else{
//        $('#status').html( "You gotta use a valid email bro.")
//    }
});

$('#submit_villain').on('click',function(){
    console.log("submitted vilalin")
    console.log(message)
    if(message.costume){
        $('.step1').hide();
        $('.step2').hide();
        $('.step3').show();
        $('#status').empty();
         $.getJSON("/register", {
        name: message.name,
        costume: message.costume
        },
              function (response) {
                console.log(response)
        $('#confirm_message').html(message.costume+", welcome to the Legion of Doom")
         });
    }else{
        $('#status').html( "You cant joint the Legion of Doom unless you are actually a villain.")
    }
});

//console.log("yo")
//    
//    var matches = [];
//    var fixes = [];
//    var good_things = ["puppies", "sunshine","candy","flowers","summer","carnivals","Fridays","music","laughter","ice cream" ];
//    $(".input").each(function(i, val) {
//      if ($(this).val().length>0 && $(this).hasClass('empty')) {
//        matches.push($(this).attr('costume'));
//      }
//        if($(this).val().length>0 && $(this).hasClass('fix')){
//          fixes.push($(this).attr('costume')); 
//      }
//    });
//
//    if(matches.length > 1 && fixes.length == 0){
//        var first = matches[Math.floor(Math.random()*matches.length)];
//        matches.splice(matches.indexOf(first), 1);
//        var second = matches[Math.floor(Math.random()*matches.length)];
//        $('#status').html( first + " combined with " + second +" is just too evil, pick just one!")
//        return;
//    }
//    if(matches.length > 0 && fixes.length > 0){
//        console.log(fixes)
//        $('#status').html( "First handle the alter-ego jawn, then pick one!")
//        return;
//    }
//   if(fixes.length > 1){
//        $('#status').html( "Fix your mistakes one at a time..")
//        return;
//    }
//    if(matches.length == 0 && fixes.length == 0){
//        var second = good_things[Math.floor(Math.random()*good_things.length)];
//        $('#status').html( "Who will you be in this fight against " + second +", pick one!")
//        return;
//    }
    
//    
//    $('#create_form').ajaxSubmit({
//                    url: '/register',
//                    beforeSubmit: function() {
//                        
//                        console.log('creating...'); },
//                    success: function(res) {
//                        console.log('Run on Success');
//                        console.log(res);
//                        
//                        update();
//                        if(res.message == "exists")
//                        $('#status').html( "'"+res.name+"' already registered, if that's you, reset your alter-ego and try again.")
//                        if(res.message == "removed")
//                        $('#status').html( res.name+" is no longer a super-villain, now just average.")
//                        if(res.message == "reg")
//                        $('#status').html( res.name+" is now a super-villain, that was easy.")
//                        if(res.message == "wrong")
//                        $('#status').html( res.name+" is not the true identity of " +res.hero +"!")
//
//                    },
//                    error: function(request, errordata, errorObject) { 
//                                                update();
//
//                        console.log(errorObject.toString()); }
//                    //dataType: 'json'
//        
//                });



//update();

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
//                    $('#registry_form').append('<p>')

//                    $('#registry_form').append(superhero.costume + '&nbsp;')  
//                    $('#registry_form').append()  
                    // TAKEN
                    if(superhero.alter_ego.length>0){
                        var markup = "news-item-disabled";
                        var markup2 = "";
                        
                        if(slugify(superhero.alter_ego) == message.name){
                            markup = "news-item"
                            markup2 = "flip "+ slugify(superhero.alter_ego)
                        }
                    $('#registry_form').append(
                    '<div class="flip-container '+markup2+'" data-costume = "'+superhero.costume+'" data-alter_ego="'+slugify(superhero.alter_ego)+'">\
                        <div id="'+superhero._id+'" class="flipper">\
                            <div class="front">\
                                <div class="'+markup+'"><p class="news-item-title">'+superhero.costume+'</p><p class="news-item-title_2"></p></div>\
                            </div>\
                            <div class="back">\
                                <div class="news-item-back"><p class="news-item-title">'+superhero.costume+'<br></p></div>\
                            </div>\
                        </div>\
                    </div>'
                    );
                        
                    }else{
                        
                        
                    $('#registry_form').append(
                    '<div class="flip-container available" data-costume = "'+superhero.costume+'" data-alter_ego ="">\
                        <div id="'+superhero._id+'" class="flipper">\
                            <div class="front">\
                                <div class="news-item"><p class="news-item-title">'+superhero.costume+'</p><p class="news-item-title_2"></p></div>\
                            </div>\
                            <div class="back">\
                                <div class="news-item-back"><p class="news-item-title">'+superhero.costume+'<br></p></div>\
                            </div>\
                        </div>\
                    </div>'
                    );
                    }
                    

                    

                    

                    
                });
                        $('.flip-container').on('click', function(){
                            
                            if(!$(this).hasClass('flip') && !$(this).hasClass(slugify(message.name)) && $(this).attr('data-alter_ego') == "" || ($(this).attr('data-alter_ego') == slugify(message.name))){
                            
                    $('.'+slugify(message.name)).toggleClass('flip');
                    $('.'+slugify(message.name)).toggleClass(slugify(message.name));
                                message.costume = $(this).attr('data-costume');
                                $(this).toggleClass('flip');
                                $(this).toggleClass(slugify(message.name));
                        }
                    });

    

    
 });
}