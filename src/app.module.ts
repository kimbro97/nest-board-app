import { Module } from "@nestjs/common";
import { BoardsModule } from "./boards/boards.module";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule } from "@nestjs/config";

@Module({
    imports: [
        ConfigModule.forRoot(),
        MongooseModule.forRoot(process.env.DATABASE_URL),
        BoardsModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
