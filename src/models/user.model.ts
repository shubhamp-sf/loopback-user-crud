import {Entity, model, property} from '@loopback/repository';

enum Role {
  SuperAdmin = 1,
  Admin,
  Subscriber,
}

@model()
export class User extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: false,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  firstName: string;

  @property({
    type: 'string',
    default: '',
  })
  middleName: string;

  @property({
    type: 'string',
    required: true,
  })
  lastName: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
  })
  address?: string;

  @property({
    type: 'number',
    required: true,
  })
  phone: number;

  @property({
    type: 'number',
    jsonSchema: {
      enum: Object.values(Role),
    },
    default: Role.Subscriber,
  })
  role: Role;

  @property({
    type: 'date',
    required: true,
  })
  dob: string;

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
