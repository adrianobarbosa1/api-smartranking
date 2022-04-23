import { Body, Controller, Delete, Get, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { AtualizarJogadorDto } from './dto/atualizarJogador.dto';
import { CriarJogadorDto } from './dto/criarJogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import { JogadoresService } from './jogadores.service';
import { JogadoresValidationParametrosPipe } from './validations/jogadores.validation.pipes';

@Controller('api/v1/jogadores')
export class JogadoresController {

  constructor(private readonly jogadoresService: JogadoresService) { }

  @Post() @UsePipes(ValidationPipe)
  async criarJogador(@Body() criarJogadorDto: CriarJogadorDto): Promise<Jogador> {
    return await this.jogadoresService.criarJogador(criarJogadorDto)
  };

  @Put('/:_id') @UsePipes(ValidationPipe)
  async atualizarJogador(
    @Body() atualizarJogadorDto: AtualizarJogadorDto,
    @Param('_id', JogadoresValidationParametrosPipe) _id: string): Promise<void> {
    await this.jogadoresService.updateJogador(_id, atualizarJogadorDto)
  };

  @Get()
  async todosJogadores(): Promise<Jogador[]> {
    return await this.jogadoresService.consultarTodosJogadores()
  }

  @Get('/:_id')
  async idJogador(
    @Param('_id', JogadoresValidationParametrosPipe) _id: string): Promise<Jogador> {
    const jogador = await this.jogadoresService.consultarJogadorId(_id)
    return jogador;
  }

  @Delete('/:_id')
  async deleteJogador(
    @Param('_id', JogadoresValidationParametrosPipe) _id: string): Promise<void> {
    await this.jogadoresService.deleteJogador(_id)
  }
}

