import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiTags,
  // , ApiResponse
} from '@nestjs/swagger';

import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RolesService } from './roles.service';
import { AddingRolesToUsersDto } from './dto/add-roles-to-users.dto';
// import { RoleEntity } from './entities/role.entity';

@Controller('roles')
@ApiTags('Роли')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  @ApiOperation({ summary: 'Создание Роли' })
  // @ApiResponse({
  //   status: 201,
  //   type: RoleEntity,
  //   description: 'Ответ о создании Роли',
  // })
  createRole(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.createRole(createRoleDto);
  }

  @Get()
  @ApiOperation({ summary: 'Получить Все Роли' })
  findAllRoles() {
    return this.rolesService.findAllRoles();
  }

  @Get('/:value')
  @ApiOperation({ summary: 'Получить Роль по ID <> Значению' })
  async findRoleByValue(@Param('value') value: string) {
    return await this.rolesService.findRoleByValue(value);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Обновить Роль' })
  updateRole(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.updateRole(+id, updateRoleDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удалить Роль' })
  removeRole(@Param('id') id: string) {
    return this.rolesService.removeRole(+id);
  }
  // @Delete(':id')
  // @ApiOperation({ summary: 'Востановить Роль' })
  // restoreRole(@Param('id') id: string) {
  //   return this.rolesService.restoreRole(+id);
  // }

  // ^^ мтд.> ADMIN
  // добавить неск.Ролей к неск.Пользователям
  @Post('admin/addRolesToUsers')
  @ApiOperation({ summary: 'Добавить Роли к Пользователям' })
  async createUserRoles(
    @Body() addingRolesToUsersDto: AddingRolesToUsersDto,
  ): Promise<void> {
    console.log('addingRolesToUsersDto : ' + addingRolesToUsersDto);
    console.log(addingRolesToUsersDto);
    await this.rolesService.addingRolesToUsers(addingRolesToUsersDto);
  }
}
