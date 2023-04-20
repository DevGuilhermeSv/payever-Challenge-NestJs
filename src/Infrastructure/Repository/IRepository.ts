export default abstract class IRepository<T> {
  abstract getAll(): Promise<T[]>;

  abstract create(item: T): Promise<T>;

  abstract update(id: string, item: T);
}
