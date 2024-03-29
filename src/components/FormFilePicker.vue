<script setup>
import { mdiUpload } from '@mdi/js'
import { computed, ref, watch } from 'vue'
import BaseButton from '@/components/BaseButton.vue'

const props = defineProps({
  modelValue: {
    type: [Object, File, Array],
    default: null,
  },
  label: {
    type: String,
    default: null,
  },
  icon: {
    type: String,
    default: mdiUpload,
  },
  accept: {
    type: String,
    default: null,
  },
  color: {
    type: String,
    default: 'info',
  },
  isRoundIcon: Boolean,
})

const emit = defineEmits(['update:modelValue'])

const root = ref(null)

const file = ref(props.modelValue)

const showFilename = computed(() => (!props.isRoundIcon && file.value) || props.showName)

const modelValueProp = computed(() => props.modelValue)

watch(modelValueProp, (value) => {
  file.value = value

  if (!value) {
    root.value.input.value = null
  }
})

const upload = (event) => {
  const value = event.target.files || event.dataTransfer.files
  ;[file.value] = value
  emit('update:modelValue', file.value)
}
</script>

<template>
  <div class="relative flex items-stretch justify-start">
    <label class="inline-flex">
      <BaseButton
        as="a"
        :class="{ 'w-12 h-12': isRoundIcon, 'rounded-r-none': showFilename }"
        :icon-size="isRoundIcon ? 24 : undefined"
        :label="isRoundIcon ? null : label"
        :icon="icon"
        :color="color"
        :rounded-full="isRoundIcon"
      />
      <input
        ref="root"
        type="file"
        class="absolute top-0 left-0 w-full h-full outline-none opacity-0 cursor-pointer -z-1"
        :accept="accept"
        @input="upload"
      />
    </label>
    <div
      v-if="showFilename"
      class="px-4 py-2 bg-gray-100 border border-gray-200 rounded-r dark:bg-slate-800 dark:border-slate-700"
    >
      <span class="text-ellipsis line-clamp-1">
        {{ file.name }}
      </span>
    </div>
  </div>
</template>
