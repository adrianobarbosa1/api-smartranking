import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose'
import { CriarCategoriaDto } from './dto/criarCategoria.dto';
import { Categoria } from './interfaces/categoria.interface';

@Injectable()
export class CategoriasService {

    constructor(@InjectModel('Categoria') private readonly categoriaModel: Model<Categoria>) { }

    private readonly logger = new Logger(CategoriasService.name)

    async criarCategoria(criarCategoriaDto: CriarCategoriaDto): Promise<Categoria> {
        const { categoria } = criarCategoriaDto
        const categoriaEncontrada = await this.categoriaModel.findOne({ categoria }).exec();
        if (categoriaEncontrada) {
            throw new NotFoundException(`categoria ja cadastrado`)
        }
        const categoriaCriada = new this.categoriaModel(criarCategoriaDto)
        return await categoriaCriada.save();
    }

    // async updateJogador(_id: string, atualizarJogadorDto: AtualizarJogadorDto): Promise<void> {
    //     const jogadorEncontrado = await this.jogadorModel.findOne({ _id }).exec();
    //     this.jogadorNaoEncontrado(jogadorEncontrado)
    //     await this.jogadorModel.findOneAndUpdate({ _id }, { $set: atualizarJogadorDto }).exec()
    // }

    // async consultarTodosJogadores(): Promise<Jogador[]> {
    //     return await this.jogadorModel.find().exec()
    // }

    // async consultarJogadorId(_id: string): Promise<Jogador> {
    //     const jogador = await this.jogadorModel.findOne({ _id }).exec();
    //     this.jogadorNaoEncontrado(jogador)
    //     return jogador;
    // }

    // async deleteJogador(_id: string): Promise<any> {
    //     const jogador = await this.jogadorModel.findOne({ _id }).exec();
    //     this.jogadorNaoEncontrado(jogador)
    //     return await this.jogadorModel.deleteOne({ _id }).exec()
    // }

    // private async jogadorNaoEncontrado(jogador: Jogador): Promise<void> {
    //     if (!jogador) {
    //         throw new NotFoundException(`jogador não encontrado`)
    //     }
    // }
}
