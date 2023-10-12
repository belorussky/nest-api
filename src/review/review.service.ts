import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ReviewDocument, ReviewModel } from './models/review.model';
import { Model, Types } from 'mongoose';
import { CreateReviewDto } from './dto/create-review.dto';

@Injectable()
export class ReviewService {
	constructor(@InjectModel(ReviewModel.name) private reviewModel: Model<ReviewDocument>) {}

	async create(dto: CreateReviewDto): Promise<ReviewDocument> {
		const newReview = new this.reviewModel(dto);
		return newReview.save();
	}

	async delete(id: string): Promise<ReviewDocument | null> {
		return this.reviewModel.findById(id).exec();
	}

	async findByProductId(productId: string): Promise<ReviewDocument[]> {
		return this.reviewModel.find({ productId: new Types.ObjectId(productId) }).exec();
	}

	async deleteByProductId(productId: string) {
		return this.reviewModel.deleteMany({ productId: new Types.ObjectId(productId) }).exec();
	}
}
