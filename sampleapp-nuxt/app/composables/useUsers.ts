import type { UserRepository } from "~/interfaces/user.repository"
import type { User } from "~/models/user.entity"


export function useUsers(): UserRepository {
  const api = useRuntimeConfig().public.API_URL

  return {
    getAll: () => $fetch<User[]>(`${api}/Users`),
    get: (id) => $fetch<User>(`${api}/Users/${id}`),
    create: (u) => $fetch<User>(`${api}/Users`, { method: 'POST', body: u }),
    update: (u) => $fetch<User>(`${api}/Users`, { method: 'PUT', body: u }),
    del: (id) => $fetch<boolean>(`${api}/Users/${id}`, { method: 'DELETE' })
  }
}

