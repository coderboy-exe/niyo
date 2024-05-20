import { ApiHideProperty } from "@nestjs/swagger";

export class CreateTaskDto {
    title: string;
    description?: string;
    @ApiHideProperty()
    ownerId?: number;
    @ApiHideProperty()
    owner
}

export class UpdateTaskDto {
    title: string;
    description?: string;
    @ApiHideProperty()
    ownerId?: number;
    @ApiHideProperty()
    owner
}