import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { generateToken, hashPassword } from '../utils/helpers';
import { CreateUserDto, UpdateUserDto } from './constants';
import { User } from '@prisma/client';
import { exception, ServiceResponse, success } from 'src/utils/serviceResponse';

@Injectable()
export class UsersService {
    constructor(private _dbService: DatabaseService) { }

    async createUser(createUserDto: CreateUserDto): Promise<ServiceResponse> {
       try {
           const hashed = await hashPassword(createUserDto.password)
           const resetToken = await generateToken();
           const activationToken = (await generateToken()).substring(0, 6)
   
           const { password, password_reset_token, activation_token, ...createUserObj } = createUserDto
   
           return success( await this._dbService.user.create({
               data: {
                   password: hashed,
                   password_reset_token: resetToken,
                   activation_token: activationToken,
                   ...createUserObj
               },
           }));
       } catch (e) {
        return exception(e)
       }
    }

    async findAll(param?: string): Promise<ServiceResponse> {
        try {
            return success(await this._dbService.user.findMany());
        } catch (e) {
            return exception(e)
        }
    }

    async findById(id: number): Promise<ServiceResponse> {
        try {
            return success(await this._dbService.user.findUnique({
                where: {
                    id
                }
            }))
        } catch (e) {
            return exception(e)
        }
    }

    async findByEmail(email: string): Promise<ServiceResponse> {
        try {
            return success(await this._dbService.user.findUnique({
                where: {
                    email
                }
            }))
        } catch (e) {
            return exception(e)
        }
    }

    async update(id: number, updateUserDto: UpdateUserDto): Promise<ServiceResponse> {
        try {
            return success(await this._dbService.user.update({
                where: {
                    id,
                },
                data: updateUserDto
            }))
        } catch (e) {
            return exception(e)
        }
    }

    async remove(id: number): Promise<ServiceResponse> {
        try {
            return success(await this._dbService.user.delete({
                where: {
                    id
                }
            }))
        } catch (e) {
            return exception(e)
        }
    }
}
