<script setup>
import { computed, inject } from 'vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseButtons from '@/components/BaseButtons.vue'
import BaseLevel from '@/components/BaseLevel.vue'
import CardBox from '@/components/CardBox.vue'
import router from '@/router'
import { useUserStore } from '@/stores/user'

const moment = inject('moment')
const userStore = useUserStore()

const props = defineProps({
  orders: {
    type: Array,
    default: () => [],
  },
  statuses: {
    type: Array,
    default: () => [],
  },
  pageInfo: {
    type: Object,
    default: () => ({}),
  },
  changePage: {
    type: Function,
    default: () => {},
  },
})

const orders = computed(() => props.orders)
const pageInfo = computed(() => props.pageInfo.value)
const changePage = computed(() => props.changePage)

const currentPage = computed(() => pageInfo.value.current_page)

const itemsPaginated = computed(() => orders.value)

const numPages = computed(() => pageInfo.value.last_page)

const formatDate = (date) => {
  return moment(date).format('D MMM YYYY')
}

const showDetailsView = (id) => {
  router.push({ name: 'order', params: { id } })
}
</script>

<template>
  <CardBox class="mb-6" has-table>
    <table>
      <thead>
        <tr>
          <th>Reference</th>
          <th>Status</th>
          <th>Total Paid</th>
          <th v-if="userStore.user.type === 'C'">Payment Type</th>
          <th v-if="userStore.user.type === 'C'">Payment Reference</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="order in itemsPaginated"
          :key="order.order_id"
          class="cursor-pointer"
          @click="showDetailsView(order.id)"
        >
          <td>{{ `${order.id} (#${order.ticket_number})` }}</td>
          <td>{{ props.statuses.find((status) => status.value === order.status)?.label }}</td>
          <td>{{ order.total_paid }} €</td>
          <td v-if="userStore.user.type === 'C'">{{ order.payment_type }}</td>
          <td v-if="userStore.user.type === 'C'">{{ order.payment_reference }}</td>
          <td>{{ formatDate(order.date) }}</td>
        </tr>
      </tbody>
    </table>
    <div class="p-3 border-t border-gray-100 lg:px-6 dark:border-slate-800">
      <BaseLevel>
        <BaseButtons>
          <BaseButton
            v-for="page in pageInfo.links"
            :key="page.label"
            :active="page.url == null ? true : false"
            :label="page.label"
            :color="page.active ? 'lightDark' : 'whiteDark'"
            small
            @click="changePage(page.url)"
          />
        </BaseButtons>
        <small>Page {{ currentPage }} of {{ numPages }}</small>
      </BaseLevel>
    </div>
  </CardBox>
</template>
