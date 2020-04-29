<template>
  <v-container class="home">
    <v-row align="center" justify="center">
      <v-col cols="12">
        <v-row>
          <v-col cols="12">
            <v-img alt="Let's play Sketch" src="img/lets-play.svg" aspect-ratio="2" contain />
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12">
            <v-text-field label="Room" v-model="form.room" outlined />

            <v-text-field label="Username" v-model="form.username" outlined />

            <v-btn color="primary" x-large block @click="join">Join <v-icon right dark>mdi-arrow-right</v-icon></v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <!-- Create Form Dialog -->
    <create-room />
  </v-container>
</template>

<script>
// @ is an alias to /src
import CreateRoom from '@/components/CreateRoom.vue'
import { mapGetters } from 'vuex'
export default {
  name: 'Home',
  components: { CreateRoom },
  data () {
    return {
      form: {
        room: null,
        username: null
      }
    }
  },
  computed: {
    ...mapGetters({
      sessionId: 'sessionId'
    })
  },
  methods: {
    join () {
      this.$store.dispatch('join', this.form)
    }
  }
}
</script>
