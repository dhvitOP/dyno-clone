$(async () => {
  const music = new MusicWrapper();
  await music.updateList();

  $('#skipTrack').on('click', () => music.skip());
  $('#toggleTrack').on('click', () => music.toggle());
  $('#shuffleList').on('click', () => music.shuffle());
  $('#stopTrack').on('click', () => music.stop());
  $('#trackSearch').on('click', async () => {
    const query = $('.q-control input').val();
    await music.play(query);
  });

  $('#seekTrack input').on('input', async function() {
    const to = +$(this).val();
    await music.seek(to);
  });
  $('#volume input').on('input', async function() {
    const value = +$(this).val();
    await music.setVolume(value);
  });
});
