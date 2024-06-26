import { randomUUID } from 'node:crypto';

import { Entity, IStorableEntity, IEntityFactory } from '@project/core';
import { IRepository } from './repository.interface';

export abstract class BaseMemoryRepository<T extends Entity & IStorableEntity<ReturnType<T['toPOJO']>>> implements IRepository<T> {
  protected entities: Map<T['id'], ReturnType<T['toPOJO']>> = new Map();

  constructor(
    protected entityFactory: IEntityFactory<T>
  ) { }

  public async findById(id: T['id']): Promise<T> {
    const foundEntity = this.entities.get(id) || null;
    if (!foundEntity) {
      return null;
    }

    return this.entityFactory.create(foundEntity);
  }

  public async save(entity: T): Promise<T> {
    if (!entity.id) {
      entity.id = randomUUID();
    }

    this.entities.set(entity.id, entity.toPOJO());
    return entity;
  }

  public async update(entity: T): Promise<void> {
    if (!this.entities.has(entity.id)) {
      throw new Error('Entity not found');
    }

    this.entities.set(entity.id, entity.toPOJO());
  }

  public async deleteById(id: T['id']): Promise<void> {
    if (!this.entities.has(id)) {
      throw new Error('Entity not found');
    }

    this.entities.delete(id);
  }
}
