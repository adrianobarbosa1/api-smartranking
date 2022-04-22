import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CriarJogadorDto } from './dto/criarJogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import { v4 as uuidv4 } from 'uuid'
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose'

@Injectable()
export class JogadoresService {

    private jogadores: Jogador[] = []

    constructor(@InjectModel('Jogador') private readonly jogadorModel: Model<Jogador>) { }

    private readonly logger = new Logger(JogadoresService.name)

    async criarUpdateJogador(criarJogadorDto: CriarJogadorDto): Promise<void> {
        const { email } = criarJogadorDto
        const jogadorEncontrado = await this.jogadorModel.findOne({ email }).exec();
        if (jogadorEncontrado) {
            await this.atualizar(criarJogadorDto)
        }
        await this.criar(criarJogadorDto)
    }

    async consultarTodosJogadores(): Promise<Jogador[]> {
        return await this.jogadorModel.find().exec()
    }

    async consultarJogadoresPorEmail(email: string): Promise<Jogador> {
        const jogador = await this.jogadorModel.findOne({ email }).exec();
        if(!jogador){
            throw new NotFoundException(`jogador não encontrado`)
        }
        return jogador;
    }

    async deleteJogador(email: string): Promise<Jogador> {
        return await this.jogadorModel.remove({ email }).exec()
    }

    private async criar(criarJogadorDto: CriarJogadorDto): Promise<Jogador> {
        const { nome, email, fone } = criarJogadorDto
        const jogador = new this.jogadorModel({ nome, email, fone })
        return await jogador.save();
    }

    private async atualizar(criarJogadorDto: CriarJogadorDto): Promise<Jogador> {
        const { email } = criarJogadorDto
        return await this.jogadorModel.findOneAndUpdate({ email }, { $set: criarJogadorDto }).exec();
    }

}
