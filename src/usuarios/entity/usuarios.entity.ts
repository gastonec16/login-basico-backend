import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Usuario {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    nombre: string

    @Column()
    apellido: string

    @Column()
    email: string

    @Column()
    nombreUsuario: string

    @Column()
    contrasenia: string
}
