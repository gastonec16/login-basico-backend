import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { Usuario } from './entity/usuarios.entity'
import { InjectRepository } from '@nestjs/typeorm'
import {
    CrearUsuarioInterface,
    IniciarSesionInterface,
} from './entity/usuarios.interface'

@Injectable()
export class UsuariosService {
    constructor(
        @InjectRepository(Usuario)
        private usuarioRepository: Repository<Usuario>,
    ) {}

    async crearUsuario(usuario: CrearUsuarioInterface) {
        const nombreUsuarioRepetido = await this.usuarioRepository.findOne({
            where: { nombreUsuario: usuario.nombreUsuario },
        })
        const emailRepetido = await this.usuarioRepository.findOne({
            where: { email: usuario.email },
        })
        if (!nombreUsuarioRepetido && !emailRepetido) {
            const nuevoUsuario = this.usuarioRepository.create(usuario)
            return this.usuarioRepository.save(nuevoUsuario)
        } else if (nombreUsuarioRepetido) {
            return new HttpException(
                'El nombre de usuario ya está en uso',
                HttpStatus.CONFLICT,
            )
        } else if (emailRepetido) {
            return new HttpException(
                'El email ya está registrado',
                HttpStatus.CONFLICT,
            )
        }
    }

    async iniciarSesion(usuario: IniciarSesionInterface) {
        const usuarioEncontrado = await this.usuarioRepository.findOne({
            where: { nombreUsuario: usuario.nombreUsuario },
        })
        if (!usuarioEncontrado) {
            return new HttpException(
                'El usuario no existe',
                HttpStatus.BAD_REQUEST,
            )
        } else if (usuario.contrasenia == usuarioEncontrado.contrasenia) {
            return usuarioEncontrado
        } else {
            return new HttpException(
                'Contraseña incorrecta',
                HttpStatus.BAD_REQUEST,
            )
        }
    }
}
