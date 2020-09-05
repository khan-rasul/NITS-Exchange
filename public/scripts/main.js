$(".cancel").click(function() {
  $(this).fadeOut();
});

$(".submit").click(function() {
    $(this).parent().find("input").removeAttr("disabled");
    $(this).parent().find(".toggle").fadeIn();
});