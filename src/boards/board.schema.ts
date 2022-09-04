import { BoardStatus } from "./boars.model";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import * as mongoose from "mongoose";

export type BoardDocument = Board & Document;

@Schema({ versionKey: false })
export class Board {
    @Prop({ auto: true })
    _id: mongoose.Schema.Types.ObjectId;

    @Prop({ required: true })
    title: string;

    @Prop()
    description: string;

    @Prop({ default: BoardStatus.PUBLIC })
    status: BoardStatus;

    @Prop({ default: Date.now })
    createdAt: Date;
}

export const BoardSchema = SchemaFactory.createForClass(Board);
