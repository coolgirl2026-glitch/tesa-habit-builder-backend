import { Request, Response } from 'express';
import db from '../config/db';

export class PreseededController {
  static getCompanies(req: Request, res: Response) {
    db.all('SELECT * FROM preseeded_companies ORDER BY name ASC', [], (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json(rows || []);
      }
    });
  }

  static getCompanyRoles(req: Request, res: Response) {
    const { id } = req.params;
    db.all('SELECT * FROM preseeded_roles WHERE company_id = ? ORDER BY role_name ASC', [id], (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json(rows || []);
      }
    });
  }
}
