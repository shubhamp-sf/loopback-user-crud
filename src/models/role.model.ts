import {Entity, model, property} from '@loopback/repository';

export enum Roles {
  SuperAdmin = 1,
  Admin,
  Subscriber,
}

@model({
  settings: {postgresql: {schema: 'public', table: 'roles'}},
})
export class Role extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'number',
    required: true,
    jsonSchema: {
      enum: Object.values(Roles),
    },
  })
  key: Roles;

  @property({
    type: 'string',
  })
  description?: string;

  constructor(data?: Partial<Role>) {
    super(data);
  }
}

export interface RoleRelations {
  // describe navigational properties here
}

export type RoleWithRelations = Role & RoleRelations;
