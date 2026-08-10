import db from '../config/db';

export interface CompanyProfile {
  id: string;
  user_id: string;
  company_name: string;
  industry: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export class CompanyProfileModel {
  static getAll(): Promise<CompanyProfile[]> {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM company_profiles', [], (err, rows: CompanyProfile[]) => {
        if (err) reject(err);
        else resolve(rows || []);
      });
    });
  }

  static getById(id: string): Promise<CompanyProfile | null> {
    return new Promise((resolve, reject) => {
      db.get('SELECT * FROM company_profiles WHERE id = ?', [id], (err, row: CompanyProfile) => {
        if (err) reject(err);
        else resolve(row || null);
      });
    });
  }

  static create(profile: CompanyProfile): Promise<CompanyProfile> {
    return new Promise((resolve, reject) => {
      const { id, user_id, company_name, industry, description, created_at, updated_at } = profile;
      db.run(
        `INSERT INTO company_profiles (id, user_id, company_name, industry, description, created_at, updated_at)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          id || crypto.randomUUID(),
          user_id || 'demo-user',
          company_name ?? '',
          industry ?? '',
          description ?? '',
          created_at || new Date().toISOString(),
          updated_at || new Date().toISOString()
        ],
        (err) => {
          if (err) reject(err);
          else resolve(profile);
        }
      );
    });
  }

  static update(id: string, updates: Partial<CompanyProfile>): Promise<void> {
    return new Promise((resolve, reject) => {
      const keys = Object.keys(updates).filter(k => k !== 'id');
      if (keys.length === 0) {
        resolve();
        return;
      }
      
      const setClause = keys.map(k => `${k} = ?`).join(', ');
      const values = keys.map(k => (updates as any)[k] ?? '');
      values.push(id);

      db.run(
        `UPDATE company_profiles SET ${setClause} WHERE id = ?`,
        values,
        (err) => {
          if (err) reject(err);
          else resolve();
        }
      );
    });
  }

  static delete(id: string): Promise<void> {
    return new Promise((resolve, reject) => {
      db.run('DELETE FROM company_profiles WHERE id = ?', [id], (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  }
}
