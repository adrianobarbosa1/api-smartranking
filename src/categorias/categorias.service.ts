import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { exec } from 'child_process';
import { Model } from 'mongoose'
import { JogadoresService } from 'src/jogadores/jogadores.service';
import { AtualizarCategoriaDto } from './dto/atualizarCategoriaDto';
import { CriarCategoriaDto } from './dto/criarCategoria.dto';
import { Categoria } from './interfaces/categoria.interface';

@Injectable()
export class CategoriasService {

    constructor(@InjectModel('Categoria')
    private readonly categoriaModel: Model<Categoria>,
        private readonly jogadoresService: JogadoresService) { }

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

    async updateCategoria(categoria: string, atualizarCategoriaDto: AtualizarCategoriaDto): Promise<void> {
        const categoriaEncontrada = await this.categoriaModel.findOne({ categoria }).exec();
        if (!categoriaEncontrada) {
            throw new NotFoundException(`categoria não encontrada`)
        }
        await this.categoriaModel.findOneAndUpdate({ categoria }, { $set: atualizarCategoriaDto }).exec()
    }

    async consultarAllCategorias(): Promise<Categoria[]> {
        return await this.categoriaModel.find().populate("jogadores").exec()
    }

    async consultarCategoriaId(categoria: string): Promise<Categoria> {
        const categoriaEncontrada = await this.categoriaModel.findOne({ categoria }).exec();
        if (!categoriaEncontrada) {
            throw new NotFoundException(`categoria não encontrada`)
        }
        return categoriaEncontrada;
    }

    async atribuirCategoriaJogador(params: string[]): Promise<void> {
        const categoria = params['categoria']
        const idJogador = params['idJogador']
        const categoriaEncontrada = await this.categoriaModel.findOne({ categoria }).exec()
        const jogadorCadastradoCategoria = await this.categoriaModel
            .find({ categoria })
            .where('jogadores')
            .in(idJogador)
            .exec()

        await this.jogadoresService.consultarJogadorId(idJogador)

        if (!categoriaEncontrada) {
            throw new BadRequestException(`categoria não encontrada`)
        }
        if (jogadorCadastradoCategoria.length > 0) {
            throw new BadRequestException(`jogador ja cadastrado na categoria`)
        }

        categoriaEncontrada.jogadores.push(idJogador)
        await this.categoriaModel.findOneAndUpdate(
            { categoria }, { $set: categoriaEncontrada }).exec()
    }

    // async deleteJogador(_id: string): Promise<any> {
    //     const jogador = await this.jogadorModel.findOne({ _id }).exec();
    //     this.jogadorNaoEncontrado(jogador)
    //     return await this.jogadorModel.deleteOne({ _id }).exec()
    // }

}
