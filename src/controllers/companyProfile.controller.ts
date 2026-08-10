import { Request, Response } from 'express';
import { CompanyProfileModel } from '../models/companyProfile.model';

export class CompanyProfileController {
  static async getAll(req: Request, res: Response) {
    try {
      const profiles = await CompanyProfileModel.getAll();
      res.json(profiles);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  static async create(req: Request, res: Response) {
    try {
      const profile = await CompanyProfileModel.create(req.body);
      res.status(201).json(profile);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await CompanyProfileModel.update(id, req.body);
      res.json({ message: 'Company profile updated successfully' });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await CompanyProfileModel.delete(id);
      res.json({ message: 'Company profile deleted successfully' });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
