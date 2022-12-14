import { Query } from '@nestjs/common';
import { Param } from '@nestjs/common';
import { Post } from '@nestjs/common';
import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';
import db from './db';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  async listMacskak(@Query('szemszin') szemszin) {
    if (szemszin == null) {
      const [rows] = await db.execute(
        'select * from macskak order by macskak.suly desc',
      );
      return {
        macskak: rows,
      };
    } else {
      const [rows] = await db.execute(
        'select * from macskak where macskak.szem_szin like ?',
        [szemszin],
      );
      return {
        macskak: rows,
      };
    }
  }
}
