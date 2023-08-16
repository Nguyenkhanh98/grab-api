import { AppResource } from '@common/constants/resource';
import { AppRoles } from '@common/constants/role';
import { RolesBuilder } from 'nest-access-control';

export const RoleBuilder: RolesBuilder = new RolesBuilder();

RoleBuilder.grant(AppRoles.SUPER_ADMIN)
  .createOwn([AppResource.ORDER, AppResource.MODEL, AppResource.TEMPLATE])
  .deleteOwn([AppResource.ORDER, AppResource.MODEL, AppResource.TEMPLATE])
  .readAny([AppResource.ORDER, AppResource.MODEL, AppResource.TEMPLATE])
  .updateAny([AppResource.ORDER, AppResource.MODEL, AppResource.TEMPLATE])
  .grant(AppRoles.USER)
  .createOwn([AppResource.ORDER])
  .readAny([AppResource.ORDER, AppResource.MODEL, AppResource.TEMPLATE])
  .updateAny([AppResource.ORDER]);
