import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {postgresql: {schema: 'public', table: 'customers'}},
})
export class Customer extends Entity {
  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
  })
  website?: string;

  @property({
    type: 'string',
  })
  address?: string;

  constructor(data?: Partial<Customer>) {
    super(data);
  }
}

export interface CustomerRelations {
  // describe navigational properties here
}

export type CustomerWithRelations = Customer & CustomerRelations;
