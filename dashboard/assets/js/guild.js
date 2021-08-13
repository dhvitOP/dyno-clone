$('.tabs a, #sidebarExtension h4').on('click', function() {
  $('.tabs a').removeClass('active');
  setModule($(this).attr('id'));
});

function setModule(name) {
  $('.module').hide();
  $(`#${name}Module`).show();
  $(`#${name}`).addClass('active');
}

$('input').on('input', function() {
  $(this)[0].checkValidity()
    ? $(this).removeClass('border border-danger')
    : $(this).addClass('border border-danger');

  $('button.btn.btn-success')
    .attr('disabled', !$('form')[0].checkValidity());
});

setModule('overview');

hljs.initHighlightingOnLoad();