var message = {
    name: null,
    costume: null
}
 
function slugify(sourceString){
    sourceString = sourceString.toLowerCase();
return sourceString.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '')}

function IsEmail(email) {
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
}
$('.step2').hide();
$('.step3').hide();

$('#submit_form').on('click',function(){
    console.log('submitted name')
    if(IsEmail($('#name_field').val())){
        $('.step1').hide();
        message.name = slugify($('#name_field').val());
        message.email = $('#name_field').val();
        update();
        $('.step2').show();
        $('#status').empty();
        $('#login').html(message.email);
    }else{
        $('#status').html( "You gotta use a valid email bro.")
    }
});

$('#login').on('click',function(){
        $('.step1').show();
        $('.step2').hide();
        $('.step3').hide();
});

$('#goback').on('click',function(){
        $('.step1').show();
        $('.step2').hide();
        $('.step3').hide();
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
        name: slugify(message.name),
        costume: message.costume
        },
              function (response) {
                console.log(response)
                $('#confirm_message').html(message.costume+", welcome to the Legion of Doom")
         });
    }else{
        $('#status').html( "You cant join the Legion of Doom unless you are actually a villain.")
    }
});

//update()

function update(){
    $.getJSON("/get_registry", {
        type: "user_agent",
        name: null,
        mongo_ref: null,
        },
              function (response) {
                console.log(response)
                $('#registry_form').empty();
         
        $('#registry_form').append(
            
            '<div id="new_flip-container" class="flip-container new" data-costume = "new" data-alter_ego ="">\
                <div id="new" class="flipper">\
                    <div class="front">\
                        <div class="news-item-new">\
                            <p class="news-item-new-title">\
            <textarea id ="new_textarea" rows="2"  maxlength="20" id="new_costume_field" type="text"  placeholder="  Other?"/>\
            <br><span style="line-height: 15px;">\
                <i id="new_cancel" class="fa fa-times-circle fa-lg"></i>&nbsp;&nbsp;<i id = "new_ok" class="fa fa-check-circle fa-lg"></i>\
            </span></p>\
                        </div>\
                    </div>\
                    <div class="back">\
                        <div class="news-item-back"><p id = "new_back" class="news-item-title"></p></div>\
                    </div>\
                </div>\
            </div>'
        
        );
        
        
        
                $.each(response.superheroes, function(index, superhero){
                    // TAKEN
                    if(superhero.alter_ego.length>0){
                        var markup = "news-item-disabled";
                        var markup2 = "";
                        
                        if(slugify(superhero.alter_ego) == message.name){
                            markup = "news-item"
                            markup2 = "flip "+ slugify(superhero.alter_ego)
                        }
                    $('#registry_form').append(
                        
                    '<div class="flip-container db '+markup2+'" data-costume = "'+superhero.costume+'" data-alter_ego="'+slugify(superhero.alter_ego)+'">\
                        <div id="'+superhero._id+'" class="flipper">\
                            <div class="front">\
                                <div class="'+markup+'"><p class="news-item-title">'+superhero.costume+'</p>\
                                <p class="news-item-title_2"></p></div>\
                            </div>\
                            <div class="back">\
                                <div class="news-item-back"><p class="news-item-title">'+superhero.costume+'<br></p></div>\
                            </div>\
                        </div>\
                    </div>'
                    );
                        
                    }else{
                        
                        
                    $('#registry_form').append(
                    '<div class="flip-container db available" data-costume = "'+superhero.costume+'" data-alter_ego ="">\
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
        
        
            
//                        $('.flip-container').on('mouseover', function(){
//                            $('body').append('<a id="search"  style = "background-color:black; display:block; float:left; color: red; position:absolute; margin:10px" class="fa fa-search"></a>')
//                        });
//            
//                        $('.flip-container').on('mouseout', function(){
////                            $('#search').remove();
//                        });
                        $('#search').on('click', function () {
                        url = 'https://www.google.com/search?tbm=isch&q='
                        console.log(url)
                    });

                        $('.flip-container.db').on('click', function(){
                            console.log($(this))
                            if(!$(this).hasClass('flip') && !$(this).hasClass(slugify(message.name))  && $(this).attr('data-alter_ego') == "" || ($(this).attr('data-alter_ego') == slugify(message.name))){
                            console.log(message.name)
                    $('.'+slugify(message.name)).toggleClass('flip');
                    $('.'+slugify(message.name)).addClass('available');
                    $('.'+slugify(message.name)).toggleClass(slugify(message.name));
                                
                                message.costume = $(this).attr('data-costume');
                                $(this).toggleClass('flip');
                                $(this).toggleClass(slugify(message.name));
                        }
                    });

        
                    $('#new_ok').on('click', function () {
                        $('.' + slugify(message.name)).toggleClass('flip');
                        $('.' + slugify(message.name)).toggleClass(slugify(message.name));

                        $('#new_flip-container').toggleClass('flip')
                        $('#new_flip-container').addClass(slugify(message.name))
                        
                        message.costume = $('#new_textarea').val();
                        $('#new_back').html($('#new_textarea').val());
                        

//                        if (!$(this).hasClass('flip') && !$(this).hasClass(slugify(message.name)) && $(this).attr('data-alter_ego') == "" || ($(this).attr('data-alter_ego') == slugify(message.name))) {
//
//                            $('.' + slugify(message.name)).toggleClass('flip');
//                            $('.' + slugify(message.name)).toggleClass(slugify(message.name));
//                            message.costume = $(this).attr('data-costume');
//                            $(this).toggleClass('flip');
//                            $(this).toggleClass(slugify(message.name));
//                        }
                    });

                    $('#new_cancel').on('click', function () {
                        $('#new_textarea').val("");
                    });


                            


    
 });
}

$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip(); 
});