function audioAutoPlay(id) {
    var audio = document.getElementById(id);
    audio.play();
    document.addEventListener("WindowJSBridgeReady", function () {
        audio.pause();
    }, true);
}
audioAutoPlay('media');
$(function () {
    var audia = $('#media');
    audia[0].pause();
    $('#audio_btn').addClass('off');
    $('.rotate').hide();
    $('.rotate').removeClass('');
    $('#audio_btn').bind('click', function () {
        // $(this).hasClass("off") ? 
        $('.rotate').show();
        $(this).hasClass("off") ? ($(this).addClass("play_yinfu").removeClass("off"),
            $("#yinfu").addClass("rotate"),
            $("#media")[0].play()) : ($(this).addClass("off").removeClass("play_yinfu"),
                $("#yinfu").removeClass("rotate"),
                $("#media")[0].pause());
    });
});