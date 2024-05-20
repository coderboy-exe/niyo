import { Injectable } from '@nestjs/common';
import { CreateTaskInterface, UpdateTaskInterface } from './constants';
import { DatabaseService } from 'src/database/database.service';
import { exception, ServiceResponse, success } from 'src/utils/serviceResponse';

@Injectable()
export class TasksService {
  constructor(private _dbService: DatabaseService) { }

  async create(createTaskDto: CreateTaskInterface): Promise<ServiceResponse> {
    const { ownerId, ...createTaskObj } = createTaskDto
    try {
      return success(await this._dbService.task.create({
        data: {
          owner: { connect: { id: ownerId } },
          ...createTaskObj
        }
      }));
    } catch (e) {
      return exception(e)
    }
  }

  async findAll(param?: string): Promise<ServiceResponse> {
    try {
      return success(await this._dbService.task.findMany({
        orderBy: {
          id: 'asc'
        }
      }));
    } catch (e) {
      return exception(e)
    }
  }

  async findOne(id: number): Promise<ServiceResponse> {
    try {
      return success(await this._dbService.task.findUnique({
        where: {
          id
        }
      }))
    } catch (e) {
      return exception(e)
    }
  }

  async findByOwnerId(ownerId: number): Promise<ServiceResponse> {
    try {
      return success(await this._dbService.task.findMany({
        where: {
          ownerId
        },
        orderBy: {
          id: 'asc'
        }
      }))
    } catch (e) {
      return exception(e)
    }
  }

  async update(id: number, updateTaskDto: UpdateTaskInterface): Promise<ServiceResponse> {
    try {
      return success(await this._dbService.task.update({
        where: {
          id,
        },
        data: updateTaskDto
      }))
    } catch (e) {
      return exception(e)
    }
  }

  async remove(id: number): Promise<ServiceResponse> {
    try {
      return success(await this._dbService.task.delete({
        where: {
          id
        }
      }))
    } catch (e) {
      return exception(e)
    }
  }
}
