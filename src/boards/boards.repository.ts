import { BoardStatus } from "./boars.model";
import { Model, Schema } from "mongoose";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Board, BoardDocument } from "./board.schema";

@Injectable()
export class BoardsRepository {
    constructor(
        @InjectModel(Board.name) private boardModel: Model<BoardDocument>,
    ) {}

    async findAll() {
        const board = this.boardModel.find({});
        return board;
    }

    async save(title: string, description: string) {
        let board = await this.boardModel.create({
            title,
            description,
        });
        return board;
    }

    async findById(id: string): Promise<Board> {
        let board = await this.boardModel.findById(id);

        return board;
    }

    async delete(id: Schema.Types.ObjectId): Promise<void> {
        await this.boardModel.deleteOne({ _id: id });
    }

    async update(
        id: Schema.Types.ObjectId,
        status: BoardStatus,
    ): Promise<Board> {
        let board = this.boardModel.findOneAndUpdate(
            { _id: id },
            { $set: { status } },
            { new: true },
        );
        return board;
    }
}
