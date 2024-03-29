<script setup>
import { mdiClose } from '@mdi/js'
import { computed } from 'vue'
import { useToast } from 'vue-toastification'
import BaseButton from '@/components/BaseButton.vue'
import BaseButtons from '@/components/BaseButtons.vue'
import CardBox from '@/components/CardBox.vue'
import CardBoxComponentTitle from '@/components/CardBoxComponentTitle.vue'
import OverlayLayer from '@/components/OverlayLayer.vue'
import { useProductsStore } from '@/stores/products'
import { processGeneralError } from '@/requestHelper'
import { useCartStore } from '@/stores/cart'

const props = defineProps({
  modelValue: {
    type: [String, Number, Boolean],
    default: null,
  },
  product: {
    type: Object,
    default: null,
  },
  isDelete: {
    type: Boolean,
    default: false,
  },
})

const toast = useToast()

const emit = defineEmits(['update:modelValue', 'cancel', 'confirm'])

const value = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})

const confirmCancel = (mode) => {
  value.value = false
  emit(mode)
}
const useCart = useCartStore()

const cancel = () => {
  confirmCancel('cancel')
}

const processError = (error) => {
  processGeneralError(error, 'product')
}

const deleteProduct = () => {
  const productsStore = useProductsStore()
  productsStore
    .deleteProduct(props.product)
    .then((res) => {
      if (res.status === 200) toast.success('Product was deleted successfully!')
    })
    .catch(processError)
  cancel()
}

const addToCart = () => {
  useCart.addToCart(props.product)
  toast(`${props.product.name} was added to the cart`)
  cancel()
}

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && value.value) cancel()
})
</script>

<template>
  <OverlayLayer v-show="value" @overlay-click="cancel">
    <CardBox v-show="value" class="z-50 w-11/12 shadow-lg max-h-modal md:w-3/5 lg:w-2/5 xl:w-4/12" is-modal>
      <CardBoxComponentTitle :title="props.isDelete ? `Delete product #${product.product_id}?` : 'Add to cart'">
        <BaseButton :icon="mdiClose" color="whiteDark" small rounded-full @click.prevent="cancel" />
      </CardBoxComponentTitle>

      <div class="space-y-3">
        <slot />
      </div>

      <template #footer>
        <BaseButtons>
          <BaseButton
            :label="props.isDelete ? 'Delete' : 'Confirm'"
            :color="props.isDelete ? 'danger' : 'info'"
            @click="props.isDelete ? deleteProduct() : addToCart()"
          />
          <BaseButton label="Cancel" :color="button" outline @click="cancel" />
        </BaseButtons>
      </template>
    </CardBox>
  </OverlayLayer>
</template>
