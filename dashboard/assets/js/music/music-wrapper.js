class MusicWrapper {
  #endpoint = `/api/guilds/${guildId}/music`;
  #html = new HTMLMusicWrapper(this);

  isPaused = $('#toggleTrack i').hasClass('fa-play');
  list = [];
  position = +$('#seekTrack input').val();

  get isPlaying() {
    return this.list.length > 0;
  }

  async #fetch(action) {
    try {
      const res = await fetch(`${this.#endpoint}/${action}`, {
        headers: { Authorization: key }
      });
      const json = await res.json();
      if (!res.ok)
        throw json;

      return json;
    } catch (error) {
      this.#html.apiError = error;
      throw error;
    }
  }

  async play(query) {
    try {
      await this.#fetch(`play?q=${query}`);
      this.#html.apiError = null;
    } catch {}
    await this.updateList();
  }

  async stop() {
    try {
      await this.#fetch(`stop`);
      this.#html.apiError = null;
      this.position = 0;
    } catch {}
    await this.updateList();
  }

  async toggle() {
    try {
      await this.#fetch(`toggle`);
      this.#html.apiError = null;
    } catch {}
  }

  async setVolume(value) {
    try {
      await this.#fetch(`volume?v=${value}`);
      this.#html.apiError = null;
    } catch {}
  }

  async seek(to) {
    try {
      await this.#fetch(`seek?to=${to}`);
      this.position = to;

      this.#html.apiError = null;
    } catch {}
  }

  async toggle() {
    try {
      await this.#fetch(`toggle`);
      this.isPaused = !this.isPaused;
      
      this.#html.apiError = null;
      this.#html.toggle();
    } catch {}
  }

  async remove(index) {
    try {
      const list = await this.#fetch(`remove?i=${index}`);

      this.#html.apiError = null;
      await this.updateList(list);
    } catch {}
  }

  async shuffle() {
    try {
      const list = await this.#fetch(`shuffle`);

      this.#html.apiError = null;
      await this.updateList(list);
    } catch {}
  }

  async skip() {
    try {
      const list = await this.#fetch(`skip`);

      this.#html.apiError = null;
      await this.updateList(list);
    } catch {}
  }

  async updateList(list = null) {
    this.list = list ?? await this.#fetch('list');
    this.#html.updateList();
  }
}
