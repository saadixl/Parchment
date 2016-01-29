// When the page loads for first time
$(document).ready(function() {
    $("#listinput").focus();
});

// When somebody press enter on input field
$('#listinput').keypress(function(e) {
    var key = e.which;
    if (key == 13) {
        var fieldVal = $(this).val();
        if (fieldVal == "") {
            alert("If you have nothing do, please go eat a banana!");
            initInput();
        } else {
            initInput();
            createNewToDo(fieldVal);
        }
    }
});

// Init input field
function initInput() {
    $('#listinput').val("").focus();
}

// Function for creating a single todo
function createNewToDo(v) {
    $(".listContainer").append("<article>" + v + '<div class="iconContainer">' +
        '<span class="glyphicon glyphicon-ok tick"></span>' +
        '<span class="glyphicon glyphicon-remove cross"></span>' +
        '</div></article>');
}

// When the task is done
$(".listContainer").delegate(".tick", "click", function() {
    $(this).parent().parent().addClass("done");
    $(this).addClass("doneOn").removeClass("tick");
    var thisArticle = $(this).parent().parent();
    var cloneArticle = thisArticle.clone();
    thisArticle.remove();
    $(".listContainer").append(cloneArticle);
});

// Reverting done task
$(".listContainer").delegate(".doneOn", "click", function() {
    $(this).parent().parent().removeClass("done");
    $(this).addClass("tick").removeClass("doneOn");
    var thisArticle = $(this).parent().parent();
    var cloneArticle = thisArticle.clone();
    thisArticle.remove();
    $(".listContainer").prepend(cloneArticle);
});

// Removing a task
$(".listContainer").delegate(".cross", "click", function() {
    $(this).parent().parent().remove();
});
