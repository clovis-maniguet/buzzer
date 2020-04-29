<template>
<v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
  <template v-slot:activator="{ on }">
    <!-- Fab Button -->
    <v-btn bottom color="primary" dark fab fixed right v-on="on">
      <v-icon>mdi-plus</v-icon>
    </v-btn>
  </template>

  <v-card>
    <!-- Toolbar -->
    <v-toolbar dark color="primary">
      <v-btn icon dark @click="dialog = false">
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-toolbar-title>New room</v-toolbar-title>
    </v-toolbar>

    <!-- Information -->
    <v-card-text class="pa-5">
      <p class="display-1 text--primary">Informations</p>
      <p class="text--primary">You're going to create a new room ! You just have to select the wanted options and it's done. Share the generated invitation to your friends, and have fun !</p>
    </v-card-text>

    <v-list>
      <v-list-item>
        <v-text-field label="Username" v-model="form.username" outlined />
      </v-list-item>
    </v-list>

    <!-- Options -->
    <v-divider />
    <v-list three-line subheader>
      <v-subheader>Options</v-subheader>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>Points</v-list-item-title>
          <v-list-item-subtitle>For every users, you will be able to add/remove points without leaving the app.</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-switch v-model="form.withPoints" />
        </v-list-item-action>
      </v-list-item>

      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>Public</v-list-item-title>
          <v-list-item-subtitle>This room will be set as public and anyone will be able to join it.</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-switch v-model="form.isPublic" />
        </v-list-item-action>
      </v-list-item>
    </v-list>
    <v-divider />

    <!-- Options -->
    <div class="text-center ma-6">
      <v-btn color="primary" x-large dark @click="createRoom">Create <v-icon right dark>mdi-arrow-right</v-icon></v-btn>
    </div>
  </v-card>
</v-dialog>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'CreateRoom',
  data () {
    return {
      dialog: false,
      form: {
        username: null,
        withPoints: true,
        isPublic: false
      }
    }
  },
  computed: {
    ...mapGetters({
      room: 'room'
    })
  },
  watch: {
    room (newValue) {
      if (newValue.id) {
        this.$router.push({ name: 'Room', params: { id: newValue.id } })
      }
    }
  },
  methods: {
    createRoom () {
      this.$store.dispatch('createRoom', this.form)
    }
  }
}
</script>
