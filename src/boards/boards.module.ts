import { Module } from "@nestjs/common";
import { BoardsController } from "./boards.controller";
import { BoardsService } from "./boards.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Board, BoardSchema } from "./board.schema";
import { BoardsRepository } from "./boards.repository";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Board.name, schema: BoardSchema }]),
    ],
    controllers: [BoardsController],
    providers: [BoardsService, BoardsRepository],
})
export class BoardsModule {}
