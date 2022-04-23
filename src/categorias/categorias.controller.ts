import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { AtualizarCategoriaDto } from './dto/atualizarCategoriaDto';
import { CriarCategoriaDto } from './dto/criarCategoria.dto';
import { Categoria } from './interfaces/categoria.interface';
import { CategoriasValidationParametrosPipe } from './validations/categorias.validation.pipe';

@Controller('api/v1/categorias')
export class CategoriasController {

    constructor(private readonly categoriasService: CategoriasService) { }

    @Post() @UsePipes(ValidationPipe)
    async criarCategoria(@Body() criarCategoriaDto: CriarCategoriaDto): Promise<Categoria> {
        return await this.categoriasService.criarCategoria(criarCategoriaDto)
    };

    @Put('/:categoria') @UsePipes(ValidationPipe)
    async atualizarCategoria(
        @Body() atualizarCategoriaDto: AtualizarCategoriaDto,
        @Param('categoria') categoria: string): Promise<void> {
        await this.categoriasService.updateCategoria(categoria, atualizarCategoriaDto)
    };

    @Post('/:categoria/jogadores/:idJogador')
    async atriguirCategoriaJogador(@Param() params: string[]): Promise<void> {
        return await this.categoriasService.atribuirCategoriaJogador(params)
    }

    @Get()
    async allCategorias(): Promise<Categoria[]> {
        return await this.categoriasService.consultarAllCategorias()
    }

    @Get('/:categoria')
    async constularCategoriaId(
        @Param('categoria', CategoriasValidationParametrosPipe) categoria: string): Promise<Categoria> {
        return await this.categoriasService.consultarCategoriaId(categoria)
    }

    // @Delete('/:_id')
    // async deleteJogador(
    //     @Param('_id', JogadoresValidationParametrosPipe) _id: string): Promise<void> {
    //     await this.jogadoresService.deleteJogador(_id)
    // }
}
