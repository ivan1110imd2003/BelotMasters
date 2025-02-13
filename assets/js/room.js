let roomCodeV;
let roomOwner = false;

$(document).ready(function() {
    let url = location.href;
    function roomCode() {
        $.ajax({
            url: 'assets/php/room_code.php',
            type: 'POST',
            data: {
                "url": url,
                "roomCode": 1
            },
            success: function(response) {
                $(".room .room__head span").text(response);
                roomCodeV = response;
            }
        })
    }

    function roomPlayers() {
        $.ajax({
            url: 'assets/php/room_players.php',
            type: 'POST',
            data: {
                "roomPlayers": 1
            },
            success: function(response) {
                response = JSON.parse(response);
                console.log("check")
                if(response[5] == 1) {
                    roomOwner = true;
                    $(".room .room__actions").css("display", "block");
                }

                for(let i = 1; i < Object.keys(response).length; i++) {
                    let player = ".room .room__players .room__player:nth-child(" + i + ") p";
                    $(player).text(response[i]);
                }
            }
        })
    }


    roomCode()
    setInterval(roomPlayers, 1000);

})