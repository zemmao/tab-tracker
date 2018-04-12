<template>
  <v-container>
    <v-layout column>
      <v-flex xs8 offset-xs2>
        <panel title="Songs">
          <v-btn
            slot="action"
            @click="navigateTo({ name: 'songs-create' })"
            class="cyan accent-2"
            light
            medium
            absolute
            right
            middle
            fab>
            <v-icon>add</v-icon>
          </v-btn>
          <div v-for="song in songs" :key="song.id" class="song">
            <v-layout>
              <v-flex xs6>
                <div class="song-title">
                  {{ song.title }}
                </div>
                <div class="song-artist">
                  {{ song.artist }}
                </div>
                <div class="song-genre">
                  {{ song.album }}
                </div>
                <v-btn
                  dark
                  class="cyan"
                  @click="navigateTo({
                    name: 'song',
                    params: {
                      songId: song.id
                    }
                  })">
                  View
                </v-btn>
              </v-flex>
              <v-flex xs6>
                <img class="ablum-image" :src="song.albumImageUrl" />
              </v-flex>
            </v-layout>
          </div>
        </panel>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import SongsService from '@/services/SongsService';
import Panel from '@/components/Panel';
export default {
  data () {
    return {
      songs: null
    };
  },
  components: {
    Panel
  },
  methods: {
    navigateTo (route) {
      this.$router.push(route);
    }
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
