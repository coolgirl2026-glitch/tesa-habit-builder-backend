import { Request, Response } from 'express';
import { RoleModel } from '../models/role.model';

export class RoleController {
  static async getAll(req: Request, res: Response) {
    try {
      const roles = await RoleModel.getAll();
      res.json(roles);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  static async create(req: Request, res: Response) {
    try {
      const role = await RoleModel.create(req.body);
      res.status(201).json(role);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { role_name, updated_at } = req.body;
      await RoleModel.update(id, role_name, updated_at);
      res.json({ message: 'Role updated successfully' });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await RoleModel.delete(id);
      res.json({ message: 'Role deleted successfully' });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
