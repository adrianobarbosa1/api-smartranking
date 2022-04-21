import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { CriarJogadorDto } from './dto/criarJogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import { JogadoresService } from './jogadores.service';

@Controller('api/v1/jogadores')
export class JogadoresController {

  constructor(private readonly jogadoresService: JogadoresService) { }

  @Post()
  async criarAtualizarJogador(@Body() criarJogadorDto: CriarJogadorDto) {
    await this.jogadoresService.criarUpdateJogador(criarJogadorDto)
  };

  @Get()
  async consultaJogador(@Query('email') email: string): Promise<Jogador[] | Jogador> {
    if (email) {
      return await this.jogadoresService.consultarJogadoresPorEmail(email)
    }
    return await this.jogadoresService.consultarTodosJogadores()
  }

  @Delete('deletar')
  async deleteJogador(@Query('email') email: string): Promise<void> {
    await this.jogadoresService.deleteJogador(email)
  }
}

