import { Body, Controller, Post } from '@nestjs/common'
import { UsuariosService } from './usuarios.service'
import {
    CrearUsuarioInterface,
    IniciarSesionInterface,
} from './entity/usuarios.interface'

@Controller('usuarios')
export class UsuariosController {
    constructor(private usuariosService: UsuariosService) {}

    @Post()
    crearUsuario(@Body() nuevoUsuario: CrearUsuarioInterface) {
        return this.usuariosService.crearUsuario(nuevoUsuario)
    }

    @Post('iniciar-sesion')
    iniciarSesion(@Body() credenciales: IniciarSesionInterface) {
        return this.usuariosService.iniciarSesion(credenciales)
    }
}
