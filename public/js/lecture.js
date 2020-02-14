'use strict';
$(document).ready(function() {
    initializePage();
    console.log("A");
});

function initializePage() {
    console.log("B");
    $("#addNoteForm").submit(handleAddNote);;
};

function handleAddNote(e) {
    e.preventDefault();
    $.ajax({
        url: $('#addNoteForm').attr('action'),
        type: 'get',
        data : $('#addNoteForm').serialize(),
        success: function(res){
            console.log(`form submitted. ${res} end`);
            var vid = document.getElementById("videoID");
            var time = new Date(vid.currentTime * 1000).toISOString().substr(11, 8);
            $("#notesdiv").append(generateHTML(res, time));
        }
    });
    e.preventDefault();
    console.log(`inside handleAddNote, note is ${e}`);
};

function generateHTML(note, time) {
    let a1 = `<div class="note"><p id="content">${note}</p><a href="javascript:void(0);">`;
    let a2 = `<p onclick="handleResume(this)" id="timestamp">${time}</p></a>`;
    let a3 = `<a href="#" class="deleteNote"><i class="fa fa-trash"></i></a><br></div>`;
    return a1 + a2 + a3;
}

function handleResume(e) {
    let vid = document.getElementById("videoID");
    let time = e.innerHTML;
    time = time.split(":");
    vid.currentTime = parseInt(time[0])*3600 + parseInt(time[1])*60 + parseInt(time[2]);
}