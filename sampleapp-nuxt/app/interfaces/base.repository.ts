export interface BaseRepository<T> {
  get(id: number): Promise<T>
  getAll(): Promise<T[]>
  create(obj: T): Promise<T>
  update(obj: T): Promise<T>
  del(id: number): Promise<boolean>
}
