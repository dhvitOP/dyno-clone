class HTMLMusicWrapper {
  #music;

  get currentTimestamp() {
    const position = this.#music.position;

    const minutes = Math.floor(position / 60).toString().padStart(2, '0');
    const seconds = Math.floor(position - (minutes * 60)).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  }

  set apiError(error) {
    if (!error)
      return $('#musicAPIError').addClass('d-none');
      
    $('#musicAPIError').removeClass('d-none');
    $('#musicAPIError').text(error.message ?? 'Unknown error.');
  }

  constructor(musicClient) {
    this.#music = musicClient;

    setInterval(() => this.#updateSeeker(), 1000);
  }

  #updateSeeker() {
    if (!this.#music.isPlaying || this.#music.isPaused) return;

    this.#music.position++;

    $('#seekTrack input').val(this.#music.position);
    $('.current').text(this.currentTimestamp);
  }
  
  updateList() {
    $('.now-playing').html(this.#nowPlaying());

    const track = (this.#music.isPlaying) ? this.#music.list[0] : null;
    if (track) {
      $('.current').text(this.currentTimestamp);
      $('.duration').text(track.duration.timestamp);
      $('#seekTrack input').attr('max', track.duration.seconds);
    } else {
      $('.current, .duration').text(`00:00`); 
    }

    $('.track-list').html(
      (!this.#music.isPlaying)
        ? '<p>No tracks here.</p>'
        : this.#music.list
        .map(this.#htmlTrack)
        .join()
    );

    $('.track .remove').on('click', async () => {
      const index = $('.track .remove').index('.remove');
      await this.#music.remove(index);
    });
  }

  toggle() {
    $('#toggleTrack i').toggleClass('fa-pause');
    $('#toggleTrack i').toggleClass('fa-play');
  }

  #nowPlaying() {
    if (!this.#music.isPlaying) return ``;

    const track = this.#music.list[0];
    return `
      <img class="float-left mr-3" src="${track.thumbnail}">
      <h4>${track.title}</h4>
      <p class="lead">${track.author.name}</p>
    `;
  }

  #htmlTrack(track) {
    return `
      <div class="track d-flex justify-content-between">
        <span>
          <img class="float-left mr-3" src="${track.thumbnail}" />
          <h5 class="mt-0">${track.title}</h5>
          <p class="lead">${track.author.name}</p>
        </span>
        <div class="float-right">
          <span class="text-muted">${track.duration.timestamp}</span>
            <button class="remove btn text-danger">x</button>
        </div>
      </div>
    `;
  }
}
