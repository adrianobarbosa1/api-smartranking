import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CriarJogadorDto } from './dto/criarJogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import { v4 as uuidv4 } from 'uuid'
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose'
import { AtualizarJogadorDto } from './dto/atualizarJogador.dto';

@Injectable()
export class JogadoresService {

    constructor(@InjectModel('Jogador') private readonly jogadorModel: Model<Jogador>) { }

    private readonly logger = new Logger(JogadoresService.name)

    async criarJogador(criarJogadorDto: CriarJogadorDto): Promise<Jogador> {
        const { email } = criarJogadorDto
        const jogadorEncontrado = await this.jogadorModel.findOne({ email }).exec();
        if (jogadorEncontrado) {
            throw new NotFoundException(`jogador ja cadastrado`)
        }
        const jogador = new this.jogadorModel(criarJogadorDto)
        return await jogador.save();
    }

    async updateJogador(_id: string, atualizarJogadorDto: AtualizarJogadorDto): Promise<void> {
        const jogadorEncontrado = await this.jogadorModel.findOne({ _id }).exec();
        this.jogadorNaoEncontrado(jogadorEncontrado)
        await this.jogadorModel.findOneAndUpdate({ _id }, { $set: atualizarJogadorDto }).exec()
    }

    async consultarTodosJogadores(): Promise<Jogador[]> {
        return await this.jogadorModel.find().exec()
    }

    async consultarJogadorId(_id: string): Promise<Jogador> {
        const jogador = await this.jogadorModel.findOne({ _id }).exec();
        if (!jogador) {
            throw new NotFoundException(`jogador não encontrado`)
        }
        return jogador;
    }

    async deleteJogador(_id: string): Promise<any> {
        const jogador = await this.jogadorModel.findOne({ _id }).exec();
        this.jogadorNaoEncontrado(jogador)
        return await this.jogadorModel.deleteOne({ _id }).exec()
    }

    private async jogadorNaoEncontrado(jogador: Jogador): Promise<void> {
        if (!jogador) {
            throw new NotFoundException(`jogador não encontrado`)
        }
    }
}
