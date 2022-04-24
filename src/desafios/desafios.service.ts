import { Injectable, NotFoundException } from '@nestjs/common';
import { CriarDesafioDto } from 'src/categorias/dto/criarCategoria.dto';
import { Desafio } from './interfaces/desafio.interface';
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class DesafiosService {

    constructor(@InjectModel('Desafio') private readonly desafioModel: Model<Desafio>) { }

    async criarDesafio(criarDesafioDto: CriarDesafioDto): Promise<Desafio> {
        const { desafio } = criarDesafioDto
        const categoriaEncontrada = await this.desafioModel.findOne({ desafio }).exec();
        if (categoriaEncontrada) {
            throw new NotFoundException(`desafio ja cadastrado`)
        }
        const categoriaCriada = new this.desafioModel(criarDesafioDto)
        return await categoriaCriada.save();
    }

    // async updateCategoria(categoria: string, atualizarCategoriaDto: AtualizarCategoriaDto): Promise<void> {
    //     const categoriaEncontrada = await this.categoriaModel.findOne({ categoria }).exec();
    //     if (!categoriaEncontrada) {
    //         throw new NotFoundException(`categoria não encontrada`)
    //     }
    //     await this.categoriaModel.findOneAndUpdate({ categoria }, { $set: atualizarCategoriaDto }).exec()
    // }

    // async consultarAllCategorias(): Promise<Categoria[]> {
    //     return await this.categoriaModel.find().populate("jogadores").exec()
    // }

    // async consultarCategoriaId(categoria: string): Promise<Categoria> {
    //     const categoriaEncontrada = await this.categoriaModel.findOne({ categoria }).exec();
    //     if (!categoriaEncontrada) {
    //         throw new NotFoundException(`categoria não encontrada`)
    //     }
    //     return categoriaEncontrada;
    // }

    // async atribuirCategoriaJogador(params: string[]): Promise<void> {
    //     const categoria = params['categoria']
    //     const idJogador = params['idJogador']
    //     const categoriaEncontrada = await this.categoriaModel.findOne({ categoria }).exec()
    //     const jogadorCadastradoCategoria = await this.categoriaModel
    //         .find({ categoria })
    //         .where('jogadores')
    //         .in(idJogador)
    //         .exec()

    //     await this.jogadoresService.consultarJogadorId(idJogador)

    //     if (!categoriaEncontrada) {
    //         throw new BadRequestException(`categoria não encontrada`)
    //     }
    //     if (jogadorCadastradoCategoria.length > 0) {
    //         throw new BadRequestException(`jogador ja cadastrado na categoria`)
    //     }

    //     categoriaEncontrada.jogadores.push(idJogador)
    //     await this.categoriaModel.findOneAndUpdate(
    //         { categoria }, { $set: categoriaEncontrada }).exec()
    // }

    // async deleteJogador(_id: string): Promise<any> {
    //     const jogador = await this.jogadorModel.findOne({ _id }).exec();
    //     this.jogadorNaoEncontrado(jogador)
    //     return await this.jogadorModel.deleteOne({ _id }).exec()
    // }

}
