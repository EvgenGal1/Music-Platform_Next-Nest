import { PrimaryColumn } from 'typeorm';

export abstract class AbstractEntity {
  @PrimaryColumn()
  id: number;

  // @Column()
  // title: string;

  // @Column()
  // description: string;
}
