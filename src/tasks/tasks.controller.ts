import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { mapErrorCodeToHttpResponse } from 'src/utils/httpResponse';
import { Task } from '@prisma/client';
import { unauthorized } from 'src/utils/serviceResponse';
import { CreateTaskDto, UpdateTaskDto } from './dtos/task.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller({
  path: 'tasks',
  version: '1'
})
@ApiTags('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) { }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Post()
  async create(@Request() req, @Body() createTaskDto: CreateTaskDto) {
    /** Creates a task with the authenticated user as the owner */
    const authenticatedUser = req.user.sub;
    const res = await this.tasksService.create({ ownerId: authenticatedUser, ...createTaskDto });

    return mapErrorCodeToHttpResponse(res.code, res.body)
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Get()
  async findAll(@Request() req, @Query('ownerId') ownerId?: number) {
    /** Gets all tasks regardless of creator (not ideal for regular users,
     *  but could be useful for Admins/users with Admin role) */
    if (ownerId) {
      const res = await this.tasksService.findByOwnerId(ownerId)
      return mapErrorCodeToHttpResponse(res.code, res.body)
    }
    const res = await this.tasksService.findAll();
    return mapErrorCodeToHttpResponse(res.code, res.body)
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Get('myTasks')
  async findAllMyTasks(@Request() req) {
    /** Gets the tasks of the current authenticated user */
    const ownerId = req.user.sub
    const res = await this.tasksService.findByOwnerId(ownerId);
    return mapErrorCodeToHttpResponse(res.code, res.body)
  }
 
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Get('myTasks/:id')
  async findMyTaskById(@Request() req,  @Param('id') id: string) {
    /** Gets a single task of the current authenticated user */
    const ownerId = req.user.sub
    const res = await this.tasksService.findOne(+id);
    const task: Task = res.body;
    if (ownerId !== task.ownerId) {
      const serviceRes = unauthorized('You cannot view this task')
      return mapErrorCodeToHttpResponse(serviceRes.code, serviceRes.body)
    }
    return mapErrorCodeToHttpResponse(res.code, task)
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Get(':id')
  async findOne(@Request() req, @Param('id') id: string) {
    /** Gets a task by it's ID (not ideal ere, could be useful for Admins) */
    const res = await this.tasksService.findOne(+id);
    return mapErrorCodeToHttpResponse(res.code, res.body)
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Patch(':id')
  async update(@Request() req, @Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    /** Updates a task created ny te autenticated user */
    const task: Task = (await this.tasksService.findOne(+id)).body;
    if (task.ownerId !== req.user.sub) {
      const serviceRes = unauthorized('You cannot edit this task')
      return mapErrorCodeToHttpResponse(serviceRes.code, serviceRes.body)
    }
    const res = await this.tasksService.update(+id, updateTaskDto);
    return mapErrorCodeToHttpResponse(res.code, res.body)
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Delete(':id')
  async remove(@Request() req, @Param('id') id: string) {
    /** Deletes a task (created by te autenticated user) for teautenticated user */
    const task: Task = (await this.tasksService.findOne(+id)).body;
    if (task.ownerId !== req.user.sub) {
      const serviceRes = unauthorized('You cannot delete this task')
      return mapErrorCodeToHttpResponse(serviceRes.code, serviceRes.body)
    }
    const res = await this.tasksService.remove(+id);
    return mapErrorCodeToHttpResponse(res.code, res.body)
  }
}
