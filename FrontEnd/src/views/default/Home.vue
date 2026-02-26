<template>
    <v-app>
      <div class="text-center">
        <h1>The Future Begins Here</h1>
      </div>
      <div class="row">
        <div class="column">
          <img src="../../assets/bg-img1.jpg">
          <img src="../../assets/bg-img2.jpg">
          <img src="../../assets/bg-img3.jpg">
        </div>
        <div class="column">
          <img src="../../assets/bg-img2.jpg">
          <img src="../../assets/bg-img1.jpg">
          <img src="../../assets/bg-img2.jpg">
        </div>
        <div class="column">
          <img src="../../assets/bg-img3.jpg">
          <img src="../../assets/bg-img1.jpg">
          <img src="../../assets/bg-img2.jpg">
        </div>
        <div class="column">
          <img src="../../assets/bg-img4.jpg">
          <img src="../../assets/bg-img1.jpg">
          <img src="../../assets/bg-img2.jpg">
        </div>
      </div>
    </v-app>
  </template>
  
  <script setup>
//   
  </script>

<style scoped>
  .row {
  display: flex;
  flex-wrap: wrap;
  padding: 0 4px;
}

h1 {
      color: rgb(124, 221, 38);
      text-shadow: 5px 5px 10px #eb3636;
    }

/* Create four equal columns that sits next to each other */
.column {
  flex: 25%;
  max-width: 25%;
  padding: 0 4px;
}

.column img {
  margin-top: 8px;
  vertical-align: middle;
  width: 100%;
}

/* Responsive layout - makes a two column-layout instead of four columns */
@media screen and (max-width: 800px) {
  .column {
    flex: 50%;
    max-width: 50%;
  }
}

/* Responsive layout - makes the two columns stack on top of each other instead of next to each other */
@media screen and (max-width: 600px) {
  .column {
    flex: 100%;
    max-width: 100%;
  }
}
</style>
  