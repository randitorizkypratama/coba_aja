<!-- @format -->

<template>
  <v-app>
    <NavBar />
    <v-container fluid>
      <v-row>
        <v-col cols="6" md="2" class="left-store">
          <v-col md="12" cols="10">
            <action @clicked="search" />
          </v-col>
        </v-col>
        <v-col cols="2" md="9">
          <div class="my-2">
            <v-btn @click="open" depressed small color="primary">Add</v-btn>
          </div>
          <modalAdd ref="child" />
          <tableData ref="tableData" />
        </v-col>
        <v-col class="right-store">
          <storeRight />
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script src="./utils/index.ts">
</script>
<style src="./style/index.scss" lang="scss">
</style>

