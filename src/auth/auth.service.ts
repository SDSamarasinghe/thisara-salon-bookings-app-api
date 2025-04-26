import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { RegisterAdminDto } from './dto/register-admin.dto';
import { LoginAdminDto } from './dto/login-admin.dto';
import { UserRole } from '../users/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async registerAdmin(dto: RegisterAdminDto) {
    const existing = await this.usersService.findByEmail(dto.email);
    if (existing) throw new ConflictException('Email already registered');
    const user = await this.usersService.createAdmin(dto.email, dto.password);
    return { email: user.email, role: user.role };
  }

  async validateAdmin(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user || user.role !== UserRole.ADMIN) return null;
    const valid = await this.usersService.validatePassword(
      password,
      user.password,
    );
    if (!valid) return null;
    return user;
  }

  async login(dto: LoginAdminDto) {
    const user = await this.validateAdmin(dto.email, dto.password);
    if (!user) throw new UnauthorizedException('Invalid credentials');
    type AdminUser = { _id: string; email: string; role: string };
    const adminUser = user as unknown as AdminUser;
    const payload = {
      sub: adminUser._id ?? '',
      email: adminUser.email,
      role: adminUser.role,
    };
    return { access_token: this.jwtService.sign(payload) };
  }
}
