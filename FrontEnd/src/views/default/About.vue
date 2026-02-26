<template>
  <v-card>
    <v-card-title class="title-section">
      <v-icon left>mdi:mdi-account</v-icon>
      <span class="title">Maniga</span>
    </v-card-title>

    <v-card-text class="text-section">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis odit, ratione magnam distinctio doloribus ullam architecto eos ipsa nemo fugit maxime minus nesciunt similique natus! Corrupti tempora tenetur eum soluta!
    </v-card-text>

    <v-card-actions class="action-buttons">
      <v-btn color="primary" text small>
        <v-icon left>mdi-action-done</v-icon>
        Action 1
      </v-btn>
      <v-btn color="secondary" text small>
        <v-icon left>mdi-information</v-icon>
        More Info
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
.title-section {
  display: flex;
  align-items: center;
}

.title {
  font-weight: bold;
  margin-left: 10px;
}

.text-section {
  font-size: 16px;
  line-height: 1.5;
}

.action-buttons {
  justify-content: space-between;
}
</style>