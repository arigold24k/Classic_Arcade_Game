$(document).ready(function (e) {
    var characterlock = false;
    var userchar = "";
    var charhealth;
    var enemhealth;
    var ecurhealth;
    var ccurhealth;
    var userattack = 0;
    var enemattack = 0;
    var useriniattack;
    var eneminiattack;
    var enemsel;

    function clearmes () {
        $(".mescol").removeClass("msgbox");
        $("#line1").html("");
        $("#line2").html("");
    }
//    Event Delegation
//    $(document).on('click', '.fighters', function () {
//
//    });

    $(document).on("click", ".am", function () {
        clearmes();
        if(characterlock === true && $(this).attr("id") !== userchar && $(".contender").children("div").attr("id") === undefined ) {
            console.log("Hello World!!");
            console.log($(".contender").children("div").attr("id"));
            console.log($(this).attr("id"));

            var imgid = $(this).children(".hp").attr("id");

            enemattack = 0;
            eneminiattack = Math.floor(Math.random()*10 + 10);
            ecurhealth = document.getElementById(imgid);
            enemhealth = Number(ecurhealth.textContent);

            console.log(enemhealth);
            console.log(enemattack);

            enemsel = $(this);
            enemsel.remove();
            $(".contender").append(enemsel);

        }

        else if (characterlock === false) {
            userchar = $(this).attr("id");

            var imgid = $(this).children(".hp").attr("id");
            useriniattack = Math.floor(Math.random()*10 + 10);
            ccurhealth = document.getElementById(imgid);
            charhealth = Number(ccurhealth.textContent);
            console.log(charhealth);
            console.log(userattack);



            var selpl = $(this);
            $(this).removeClass("am");
            selpl.remove();
            $(".usrchar").append(selpl);

            console.log(userchar);

            $(".am").each(function () {
                var enimg = $(this);
                enimg.remove();
                $(".availtofight").append(enimg);
                characterlock = true;
                return userchar;
            })
        }

    });

    $(".action").on("click", function () {
        if($(".contender").children("div").attr("id") === undefined && $(".usrchar").children("div").attr("id") === undefined) {
            $(".mescol").addClass("msgbox");
            $("#line1").html("Character not Selected");
            $("#line2").html("Opponent not Selected");
        }

        else if($(".contender").children("div").attr("id") === undefined) {
            $(".mescol").addClass("msgbox");
            $("#line1").html("Opponent not Selected");
        }

        else {
            userattack = useriniattack + userattack;
            enemattack = eneminiattack + enemattack;

            if(charhealth - enemattack <= 0 && enemhealth - userattack > 0) {
                enemhealth = enemhealth;
                charhealth = charhealth - enemattack;
            }
            else if(charhealth - enemattack > 0 && enemhealth - userattack <= 0){
                enemhealth = enemhealth - userattack;
                charhealth = charhealth;
            }

            else{
                charhealth = charhealth - enemattack;
                enemhealth = enemhealth - userattack;
            }


            console.log(useriniattack);
            console.log(eneminiattack);
            console.log(userattack);
            console.log(enemattack);

            console.log(charhealth);
            console.log(enemhealth);

            if (charhealth > 0 && enemhealth > 0) {
                console.log("attack is working");
                ccurhealth.textContent = charhealth;
                ecurhealth.textContent = enemhealth;
            }
            else if((charhealth <= 0) && (enemhealth > 0)) {
                charhealth = 0;
                ccurhealth.textContent = charhealth;
                ecurhealth.textContent = enemhealth;
                $(".mescol").addClass("msgbox");
                $("#line1").html("You have been Defeated!.");
                $("#line2").html("<button class=\"btn btn-primary reset\">Reset</button>");

            }

            else if((charhealth > 0) && (enemhealth <= 0)) {
                enemhealth = 0;
                ccurhealth.textContent = charhealth;
                ecurhealth.textContent = enemhealth;
                if($(".availtofight").children("div").attr("id") === undefined) {
                    $(".mescol").addClass("msgbox");
                    $("#line1").html("You are Victorious!.");
                    $("#line2").html("<button class=\"btn btn-primary reset\">Reset</button>");
                }

                else {
                    enemsel.remove();
                    enemattack = 0;
                    $(".mescol").addClass("msgbox");
                    $("#line1").html("You have defeated your enemy!");
                    $("#line2").html("Select your next opponent!");
                }
            }

            else if(charhealth <= 0 && enemhealth <= 0) {
                if(charhealth > enemhealth) {
                    charhealth = 1;
                    enemhealth = 0;
                    ccurhealth.textContent = charhealth;
                    ecurhealth.textContent = enemhealth;
                    enemsel.remove()
                    $(".mescol").addClass("msgbox");
                    $("#line1").html("You have defeated your Enemy!!");
                    $("#line2").html("Select your next opponent!");
                }

                else {
                    charhealth = 0;
                    enemhealth = 1;
                    ccurhealth.textContent = charhealth;
                    ecurhealth.textContent = enemhealth;
                    $(".mescol").addClass("msgbox");
                    $("#line1").html("You have been Defeated!.");
                    $("#line2").html("<button class=\"btn btn-primary reset\">Reset</button>");


                }
            }
        }
    })

    $(document).on("click", ".reset", function () {
        location.reload();
    })

});