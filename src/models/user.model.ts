import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Customer} from './customer.model';

@model({
  settings: {
    postgresql: {
      schema: 'public',
      table: 'users',
    },
    foreignKeys: {
      targetCustomer: {
        name: 'targetCustomer',
        entity: 'Customer', // class name of second table
        entityKey: 'id',
        foreignKey: 'customerid', // in lowercase
        onDelete: 'SET NULL',
      },
    },
  },
})
export class User extends Entity {
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
    jsonSchema: {
      minLength: 10,
      errorMessage: 'Phone should be of 10 digits.',
    },
    postgresql: {
      dataType: 'bigint',
    },
  })
  phone: number;

  @property({
    type: 'date',
    required: true,
  })
  dob: string;

  @belongsTo(() => Customer, {name: 'targetCustomer'})
  customerId: number;

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
