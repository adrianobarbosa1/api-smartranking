import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JogadoresModule } from './jogadores/jogadores.module';
import { CategoriasModule } from './categorias/categorias.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/apijogador',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
    JogadoresModule,
    CategoriasModule
  ],
})
export class AppModule { }
