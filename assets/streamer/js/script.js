$(document).ready(function(){
    $(document).on("click",".play_btn",function(){
        $(document).find("#player_container").html(`
        <video autoplay controls class="player">
            <source src="`+ $(this).attr("data-video_url")+`" type="video/mp4">
        </video>
        `);
    });
});