$(document).ready(function() {
    $("#joinMenu").click(function() {
        $(".section .section__btns").toggle();
        $(".section .section__join").toggle();
    })

    $("#createGame").click(function() {
        
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
                alert(response)
                $(".section .section__register").hide();
                $(".section .section__login").hide();
                $(".section .section__btn i").hide();
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
                alert(response)
                $(".section .section__register").hide();
                $(".section .section__login").hide();
                $(".section .section__btn i").hide();
            }
        }) 
    })
    
})
