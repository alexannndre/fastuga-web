import { ref, computed, inject } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
// import avatarNoneUrl from '@/assets/avatar-none.png'

export const useUserStore = defineStore('user', () => {
  // const projectsStore = useProjectsStore()
  const apiDomain = inject('apiDomain')

  const user = ref(null)

  const userPhotoUrl = computed(() => {
    // if (!user.value?.photo_url) {
    //   return avatarNoneUrl
    // }
    return `${apiDomain}/storage/fotos/${user.value?.photo_url}`
  })

  const userId = computed(() => {
    return user.value?.id ?? -1
  })

  function clearUser() {
    delete axios.defaults.headers.common.Authorization
    sessionStorage.removeItem('token')
    user.value = null
  }

  async function loadUser() {
    try {
      const response = await axios.get('users/me')
      // const response = await axiosReq('users/me')
      user.value = response.data.data
    } catch (error) {
      clearUser()
      throw error
    }
  }

  async function login(credentials) {
    try {
      const response = await axios.post('login', credentials)
      // const response = await axiosReq('login', 'POST', credentials)
      axios.defaults.headers.common.Authorization = `Bearer ${response.data.access_token}`
      sessionStorage.setItem('token', response.data.access_token)
      await loadUser()
      // await projectsStore.loadProjects()
      return true
    } catch (error) {
      clearUser()
      // projectsStore.clearProjects()
      return false
    }
  }

  async function logout() {
    try {
      await axios.delete('logout')
      clearUser()
      // projectsStore.clearProjects()
      return true
    } catch (error) {
      return false
    }
  }

  async function restoreToken() {
    const storedToken = sessionStorage.getItem('token')
    if (storedToken) {
      axios.defaults.headers.common.Authorization = `Bearer ${storedToken}`
      await loadUser()
      // console.log(user.value.name)
      // await projectsStore.loadProjects()
      return true
    }
    clearUser()
    // projectsStore.clearProjects()
    return false
  }

  return { user, userId, userPhotoUrl, login, logout, restoreToken }
})
