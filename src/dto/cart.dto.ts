import { IsNotEmpty, IsNumber, IsOptional, IsString, Min } from "class-validator";

export class CreateCartRequest {
    @IsString()
    @IsNotEmpty()
    productId : string;

    @IsNumber()
    @Min(1)
    quantity : number
}

export class UpdateCartRequest {
    @IsString()
    @IsNotEmpty()
    productId : string;

    @IsNumber()
    @Min(1)
    @IsOptional()
    quantity? : number

    @IsNumber()
    @Min(0)
    @IsNotEmpty()
    removeProduct : number
}
