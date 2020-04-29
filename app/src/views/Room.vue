<template>
  <v-container class="about">

    <!-- Header -->
    <div class="text-center">
      <v-badge color="deep-purple accent-4" :content="connectedUsers">
        <v-icon color="grey lighten-1" large>mdi-account-circle</v-icon>
      </v-badge>
    </div>

    <div class="buzzer">
      Buzz
    </div>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      room: 'room',
      connectedUsers: 'connectedUsers'
    })
  },
  mounted () {
    this.$store.dispatch('join', {
      username: 'coco',
      room: this.$route.params.id
    })
  }
}
</script>
