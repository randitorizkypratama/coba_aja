<template>
  <section class="mt-7">
    <div class="q-pa-md">
      <SSelect
        label-text="Display"
        :options="displayStatuses"
        v-model="filterStatus"
        clearable
      />
    </div>

    <q-separator />

    <div class="q-pa-md">
      <SInput v-model="filterNumber" label-text="Search Room Number" />

      <SInput v-model="filterNumber" label-text="Floor" />

      <label class="inline-block q-mb-xs">
        Room
      </label>
      <div class="row">
        <div class="col">
          <q-input dense outlined placeholder="From"> </q-input>
        </div>
        <div class="col">
          <q-input dense outlined placeholder="To"> </q-input>
        </div>
      </div>

      <q-btn
        dense
        color="primary"
        icon="mdi-magnify"
        label="Search"
        class="q-mt-md full-width"
      />
    </div>

    <q-separator />

    <div class="q-pa-md">
      <p class="q-mb-sm">
        Reservation Comment
      </p>

      <div v-if="selectedRoom" class="room-selected q-pa-sm q-mr-sm">
        {{ selectedRoom.bemerk || 'None' }}
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  toRefs,
  computed,
  ref,
  watch,
} from '@vue/composition-api';
import { displayStatuses, roomStatuses } from '../models/roomStatus.model';
import { queueHeaders } from '../tables/roomStatus.table';

interface State {
  queueData: any[];
  roomStatus: any;
  isFetching: boolean;
  isUpdating: boolean;
  dialog: boolean;
}

export default defineComponent({
  props: {
    selectedRoom: { type: Object, default: null },
  },
  setup(props, { emit, root: { $api } }) {
    const state = reactive<State>({
      queueData: [],
      roomStatus: null,
      isFetching: true,
      isUpdating: false,
      dialog: false,
    });
    const filterNumber = ref('');
    const filterStatus = ref<any>({ value: 'all', label: 'All' });

    const resetSelectedRooms = () => {
      emit('resetSelectedRooms');
    };

    const onChangeRoom = async () => {
      const roomStatus = state.roomStatus?.value;

      if ([4, 5].includes(roomStatus)) {
        state.dialog = true;
      } else {
        state.isUpdating = true;

        const body = {
          chgsort: roomStatus,
          // TODO investigate hardcoded and why this is a string
          pvILanguage: '1',
          // TODO investigate hardcoded
          userInit: 0,
          roomList: {
            'room-list': props.selectedRooms.map((room: any) => ({
              nr: room.roomNumber,
            })),
          },
        };
        await $api.housekeeping.changeRoomStatus(body);
        state.isUpdating = false;
        resetSelectedRooms();
      }
    };

    const isCanChange = computed(
      () => filterStatus.value && filterStatus.value.value !== 'all'
    );

    const roomSelectedLabel = computed(() => {
      switch (props.selectedRooms.length) {
        case 0:
          return 'None';
        case 1:
          return `${props.selectedRooms.length} room selected`;
        default:
          return `${props.selectedRooms.length} rooms selected`;
      }
    });

    const onDialog = (val) => {
      state.dialog = val;
    };

    watch(
      [filterStatus, filterNumber],
      ([roomStatus, roomNumber], [prevStatus]) => {
        if (!roomStatus || roomStatus?.value !== prevStatus?.value) {
          resetSelectedRooms();
        }

        emit('onChangeFilter', {
          status: roomStatus?.value,
          number: roomNumber,
        });
      },
      { lazy: true }
    );

    // Fetch queue room list
    (async () => {
      const [, res] = await $api.housekeeping.getOverview();

      if (res) {
        state.queueData = res.queueRoomList['queue-room-list'];
      }

      state.isFetching = false;
    })();

    return {
      ...toRefs(state),
      filterNumber,
      filterStatus,
      isCanChange,
      onChangeRoom,
      displayStatuses,
      queueHeaders,
      roomStatuses,
      roomSelectedLabel,
      resetSelectedRooms,
      onDialog,
    };
  },
});
</script>

<style lang="scss" scoped>
.room-selected {
  overflow-x: scroll;
  color: #2887d2;
  border: 1px dashed #2887d2;
  border-radius: 5px;

  &::-webkit-scrollbar {
    display: none;
  }
}
</style>
