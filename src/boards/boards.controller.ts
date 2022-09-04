import { BoardsService } from "./boards.service";
import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    UsePipes,
    ValidationPipe,
} from "@nestjs/common";
import { BoardStatus } from "./boars.model";
import { CreateBoardDto } from "./dto/create-board.dto";
import { BoardStatusValidationPipe } from "./pipes/board-status-validation.pipe";
import { Board } from "./board.schema";

@Controller("boards")
export class BoardsController {
    constructor(private boardsService: BoardsService) {}

    @Get()
    getAllBoard(): Promise<Board[]> {
        return this.boardsService.getAllBoard();
    }

    @Post()
    @UsePipes(ValidationPipe) // 핸들러 레벨 파이프
    createBoard(@Body() createBoardDto: CreateBoardDto): Promise<Board> {
        return this.boardsService.createBoard(createBoardDto);
    }

    @Get("/:id")
    getBoardById(@Param("id") id: string) {
        return this.boardsService.getBoardById(id);
    }

    @Delete("/:id")
    deleteBoard(@Param("id") id: string): Promise<void> {
        return this.boardsService.deleteBoard(id);
    }

    @Patch("/:id/status")
    updateBoardStatus(
        @Param("id") id: string,
        @Body("status", BoardStatusValidationPipe) status: BoardStatus, // 파라미터 레벨에서 검증
    ) {
        return this.boardsService.updateBoardStatus(id, status);
    }
}
