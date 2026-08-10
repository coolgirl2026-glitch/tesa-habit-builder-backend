import { Request, Response } from 'express';
import { ProgramModel } from '../models/program.model';

export class ProgramController {
  static async getAll(req: Request, res: Response) {
    try {
      const programs = await ProgramModel.getAll();
      res.json(programs);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  static async create(req: Request, res: Response) {
    try {
      const program = await ProgramModel.create(req.body);
      res.status(201).json(program);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
