import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthDTO } from '../dto/auth.dto';
import { AuthService } from '../services/auth.service';
import { AccessLevelGuard } from '../guards/access-level.guard';
import { AuthGuard as passportGuard } from '@nestjs/passport';
// import { AuthGuard } from '../guards/auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { PublicAccess } from '../decorators/public.decorator';
import { Roles } from '../decorators/roles.decorator';
import { AuthGuard } from '../guards/auth.guard';
import { ErrorManager } from 'src/utils/error.manager';

@Controller('auth')
@UseGuards(AuthGuard, RolesGuard, AccessLevelGuard)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @PublicAccess()
  @Post('login')
  async login(@Body() { email, password }: AuthDTO) {
    return await this.authService.validateUser(email, password);
  }

  // @Roles('CLIENT', 'BROKER', 'ADMIN')
  @PublicAccess()
  @Post('refresh-token/:userId')
  async generateRefreshJWT(@Param('userId') userId: string) {
    return await this.authService.generateRefreshJWT(userId);
  }

  @PublicAccess()
  @Get('google')
  @UseGuards(passportGuard('google'))
  googleAuth(@Req() req) {
    try {
    } catch (error) {
      throw new ErrorManager.createSignaturError(error.message);
    }
  }
  
  @PublicAccess()
  @Get('google/callback')
  @UseGuards(passportGuard('google'))
  googleLoginCallback(@Req() req, @Res() res) {
    try {
      const loginGoogleData = JSON.stringify(req.user);
      console.log(req.user);

      // Envía la información directamente al cliente
      res.send(`
      <script>
        // Almacena la información en el localStorage
        localStorage.setItem('loginGoogle', ${JSON.stringify(loginGoogleData)});
        
        // Envía un mensaje a la ventana principal para indicar que la autenticación ha finalizado
        window.opener.postMessage({ type: 'loginComplete', data: ${loginGoogleData} }, '*');

        // Cierra la ventana emergente después de unos segundos (ajusta el tiempo según sea necesario)
        setTimeout(() => window.close(), 100);
      </script>
    `);
    } catch (error) {
      throw new ErrorManager.createSignaturError(error.message);
    }
  }
}
