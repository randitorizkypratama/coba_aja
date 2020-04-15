<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="900">
      <v-card>
        <v-card-title class="headline blue" primary-title>New</v-card-title>
        <v-card-text v-model="dataSave">
          <v-row>
            <v-col cols="3" md="3" class="left-store">
              <Section @Category="clikcategory" @unitPrice="unitPrice" @additional="additional" />
            </v-col>
            <v-col v-model="dataModalNew">
              <v-col>
                <v-col cols="4" md="6">
                  <h3>Name</h3>
                  <v-text-field v-model="nama" class="select" dense outlined></v-text-field>
                </v-col>
              </v-col>
              <v-col>
                <Category @dataCategory="dataCategory" ref="category" />
                <UnitPrice @dataUnit="dataUnit" ref="unitPrice" />
                <Additional @dataAdd="dataAdd" ref="addtional" />
              </v-col>
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="dialogClick">Close</v-btn>
            <v-btn color="primary" text @click="dialogClick">Add</v-btn>
          </v-card-actions>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>


<script src="../../utils/script-modal-new.ts">
</script>