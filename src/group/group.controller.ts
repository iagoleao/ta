import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@app/auth/guard/auth.guard';
import { CreateGroupDto, UpdateGroupDto } from '@app/group/dto';
import { GroupService } from '@app/group/group.service';

@Controller('group')
@UseGuards(AuthGuard)
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post()
  create(@Body() data: CreateGroupDto) {
    return this.groupService.create({
      ...data,
    });
  }

  @Get()
  findAll() {
    return this.groupService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.groupService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdateGroupDto) {
    return this.groupService.update(+id, {
      ...data,
      date: new Date(data.date),
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.groupService.remove(+id);
  }
}
