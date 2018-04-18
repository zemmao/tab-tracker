<template>
  <v-container>
    <v-layout column>
      <v-flex xs8 offset-xs2>
        <songs-search-panel></songs-search-panel>
        <songs-panel class="mt-2"></songs-panel>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import SongsPanel from './SongsPanel';
import SongsSearchPanel from './SongsSearchPanel';
import SongsService from '@/services/SongsService';

export default {
  data () {
    return {
      songs: null
    };
  },
  components: {
    SongsPanel,
    SongsSearchPanel
  },
  async mounted () {
    this.songs = (await SongsService.index()).data;
  }
};
</script>

<style scoped>
.song {
  padding: 20px;
  height: 330px;
  overflow: hidden;
}

.song-title {
  font-size: 30px;
}

.song-artist {
  font-size: 24px;
}

.song-genre {
  font-size: 18px;
}

.ablum-image {
  width: 100%;
  margin: 0 auto;
}
</style>
