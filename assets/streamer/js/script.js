$(document).ready(function(){
    $(document).on("click",".play_btn",function(){
        $(document).find(".play_btn").removeClass("btn-primary btn-danger").addClass("btn-primary");
        $(this).addClass("btn-danger");
        $(document).find(".player").show();
        $(document).find(".player").attr("src",$(this).attr("data-video_url"));
    });

    $(document).find(".player").on("ended",function(){
        if($(document).find("#autoplay_switch").prop("checked") == true){
            $(document).find(".play_btn.btn-danger").parent().next().find(".play_btn").trigger("click");
        }
    });

});