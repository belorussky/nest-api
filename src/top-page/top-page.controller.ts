import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	NotFoundException,
	Param,
	Patch,
	Post,
	UseGuards,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';
import { FindTopPageDto } from './dto/find-top-page.dto';
import { CreateTopPageDto } from './dto/create-top-page.dto';
import { TopPageService } from './top-page.service';
import { TOP_PAGE_NOT_FOUND } from './top-page.constants';
import { IdValidationPipe } from 'src/pipes/id-validation.pipe';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@Controller('top-page')
export class TopPageController {
	constructor(private readonly topPageService: TopPageService) {}

	@UseGuards(JwtAuthGuard)
	@Post('create')
	async create(@Body() dto: CreateTopPageDto) {
		return this.topPageService.create(dto);
	}

	@UseGuards(JwtAuthGuard)
	@Get(':id')
	async get(@Param('id', IdValidationPipe) id: string) {
		const topPage = await this.topPageService.findById(id);
		if (!topPage) {
			throw new NotFoundException(TOP_PAGE_NOT_FOUND);
		}
		return topPage;
	}

	@Get('/byAlias/:alias')
	async getByAlias(@Param('alias') alias: string) {
		const topPage = await this.topPageService.findByAlias(alias);
		if (!topPage) {
			throw new NotFoundException(TOP_PAGE_NOT_FOUND);
		}
		return topPage;
	}

	@UseGuards(JwtAuthGuard)
	@Delete(':id')
	async delete(@Param('id', IdValidationPipe) id: string) {
		const deletedTopPage = await this.topPageService.deleteById(id);
		if (!deletedTopPage) {
			throw new NotFoundException(TOP_PAGE_NOT_FOUND);
		}
	}

	@UseGuards(JwtAuthGuard)
	@Patch(':id')
	async patch(@Param('id', IdValidationPipe) id: string, @Body() dto: CreateTopPageDto) {
		const updatedTopPage = await this.topPageService.updateById(id, dto);
		if (!updatedTopPage) {
			throw new NotFoundException(TOP_PAGE_NOT_FOUND);
		}
		return updatedTopPage;
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('find')
	async find(@Body() dto: FindTopPageDto) {
		return this.topPageService.findByCategory(dto.firstCategory);
	}
}
