$(document).ready(function() {
    //check session on start

    function inSession() {
        $.ajax({
            url: 'assets/php/session_check.php',
            type: 'POST',
            data: {
                "inSession": 1
            },
            success: function(response) {
                if(response == "success") {
                    $(".section .section__register").hide();
                    $(".section .section__login").hide();
                    $(".section .section__profile").hide();
                    $(".section .section__logof").show();
                    $(".section .section__btn i").remove();
                    $(".section .section__btns .section__btn").addClass("section__btn--active");
                    $("#createGame").removeAttr("disabled");
                    $("#joinGame").removeAttr("disabled");
                }
            }
        })
    }

    inSession()

    //reload for logoff

    $("#logof").click(function(){
        $.ajax({
            url: 'assets/php/logof.php',
            type: 'POST',
            data: {
                "logoff": 1
            },
            success: function(response) {
                console.log(response)
                
                if(response == "success") {
                    location.reload();
                }
            }
        })
    })

    $("#joinMenu").click(function() {
        if($("#joinMenu").find('i').length == 0 && $("#joinMenu").hasClass("section__btn--active")) {
            $(".section .section__btns").toggle();
            $(".section .section__join").toggle();
        }
    })

    $("#createGame").click(function() {
        if($("#createGame").find('i').length == 0 && $("#joinMenu").hasClass("section__btn--active")) {
            $.ajax({
                url: 'assets/php/create_room.php',
                type: 'POST',
                data: {
                    "createGame": 1
                },
                success: function(response) {
                    location.href = 'room.html?room=' + response;
                }
            })
        }
    })

    $("#joinGame").click(function() {
            let roomCode = $("#joinCode").val();

            $.ajax({
                url: 'assets/php/join_room.php',
                type: 'POST',
                data: {
                    "JcodeRoom": roomCode
                },
                success: function(response) {
                    console.log(response)
                    if(response == "success") {
                        location.href = 'room.html?room=' + roomCode;
                    }
                }
            })
    })

    $("#goMenuJ").click(function() {
        $(".section .section__btns").toggle();
        $(".section .section__join").toggle();
    })

    $("#signIn").click(function() {
        $(".section .section__login").show();
        $(".section .section__register").hide();
    })

    $("#signUp").click(function() {
        $(".section .section__register").show();
        $(".section .section__login").hide();
    })

    $(".section .section__popupC").click(function() {
        $(".section .section__register").hide();
        $(".section .section__login").hide();
    })

    //  Register

    $("#register").click(function() {
        let emailR = $("#emailR").val();
        let unameR = $("#unameR").val();
        let passR = $("#passR").val();

        $.ajax({
            url: 'assets/php/register.php',
            type: 'POST',
            data: {
                "emailR": emailR,
                "unameR": unameR,
                "passR": passR,
                "register": 1
            },
            success: function(response) {
                if(response == "success") {
                    $(".section .section__register").hide();
                    $(".section .section__login").hide();
                    $(".section .section__profile").hide();
                    $(".section .section__logof").show();
                    $(".section .section__btn i").remove();
                    $(".section .section__btns .section__btn").addClass("section__btn--active");
                    $("#createGame").removeAttr("disabled");
                    $("#joinGame").removeAttr("disabled");
                }
            }
        }) 
    })


    //  Login

    $("#login").click(function() {
        let emailL = $("#emailL").val();
        let passL = $("#passL").val();

        $.ajax({
            url: 'assets/php/login.php',
            type: 'POST',
            data: {
                "emailL": emailL,
                "passL": passL,
                "login": 1
            },
            success: function(response) {
                if(response == "success") {
                    $(".section .section__register").hide();
                    $(".section .section__login").hide();
                    $(".section .section__profile").hide();
                    $(".section .section__logof").show();
                    $(".section .section__btn i").remove();
                    $(".section .section__btns .section__btn").addClass("section__btn--active");
                    $("#createGame").removeAttr("disabled");
                    $("#joinMenu").removeAttr("disabled");
                }
            }
        }) 
    })  
})
