<template>
  <v-container>
    <v-layout column>
      <v-flex xs8 offset-xs2>
        <panel title="Register">
          <form name="tab-tracker-form" autocomplete="off">
            <v-text-field label="Email" v-model="email"></v-text-field>
            <br />
            <v-text-field
              label="Password"
              type="password"
              autocomplete="new-password"
              v-model="password">
            </v-text-field>
          </form>
          <br />
          <div class="error" v-html="error"></div>
          <br />
          <v-btn
            dark
            class="cyan"
            @click="register">
            Register
          </v-btn>
        </panel>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Panel from '@/components/Panel';
import AuthenticationService from '@/services/AuthenticationService';

export default {
  data () {
    return {
      email: '',
      password: '',
      error: null
    };
  },
  methods: {
    async register () {
      try {
        const response = await AuthenticationService.register({
          email: this.email,
          password: this.password
        });
        this.$store.dispatch('setToken', response.data.token);
        this.$store.dispatch('setUser', response.data.user);
      } catch (error) {
        this.error = error.response.data.error;
      }
    }
  },
  components: {
    Panel
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.error {
  color: red;
}
</style>
