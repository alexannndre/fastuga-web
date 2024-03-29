import { ref, computed, inject } from 'vue'
import { defineStore } from 'pinia'
import { useToast } from 'vue-toastification'
import { axiosReq } from '@/requestHelper'
import { useSocketStore } from './socket'
import { useCartStore } from './cart'

export const useUserStore = defineStore('user', () => {
  const apiDomain = inject('apiDomain')

  const user = ref(null)
  const paymentTypes = ref([])
  const socket = useSocketStore()
  const toast = useToast()

  const userPhotoUrl = computed(() => {
    const nameWithPlus = user.value?.name.replace(/ /g, '+')
    const placeholder = `https://avatar.oxro.io/avatar.svg?name=${nameWithPlus}&bold=true&width=150&height=150&fontSize=50&background=3b82f6&color=ffffff`
    return user.value?.photo_url ? `${apiDomain}/storage/fotos/${user.value?.photo_url}` : placeholder
  })

  socket.socket.on('updateUser', (newUser) => {
    const oldUser = user.value
    user.value = newUser
    if (oldUser.type !== newUser.type) {
      toast.info('Your user was remotely updated. Updating page...')
    }
  })

  socket.socket.on('orderReadyGuest', (order) => {
    if (!user.value) toast.info(`Order (#${order}) is ready!`)
  })

  const userId = computed(() => {
    return user.value?.id ?? -1
  })

  const clearUser = () => {
    sessionStorage.removeItem('token')
    socket.sendSessionLost(user.value)
    user.value = null
  }

  const clearPaymentTypes = () => {
    paymentTypes.value = []
  }

  const loadUser = async () => {
    try {
      const response = await axiosReq('users/me', 'GET')
      user.value = response.data.data
      socket.sendLoggedIn(user.value)
    } catch (error) {
      clearUser()
      throw error
    }
  }

  const loadPaymentTypes = async () => {
    paymentTypes.value = [
      { id: 1, value: 'PAYPAL', label: 'PAYPAL' },
      { id: 2, value: 'MBWAY', label: 'MBWAY' },
      { id: 3, value: 'VISA', label: 'VISA' },
    ]
  }

  const login = async (credentials) => {
    try {
      const response = await axiosReq('login', 'POST', credentials)
      sessionStorage.setItem('token', response.data.access_token)
      await loadUser()
      return true
    } catch (error) {
      clearUser()
      return false
    }
  }

  const register = async (newCustomer) => {
    const response = await axiosReq('customers', 'POST', newCustomer, true)
    if (response.status === 200) {
      sessionStorage.setItem('token', response.data.access_token)
      await loadUser()
    }
    return response.data
  }

  const logout = async () => {
    try {
      const cartStore = useCartStore()
      cartStore.clearCart()
      await axiosReq('logout', 'DELETE')
      clearUser()
      return true
    } catch (error) {
      return false
    }
  }

  const restoreToken = async () => {
    const storedToken = sessionStorage.getItem('token')
    if (storedToken) {
      await loadUser()
      return true
    }
    clearUser()
    return false
  }

  const updateCustomerDetails = async (updatedCustomer) => {
    const response = await axiosReq('customers/me', 'PUT', updatedCustomer, true)
    user.value = response.data.user
    return response
  }

  const updateEmployeeDetails = async (updatedEmployee) => {
    /* eslint-disable no-param-reassign */
    updatedEmployee.type = user.value.type
    const response = await axiosReq('users/me', 'PUT', updatedEmployee, true)
    user.value = response.data.user
    return response
  }

  const updateEmail = async (updatedEmail) => {
    const response = await axiosReq('users/me/email', 'PATCH', updatedEmail)
    // const index = users.value.findIndex((user) => user.user_id === updatedUser.user_id)
    // users.value[index] = response.data.user
    return response
  }

  const updatePassword = async (updatedPassword) => {
    const response = await axiosReq('users/me/password', 'PATCH', updatedPassword)
    sessionStorage.setItem('token', response.data.access_token)
    return response
  }

  return {
    user,
    userId,
    paymentTypes,
    userPhotoUrl,
    clearPaymentTypes,
    loadPaymentTypes,
    login,
    register,
    logout,
    restoreToken,
    updateCustomerDetails,
    updateEmployeeDetails,
    updateEmail,
    updatePassword,
  }
})
