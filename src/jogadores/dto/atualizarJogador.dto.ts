import { IsNotEmpty } from 'class-validator'

export class AtualizarJogadorDto {

    @IsNotEmpty()
    readonly fone: string;

    @IsNotEmpty()
    readonly nome: string;
}