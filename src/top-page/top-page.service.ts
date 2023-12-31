import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TopLevelCategory, TopPageDocument, TopPageModel } from './models/top-page.model';
import { Model } from 'mongoose';
import { CreateTopPageDto } from './dto/create-top-page.dto';
import { addDays } from 'date-fns';
import { Types } from 'mongoose';

@Injectable()
export class TopPageService {
	constructor(
		@InjectModel(TopPageModel.name) private readonly topPageModel: Model<TopPageDocument>,
	) {}

	async create(dto: CreateTopPageDto): Promise<TopPageDocument> {
		return this.topPageModel.create(dto);
	}

	async findById(id: string): Promise<TopPageDocument | null> {
		return this.topPageModel.findById(id).exec();
	}

	async findByAlias(alias: string): Promise<TopPageDocument | null> {
		return this.topPageModel.findOne({ alias }).exec();
	}

	async findAll() {
		return this.topPageModel.find({}).exec();
	}

	async findByCategory(firstCategory: TopLevelCategory) {
		return this.topPageModel
			.aggregate()
			.match({
				firstCategory,
			})
			.group({
				_id: { secondCategory: '$secondCategory' },
				pages: { $push: { alias: '$alias', title: '$title' } },
			})
			.exec();
	}

	async findByText(text: string) {
		return this.topPageModel.find({ $text: { $search: text, $caseSensitive: false } }).exec();
	}

	async deleteById(id: string): Promise<TopPageDocument | null> {
		return this.topPageModel.findByIdAndDelete(id).exec();
	}

	async updateById(
		id: string | Types.ObjectId,
		dto: CreateTopPageDto,
	): Promise<TopPageDocument | null> {
		return this.topPageModel.findByIdAndUpdate(id, dto, { new: true }).exec();
	}

	async findForHhUpdate(date: Date) {
		return this.topPageModel
			.find({
				firstCategory: 0,
				$or: [
					{ 'hh.updatedAt': { $lt: addDays(date, -1) } },
					{ 'hh.updatedAt': { $exists: false } },
				],
			})
			.exec();
	}
}
