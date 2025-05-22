import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./User";
import { Software } from "./Software";

@Entity()
export class Request {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  @JoinColumn()
  user: User;

  @ManyToOne(() => Software)
  @JoinColumn()
  software: Software;

  @Column({
    type: 'enum',
    enum: ['Pending', 'Approved', 'Rejected'],
    default: 'Pending'
  })
  status: 'Pending' | 'Approved' | 'Rejected';

  @Column({ nullable: true })
  reason: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
} 