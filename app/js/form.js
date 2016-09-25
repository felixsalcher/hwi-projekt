$(function() {
    var $input = $(".contact-form input, .contact-form textarea");
    var $form = $("#contact-form");

    $input.on("focusin", function() {
       $(this).parent().find("label").addClass("active");
    });

    $input.on("focusout", function()  {
        var $this = $(this);
        if($this.val() === "") {
            $this.parent().find("label").removeClass("active");
        }
    })

    $form.on('submit', function(e) {
        e.preventDefault();
        console.log("Thank you for contacting us. We will answer you shortly!");
    })
});
