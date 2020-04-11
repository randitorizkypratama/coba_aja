<template>
  <div>
    <v-btn color="primary" block><v-icon>mdi-magnify</v-icon></v-btn>
    <div class="mt-5">
      <p class="mb-1">Room Number</p>
      <v-text-field single-line outlined dense></v-text-field>
    </div>
    <v-divider />
    <div class="mt-4">
      <p class="mb-1">Guest Name</p>
      <v-text-field single-line outlined dense></v-text-field>
    </div>

    <div>
      <p>Bill Receiver</p>
      <v-textarea
        v-model="textarea1"
        rows="5"
        single-line
        outlined
        readonly
      ></v-textarea>
    </div>

    <div>
      <v-textarea
        v-model="textarea2"
        rows="1"
        single-line
        outlined
        readonly
      ></v-textarea>
    </div>

    <div>
      <v-text-field single-line outlined dense></v-text-field>
    </div>

    <div>
      <v-text-field single-line outlined dense></v-text-field>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FOCLeft',
  data: () => ({
    textarea1: '""Fatchurrohman Nugroho, MR Jl. KH. Mas Mansyur No.1 Jakarta""',
    textarea2: 'Cash Basis PAID RO (RPTRA) DISC 40%',
  }),
};
</script>

<style lang="scss" scoped></style>
