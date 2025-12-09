<script setup lang="ts">

import { onMounted, ref } from 'vue'
import { useUsers } from '../composables/useUsers'
import type { User } from '~/models/user.entity'

const usersService = useUsers()
const users = ref<User[]>([])

onMounted(async () => {
  users.value = await usersService.getAll()
})
</script>

<template>
  <v-container>
    <v-table>
      <thead>
        <tr>
          <th>Id</th>
          <th>Name</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="u in users" :key="u.id">
          <td>{{ u.id }}</td>
          <td>{{ u.login }}</td>
        </tr>
      </tbody>
    </v-table>
  </v-container>
</template>

