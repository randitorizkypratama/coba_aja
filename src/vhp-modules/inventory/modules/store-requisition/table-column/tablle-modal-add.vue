<template>
  <div id="FocRooms1" class="table-add">
    <v-data-table
      hide-default-footer
      pagination.sync="pagination"
      :headers="headers"
      :items="dataHotel"
      item-key="docu-nr"
      sort-by="article"
      class="elevation-1"
    >
      <template v-slot:item.action="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
        <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
      </template>
    </v-data-table>
  </div>
</template>


<script src="../utils/table-modal-add.ts">
</script>

<style src="../style/table-modal-add.scss" lang="scss">
</style>