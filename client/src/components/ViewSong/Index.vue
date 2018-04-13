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
import SongMetadata from './SongMetadata';
import YouTube from './YouTube';
import Tab from './Tab';
import Lyrics from './Lyrics';
import SongsService from '@/services/SongsService';
import Panel from '@/components/Panel';

export default {
  data () {
    return {
      song: {}
    };
  },
  components: {
    Panel,
    YouTube,
    Tab,
    Lyrics,
    SongMetadata
  },
  async mounted () {
    const songId = this.$store.state.route.params.songId;
    this.song = (await SongsService.show(songId)).data;
  }
};
</script>

<style scoped>
</style>
