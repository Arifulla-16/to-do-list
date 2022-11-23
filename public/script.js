
$("#text").focus(function (e) { 
    $("#text").attr("placeholder","");
    $("#text").css("border-bottom", "2px");
    $("#text").css("border-style", "solid");
    // $("#text").css("transition","border-bottom 0.2s ease-in");
});

$("#text").focusout(function (e) { 
    $("#text").attr("placeholder","New Item");
    $("#text").css("border-bottom", "0px");
    // $("#text").css("transition","border-bottom 0.2s ease-in");
});

$(".check").change(function (e) { 
    $("#adder").click();
});