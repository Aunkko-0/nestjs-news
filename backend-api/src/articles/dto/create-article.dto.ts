import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateArticleDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty() // ห้ามว่าง
    @MinLength(5) // ต้องยาวอย่างน้อย 5 ตัวอักษร
    title: string;

    @IsString()
    @IsOptional() // ไม่ส่งมาก็ได้ (ถ้าไม่ส่งจะเป็น null)
    @MinLength(10) // ถ้าส่งมา ต้องยาว 10 ตัวขึ้นไป
    @ApiProperty({ required: false })
    description?: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    body: string;

    @IsBoolean()
    @IsOptional()
    @ApiProperty({ required: false, default: false })
    published?: boolean = false;

    
    @ApiProperty({ required: false })
    authorId?: number;
    
}
