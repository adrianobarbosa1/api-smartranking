import { IsNotEmpty, IsEmail } from 'class-validator'

export class CriarJogadorDto {

    @IsNotEmpty()
    readonly fone: string;

    @IsEmail() @IsNotEmpty()
    readonly email: string;

    @IsNotEmpty()
    readonly nome: string;
}