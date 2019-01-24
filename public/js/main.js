$(document).ready(function () {
   $('select option.fadeOut').fadeOut(0);
   $('.select2-results__options li').fadeOut(0);
});

$(document).on('click','a.dropdown',function (event) {
    event.preventDefault();
    $(this).parents().children('.author-menus-sub').slideToggle();
});