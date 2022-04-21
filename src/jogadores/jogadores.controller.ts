import { Body, Controller, Get, Post } from '@nestjs/common';
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
  async consultaJogador(): Promise<Jogador[]> {
    return await this.jogadoresService.consultarTodosJogadores()
  }
}

