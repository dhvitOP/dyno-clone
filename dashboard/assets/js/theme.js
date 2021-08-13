$('#themeSelect').on('change', function() {
  setTheme($(this).val());
});

function setTheme(theme) {
  localStorage.setItem('theme', theme);
  $('#themeSelect').val(theme);
  $('html').attr('theme', theme);
}

setTheme(localStorage.getItem('theme'));
