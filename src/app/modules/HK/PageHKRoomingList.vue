<template>
  <q-page>
    <q-drawer :value="true" side="left" bordered :width="250" persistent>
      <SearchRoomingList :selected-room="selectedRoom" />
    </q-drawer>

    <div class="q-pa-lg">
      <div class="q-mb-md">
        <q-btn flat round class="q-mr-lg">
          <img :src="require('~/app/icons/Icon-Refresh.svg')" height="30" />
        </q-btn>
        <q-btn flat round>
          <img :src="require('~/app/icons/Icon-Print.svg')" height="30" />
        </q-btn>
      </div>

      <HKRoomingListRoomTable
        :filter-rooms="filterRooms"
        :selected-room.sync="selectedRoom"
      />
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from '@vue/composition-api';
import { FilterRoom } from './tables/roomList.table';

interface State {
  filterRooms: FilterRoom;
  selectedRoom: any;
}

export default defineComponent({
  setup() {
    const state = reactive<State>({
      filterRooms: {
        status: {},
        roomNumber: null,
        floor: null,
        roomRange: {
          from: null,
          to: null,
        },
      },
      selectedRoom: null,
    });

    function onChangeSelectedRoom(room) {
      state.selectedRoom = room;
    }

    return {
      ...toRefs(state),
      onChangeSelectedRoom,
    };
  },
  components: {
    HKRoomingListRoomTable: () =>
      import('./components/HKRoomingListRoomTable.vue'),
    SearchRoomingList: () => import('./components/SearchRoomingList.vue'),
  },
});
</script>
