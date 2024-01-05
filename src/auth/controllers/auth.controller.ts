import { Body, Controller, Get, Param, Post, Req, Res, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthDTO } from '../dto/auth.dto';
import { AuthService } from '../services/auth.service';
import { AccessLevelGuard } from '../guards/access-level.guard';
import { AuthGuard as passportGuard } from '@nestjs/passport';
// import { AuthGuard } from '../guards/auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { PublicAccess } from '../decorators/public.decorator';

@Controller('auth')
// @UseGuards(AuthGuard, RolesGuard, AccessLevelGuard)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @PublicAccess()
  @Post('login')
  async login(@Body() { email, password }: AuthDTO) {
    return await this.authService.validateUser(email, password);
  }

  @Post('refresh-token/:userId')
  async generateRefreshJWT(@Param('userId') userId: string) {
    return await this.authService.generateRefreshJWT(userId);
  }
  
  @Get('google')
  @UseGuards(passportGuard('google'))
  googleAuth(@Req() req) {
    //
  }

  @Get('google/callback')
  @UseGuards(passportGuard('google'))
  googleLoginCallback(@Req() req, @Res() res) {
    const loginGoogleData = JSON.stringify( req.user)
    res.cookie('loginGoogle', loginGoogleData);

res.send(`
    <script>
      // Envía un mensaje a la ventana principal para indicar que la autenticación ha finalizado
      window.opener.postMessage({ type: 'loginComplete', data: ${loginGoogleData} }, '*');

      // Cierra la ventana emergente después de unos segundos (ajusta el tiempo según sea necesario)
      setTimeout(() => window.close(), 1000);
    </script>
  `);
    // res.redirect('http://localhost:5173/public/login');
  }
}
