<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="700">
      <v-card>
        <v-card-title class="headline blue" primary-title>New</v-card-title>
        <v-card-text>
          <v-card-text>
            <actionModal />
          </v-card-text>
          <v-row>
            <v-card-text class="modalStore">
              <v-row>
                <modalAddStore @Header="bukaHeader" @Item="bukaItem" class="left-table px-5" />
                <Header ref="header" />
                <TableItem ref="item" />
              </v-row>
            </v-card-text>
          </v-row>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="dialog = false">Close</v-btn>
            <v-btn color="primary" text @click="dialog = false">Add</v-btn>
          </v-card-actions>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script src="../utils/other-storage.ts">
</script>

<style lang="scss">
.v-select {
  margin-top: 2px;
  padding-top: 3px;
}
.modalStore {
  margin-top: -50px;
}
.left-table {
  border-right: 1px #2887d2 solid;
  // box-shadow: 0px 0px 7px 0px #00000038;
}
</style>