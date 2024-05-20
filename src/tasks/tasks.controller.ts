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
    const res = await this.tasksService.create({ ownerId: req.user.sub, ...createTaskDto });

    return mapErrorCodeToHttpResponse(res.code, res.body)
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Get()
  async findAll(@Request() req, @Query('ownerId') ownerId?: number) {
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
    const ownerId = req.user.sub
    const res = await this.tasksService.findByOwnerId(ownerId);
    return mapErrorCodeToHttpResponse(res.code, res.body)
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Get(':id')
  async findOne(@Request() req, @Param('id') id: string) {
    const res = await this.tasksService.findOne(+id);
    return mapErrorCodeToHttpResponse(res.code, res.body)
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Patch(':id')
  async update(@Request() req, @Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    const task: Task = (await this.tasksService.findOne(+id)).body;
    if (task.ownerId !== req.user.sub) {
      const serviceRes = unauthorized('You cannot edit this')
      return mapErrorCodeToHttpResponse(serviceRes.code, serviceRes.body)
    }
    const res = await this.tasksService.update(+id, updateTaskDto);
    return mapErrorCodeToHttpResponse(res.code, res.body)
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Delete(':id')
  async remove(@Request() req, @Param('id') id: string) {
    const task: Task = (await this.tasksService.findOne(+id)).body;
    if (task.ownerId !== req.user.sub) {
      const serviceRes = unauthorized('You cannot edit this')
      return mapErrorCodeToHttpResponse(serviceRes.code, serviceRes.body)
    }
    const res = await this.tasksService.remove(+id);
    return mapErrorCodeToHttpResponse(res.code, res.body)
  }
}
