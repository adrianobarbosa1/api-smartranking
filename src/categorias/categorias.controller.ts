import { Body, Controller, Delete, Get, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { CriarCategoriaDto } from './dto/criarCategoria.dto';
import { Categoria } from './interfaces/categoria.interface';

@Controller('api/v1/categorias')
export class CategoriasController {

    constructor(private readonly categoriasService: CategoriasService) { }

    @Post() @UsePipes(ValidationPipe)
    async criarCategoria(@Body() criarCategoriaDto: CriarCategoriaDto): Promise<Categoria> {
        return await this.categoriasService.criarCategoria(criarCategoriaDto)
    };

    // @Put('/:_id') @UsePipes(ValidationPipe)
    // async atualizarJogador(
    //     @Body() atualizarJogadorDto: AtualizarJogadorDto,
    //     @Param('_id', JogadoresValidationParametrosPipe) _id: string): Promise<void> {
    //     await this.jogadoresService.updateJogador(_id, atualizarJogadorDto)
    // };

    @Get()
    async allCategorias(): Promise<Categoria[]> {
        return await this.categoriasService.consultarAllCategorias()
    }

    // @Get('/:_id')
    // async idJogador(
    //     @Param('_id', JogadoresValidationParametrosPipe) _id: string): Promise<Jogador> {
    //     const jogador = await this.jogadoresService.consultarJogadorId(_id)
    //     return jogador;
    // }

    // @Delete('/:_id')
    // async deleteJogador(
    //     @Param('_id', JogadoresValidationParametrosPipe) _id: string): Promise<void> {
    //     await this.jogadoresService.deleteJogador(_id)
    // }
}
