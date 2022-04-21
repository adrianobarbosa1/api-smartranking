import { Injectable, Logger } from '@nestjs/common';
import { CriarJogadorDto } from './dto/criarJogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import { v4 as uuidv4 } from 'uuid'

@Injectable()
export class JogadoresService {

    private jogadores: Jogador[] = []

    private readonly logger = new Logger(JogadoresService.name)

    async criarUpdateJogador(criarJogadorDto: CriarJogadorDto): Promise<void> {

        this.criar(criarJogadorDto)
    }

    async consultarTodosJogadores(): Promise<Jogador[]> {
        return this.jogadores
    } 

    private criar(criarJogadorDto: CriarJogadorDto): void {
        const { nome, email, fone } = criarJogadorDto

        const jogador: Jogador = {
            _id: uuidv4(),
            nome,
            fone,
            email,
            ranking: 'A',
            posicaoRanking: 1,
            urlFotoJogador: 'www.google.com.br/foto123.jpg'
        }
        this.logger.log(`jogador: ${JSON.stringify(jogador)}`)
        this.jogadores.push(jogador)
    }
}
