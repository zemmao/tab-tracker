<template>
  <div>
    <v-layout>
      <v-flex xs6>
        <song-metadata :song="song"></song-metadata>
      </v-flex>
      <v-flex xs6 class="ml-2">
        <you-tube :youtubeId="song.youtubeId"></you-tube>
      </v-flex>
    </v-layout>
    <v-layout class="mt-2">
      <v-flex xs6>
        <tab :song="song"></tab>
      </v-flex>
      <v-flex xs6 class="ml-2">
        <lyrics :song="song"></lyrics>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import SongMetadata from './SongMetadata';
import YouTube from './YouTube';
import Tab from './Tab';
import Lyrics from './Lyrics';
import SongsService from '@/services/SongsService';
import SongHistoryService from '@/services/SongHistoryService';

export default {
  data () {
    return {
      song: {}
    };
  },
  computed: {
    ...mapState([
      'isUserLoggedIn',
      'user',
      'route'
    ])
  },
  components: {
    YouTube,
    Tab,
    Lyrics,
    SongMetadata
  },
  async mounted () {
    const songId = this.route.params.songId;
    this.song = (await SongsService.show(songId)).data;

    if (this.isUserLoggedIn) {
      SongHistoryService.post({
        songId
      });
    }
  }
};
</script>

<style scoped>
</style>
