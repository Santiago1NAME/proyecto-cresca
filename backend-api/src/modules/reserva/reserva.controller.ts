import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReservaService } from './reserva.service';
import { CreateReservaDto } from './dto/create-reserva.dto';
import { UpdateReservaDto } from './dto/update-reserva.dto';
import { Public } from 'src/core/auth/public.decorator';
import OpenAI from 'openai';
import ollama from 'ollama';

@Public()
@Controller('reserva')
export class ReservaController {
  constructor(private readonly reservaService: ReservaService) { }

  @Post()
  create(@Body() createReservaDto: CreateReservaDto) {
    return this.reservaService.create(createReservaDto);
  }

  @Get()
  async findAll() {
    try {
      const response = await ollama.chat({
        model: 'llama3.1',
        messages: [{ role: 'user', content: '¿Qué citas tienes disponibles el martes?' }],
      });
      return response;
    } catch (error) {
      console.error("Error conectando con Ollama:", error);
      return { error: "No se pudo obtener respuesta de la IA" };
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reservaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReservaDto: UpdateReservaDto) {
    return this.reservaService.update(+id, updateReservaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reservaService.remove(+id);
  }
}
