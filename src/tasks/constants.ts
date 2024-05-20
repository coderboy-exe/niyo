import { Prisma } from "@prisma/client";

export interface CreateTaskInterface extends Prisma.TaskCreateInput{
    ownerId: number
}

export interface UpdateTaskInterface extends Prisma.TaskUpdateInput{

}