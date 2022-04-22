import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JogadoresModule } from './jogadores/jogadores.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/apijogador',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
    JogadoresModule
  ],
})
export class AppModule { }
