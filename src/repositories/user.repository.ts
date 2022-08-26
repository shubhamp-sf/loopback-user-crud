import {Getter, inject} from '@loopback/core';
import {
  BelongsToAccessor,
  DefaultCrudRepository,
  repository,
} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {Customer, User, UserRelations} from '../models';
import {CustomerRepository} from './customer.repository';

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
> {
  public readonly targetCustomer: BelongsToAccessor<
    Customer,
    typeof User.prototype.id
  >;

  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource,
    @repository.getter('CustomerRepository')
    protected customerRepositoryGetter: Getter<CustomerRepository>,
  ) {
    super(User, dataSource);
    this.targetCustomer = this.createBelongsToAccessorFor(
      'targetCustomer',
      customerRepositoryGetter,
    );
    this.registerInclusionResolver(
      'targetCustomer',
      this.targetCustomer.inclusionResolver,
    );
  }
}
