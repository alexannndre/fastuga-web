<script setup>
import {
  mdiAccount,
  mdiAccountGroupOutline,
  mdiCartOutline,
  mdiClipboardListOutline,
  mdiClipboardTextClockOutline,
  mdiFoodAppleOutline,
  mdiMonitor,
} from '@mdi/js'
import { useUserStore } from '@/stores/user'
import BaseIcon from './BaseIcon.vue'

const userStore = useUserStore()
</script>

<template>
  <ul>
    <!-- Menu -->
    <li>
      <router-link to="/">
        <div
          class="flex pt-4 text-gray-300 cursor-pointer hover:text-white dark:hover:text-white"
          :class="$route.name === 'home' ? 'dark:text-white font-bold' : 'dark:text-slate-300'"
        >
          <BaseIcon :path="mdiClipboardListOutline" class="pt-1" w="w-16" :size="18" />
          <span class="pb-1">Menu</span>
        </div>
      </router-link>
    </li>

    <!-- Cart -->
    <li v-if="userStore.user?.type === 'C' || !userStore.user">
      <router-link to="/cart">
        <div
          class="flex pt-4 text-gray-300 cursor-pointer hover:text-white dark:hover:text-white"
          :class="$route.name === 'cart' ? 'dark:text-white font-bold' : 'dark:text-slate-300'"
        >
          <BaseIcon :path="mdiCartOutline" class="pt-1" w="w-16" :size="18" />
          <span class="pb-1">Cart</span>
        </div>
      </router-link>
    </li>

    <!-- Products -->
    <li v-if="userStore.user?.type === 'EM'">
      <router-link to="/products">
        <div
          class="flex pt-4 text-gray-300 cursor-pointer hover:text-white dark:hover:text-white"
          :class="$route.name === 'products' ? 'dark:text-white font-bold' : 'dark:text-slate-300'"
        >
          <BaseIcon :path="mdiFoodAppleOutline" class="pt-1" w="w-16" :size="18" />
          <span class="pb-1">Products</span>
        </div>
      </router-link>
    </li>

    <!-- Orders Historu -->
    <li v-if="userStore.user?.type === 'C' || userStore.user?.type === 'EM'">
      <router-link to="/orders">
        <div
          class="flex pt-4 text-gray-300 cursor-pointer hover:text-white dark:hover:text-white"
          :class="
            $route.name === 'orders' || $route.name === 'order' ? 'dark:text-white font-bold' : 'dark:text-slate-300'
          "
        >
          <BaseIcon :path="mdiClipboardTextClockOutline" class="pt-1" w="w-16" :size="18" />
          <span class="pb-1">Orders {{ userStore.user?.type === 'C' ? 'History' : '' }}</span>
        </div>
      </router-link>
    </li>

    <!-- Users -->
    <li v-if="userStore.user?.type === 'EM'">
      <router-link to="/users">
        <div
          class="flex pt-4 text-gray-300 cursor-pointer hover:text-white dark:hover:text-white"
          :class="$route.name === 'users' ? 'dark:text-white font-bold' : 'dark:text-slate-300'"
        >
          <BaseIcon :path="mdiAccountGroupOutline" class="pt-1" w="w-16" :size="18" />
          <span class="pb-1">Users</span>
        </div>
      </router-link>
    </li>

    <li v-show="userStore.user?.type === 'EC'">
      <router-link to="/current-dishes">
        <div
          class="flex pt-4 text-gray-300 cursor-pointer hover:text-white dark:hover:text-white"
          :class="$route.name === 'current-dishes' ? 'dark:text-white font-bold' : 'dark:text-slate-300'"
        >
          <BaseIcon :path="mdiClipboardListOutline" class="pt-1" w="w-16" :size="18" />
          <span class="pb-1">Current Dishes</span>
        </div>
      </router-link>
    </li>

    <li v-show="userStore.user?.type === 'ED'">
      <router-link to="/current-orders">
        <div
          class="flex pt-4 text-gray-300 cursor-pointer hover:text-white dark:hover:text-white"
          :class="$route.name === 'current-orders' ? 'dark:text-white font-bold' : 'dark:text-slate-300'"
        >
          <BaseIcon :path="mdiClipboardListOutline" class="pt-1" w="w-16" :size="18" />
          <span class="pb-1">Current Orders</span>
        </div>
      </router-link>
    </li>

    <!-- Profile -->
    <li v-if="userStore.user">
      <router-link to="/profile">
        <div
          class="flex pt-4 text-gray-300 cursor-pointer hover:text-white dark:hover:text-white"
          :class="$route.name === 'profile' ? 'dark:text-white font-bold' : 'dark:text-slate-300'"
        >
          <BaseIcon :path="mdiAccount" class="pt-1" w="w-16" :size="18" />
          <span class="pb-1">Profile</span>
        </div>
      </router-link>
    </li>

    <li v-if="userStore.user && userStore.user.type == 'EM'">
      <router-link to="/statistics">
        <div
          class="flex pt-4 text-gray-300 cursor-pointer hover:text-white dark:hover:text-white"
          :class="$route.name === 'statistics' ? 'dark:text-white font-bold' : 'dark:text-slate-300'"
        >
          <BaseIcon :path="mdiMonitor" class="pt-1" w="w-16" :size="18" />
          <span class="pb-1">Statistics</span>
        </div>
      </router-link>
    </li>

    <li v-if="userStore.user && userStore.user.type == 'EC'">
      <router-link to="/statistics-chef">
        <div
          class="flex pt-4 text-gray-300 cursor-pointer hover:text-white dark:hover:text-white"
          :class="$route.name === 'statistics-chef' ? 'dark:text-white font-bold' : 'dark:text-slate-300'"
        >
          <BaseIcon :path="mdiMonitor" class="pt-1" w="w-16" :size="18" />
          <span class="pb-1">Statistics</span>
        </div>
      </router-link>
    </li>

    <li v-if="userStore.user && userStore.user.type == 'ED'">
      <router-link to="/statistics-server">
        <div
          class="flex pt-4 text-gray-300 cursor-pointer hover:text-white dark:hover:text-white"
          :class="$route.name === 'statistics-server' ? 'dark:text-white font-bold' : 'dark:text-slate-300'"
        >
          <BaseIcon :path="mdiMonitor" class="pt-1" w="w-16" :size="18" />
          <span class="pb-1">Statistics</span>
        </div>
      </router-link>
    </li>
  </ul>
</template>
