import { BoardsRepository } from "./boards.repository";
import { BoardStatus } from "./boars.model";
import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateBoardDto } from "./dto/create-board.dto";
import { Board } from "./board.schema";

@Injectable()
export class BoardsService {
    constructor(private boardsRepository: BoardsRepository) {}

    async getAllBoard(): Promise<Board[]> {
        const board = this.boardsRepository.findAll();

        return board;
    }

    createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
        const { title, description } = createBoardDto;
        const board = this.boardsRepository.save(title, description);
        return board;
    }

    async getBoardById(id: string): Promise<Board> {
        const found = await this.boardsRepository.findById(id);

        if (!found) throw new NotFoundException("회원정보를 찾을 수 없습니다.");

        return found;
    }

    async deleteBoard(id: string): Promise<void> {
        const found = await this.getBoardById(id);

        await this.boardsRepository.delete(found._id);
    }

    async updateBoardStatus(id: string, status: BoardStatus): Promise<Board> {
        const found = await this.getBoardById(id);

        const board = await this.boardsRepository.update(found._id, status);
        return board;
    }
}
