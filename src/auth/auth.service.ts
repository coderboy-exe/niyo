import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'
import { notFound, success, unauthorized } from 'src/utils/serviceResponse';


@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) { }

  async login(userToLogin: { email: string, password: string }) : Promise<any> {
    const user = (await this.usersService.findByEmail(userToLogin.email)).body;
    // const user = res.body
    console.log('USER: ', user.password)
    const isMatch = await bcrypt.compare(userToLogin.password, user.password);

    if (!user) {
      return notFound("User not found");
    }

    if (!isMatch) return unauthorized("Incorrect Email or Password");
      const { password, activation_token, password_reset_token, id, ...result } = user;

      const jwtPayload = { sub: user.id, ...result }
      const access_token = await this.jwtService.signAsync(jwtPayload)
      const decodedToken = this.jwtService.decode(access_token) as any;
      const expiresIn = decodedToken.exp;

      return success({
        access_token,
        expiresIn
      });
  }
  
}
