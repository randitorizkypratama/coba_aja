<template>
  <div id="FocRooms2">
    <v-data-table
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

<script src="../utils/table-store.ts">
</script>

<style src="../style/table.scss" lang="scss">
</style>
