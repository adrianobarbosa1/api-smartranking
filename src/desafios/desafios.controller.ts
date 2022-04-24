import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CriarDesafioDto } from 'src/categorias/dto/criarCategoria.dto';
import { DesafiosService } from './desafios.service';
import { Desafio } from './interfaces/desafio.interface';


@Controller('api/v1/desafios')
export class DesafiosController {

    constructor(private readonly desafiosService: DesafiosService) { }

    @Post() @UsePipes(ValidationPipe)
    async criarDesafio(@Body() criarDesafioDto: CriarDesafioDto): Promise<Desafio> {
        return await this.desafiosService.criarDesafio(criarDesafioDto)
    };

    // @Put('/:categoria') @UsePipes(ValidationPipe)
    // async atualizarCategoria(
    //     @Body() atualizarCategoriaDto: AtualizarCategoriaDto,
    //     @Param('categoria') categoria: string): Promise<void> {
    //     await this.categoriasService.updateCategoria(categoria, atualizarCategoriaDto)
    // };

    // @Post('/:categoria/jogadores/:idJogador')
    // async atriguirCategoriaJogador(@Param() params: string[]): Promise<void> {
    //     return await this.categoriasService.atribuirCategoriaJogador(params)
    // }

    // @Get()
    // async allCategorias(): Promise<Categoria[]> {
    //     return await this.categoriasService.consultarAllCategorias()
    // }

    // @Get('/:categoria')
    // async constularCategoriaId(
    //     @Param('categoria', CategoriasValidationParametrosPipe) categoria: string): Promise<Categoria> {
    //     return await this.categoriasService.consultarCategoriaId(categoria)
    // }

    // @Delete('/:_id')
    // async deleteJogador(
    //     @Param('_id', JogadoresValidationParametrosPipe) _id: string): Promise<void> {
    //     await this.jogadoresService.deleteJogador(_id)
    // }
}