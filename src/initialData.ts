import {DataObject} from '@loopback/repository';
import {Customer, Role, Roles, User} from './models';

const seedData: {
  roles: Array<DataObject<Role>>;
  users: Array<DataObject<User>>;
  customers: Array<DataObject<Customer>>;
} = {roles: [], users: [], customers: []};

seedData.roles = [
  {
    key: Roles.SuperAdmin,
    name: 'Super Admin',
    description: 'Top Most Admin, can manage everything',
  },
  {
    key: Roles.Admin,
    name: 'Admin',
    description: 'Admin who can manage subscribers',
  },
  {
    key: Roles.Subscriber,
    name: 'Subscriber',
    description: 'Service Subscriber',
  },
];

seedData.customers = [
  {
    name: 'Customer 1',
    address: 'C1, India',
    website: 'customer1.com',
  },
];

seedData.users = [
  {
    firstName: 'Shubham',
    middleName: 'P',
    lastName: 'Dev',
    email: 'hi@shubhamp.dev',
    dob: new Date('2001-09-19').toISOString(),
    address: 'India',
    phone: 8319505750,
    customerId: 1,
  },
];

export {seedData as initialData};
