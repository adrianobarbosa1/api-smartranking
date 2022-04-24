import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JogadoresModule } from './jogadores/jogadores.module';
import { CategoriasModule } from './categorias/categorias.module';
import { DesafiosModule } from './desafios/desafios.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/apijogador',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
    JogadoresModule,
    CategoriasModule,
    DesafiosModule
  ],
})
export class AppModule { }
