import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { UserEntity } from 'src/users/entities/user.entity';
import { RoleEntity } from 'src/roles/entities/role.entity';
import { UserRolesEntity } from 'src/roles/entities/user-roles.entity';
import { FileEntity } from 'src/files/entities/file.entity';
import { TrackEntity } from 'src/tracks/entities/track.entity';
import { AlbumEntity } from 'src/albums/entities/album.entity';
import { ReactionEntity } from 'src/reactions/entities/reaction.entity';

export default (): TypeOrmModuleOptions => ({
  name: 'supabase',
  type: 'postgres',
  host: process.env.SB_PG_HOST,
  port: /* + */ Number(process.env.SB_PG_PORT),
  database: process.env.SB_PG_DBN,
  username: process.env.SB_PG_USER,
  password: process.env.SB_PG_PSW,
  entities: [
    UserEntity,
    RoleEntity,
    UserRolesEntity,
    FileEntity,
    TrackEntity,
    AlbumEntity,
    ReactionEntity,
    // ! не отраб.подкл.по пути - постояный сбор query: SELECT * FROM current_schema() | ошб.в swg - "statusCode": 500, "message": "Internal server error
    // `../../*/entities/*.entity.ts`, `src/*/entities/*.entity{.ts,.js}`, `src/**/*.entity.ts`, `*/entities/**.entity{.ts}`, path.join(__dirname, 'src', '**', 'entities', '*.entity.{ts,js}'), 'src/**/entities/*.entity{.ts}'
  ],
  synchronize: process.env.NODE_ENV !== 'production',
  logging: false,
});