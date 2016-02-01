// When the page loads for first time
$(document).ready(function() {
    var handleStr = window.location.pathname;
    var handle = handleStr.substr(1);
    //alert(handle);
    $.post("/getHandle", {
        "handle": handle
    }, function(data) {
        $(".listContainer").html(data);
    });
    $("#listinput").focus();
});

// When somebody press enter on input field
$('#listinput').keypress(function(e) {
    var key = e.which;
    if (key == 13) {
        var fieldVal = $(this).val();
        if (fieldVal == "") {
            alert("If you have nothing to do, please go eat a banana!");
            initInput();
        } else {
            initInput();
            saveToDo(fieldVal);
        }
    }
});

// Init input field
function initInput() {
    $('#listinput').val("").focus();
}

// Function for creating a single todo
function saveToDo(v) {
    $(".listContainer").append("<article>" + v + '<div class="iconContainer">' +
        '<span class="glyphicon glyphicon-ok tick"></span>' +
        '<span class="glyphicon glyphicon-remove cross"></span>' +
        '</div></article>');

    var markUp = $(".listContainer").html().toString();
    var handleStr = window.location.pathname;
    var handle = handleStr.substr(1);

    $.post("/save", {
            "handle": handle,
            "markUp": markUp
        },
        function(data) {

        });

}

// When the task is done
$(".listContainer").delegate(".tick", "click", function() {
    $(this).parent().parent().addClass("done");
    $(this).addClass("doneOn").removeClass("tick");
    var thisArticle = $(this).parent().parent();
    var cloneArticle = thisArticle.clone();
    thisArticle.remove();
    $(".listContainer").append(cloneArticle);
    var fieldVal = $(".listContainer").val();
    saveToDo(fieldVal);
});

// Reverting done task
$(".listContainer").delegate(".doneOn", "click", function() {
    $(this).parent().parent().removeClass("done");
    $(this).addClass("tick").removeClass("doneOn");
    var thisArticle = $(this).parent().parent();
    var cloneArticle = thisArticle.clone();
    thisArticle.remove();
    $(".listContainer").prepend(cloneArticle);
    var fieldVal = $(".listContainer").val();
    saveToDo(fieldVal);
});

// Removing a task
$(".listContainer").delegate(".cross", "click", function() {
    $(this).parent().parent().remove();
    var fieldVal = $(".listContainer").val();
    saveToDo(fieldVal);
});
