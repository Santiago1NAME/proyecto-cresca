import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('core_logs')
export class Audit {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 36 })
  idUser: string;

  @Column()
  action: string;

  @Column()
  modulo: string;

  @Column()
  ip: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
