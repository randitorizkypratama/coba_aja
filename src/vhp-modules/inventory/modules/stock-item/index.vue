<template>
  <div>
    <Navbar />
    <v-container fluid>
      <v-row>
        <v-col cols="6" md="2" class="left-store">
          <v-col md="12" cols="10">
            <Actions @clicked="search" />
          </v-col>
        </v-col>
        <v-col cols="2" md="9">
          <div class="my-2">
            <v-btn @click="open1" depressed small color="primary">Add</v-btn>
          </div>
          <tableItem />
          <addnew ref="addNew" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script src="./utils">
</script>