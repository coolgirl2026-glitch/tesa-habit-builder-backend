import db from '../config/db';

export interface Role {
  id: string;
  user_id: string;
  company_id: string;
  role_name: string;
  created_at: string;
  updated_at: string;
}

export class RoleModel {
  static getAll(): Promise<Role[]> {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM roles', [], (err, rows: Role[]) => {
        if (err) reject(err);
        else resolve(rows || []);
      });
    });
  }

  static getByCompanyId(companyId: string): Promise<Role[]> {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM roles WHERE company_id = ?', [companyId], (err, rows: Role[]) => {
        if (err) reject(err);
        else resolve(rows || []);
      });
    });
  }

  static create(role: Role): Promise<Role> {
    return new Promise((resolve, reject) => {
      const { id, user_id, company_id, role_name, created_at, updated_at } = role;
      db.run(
        `INSERT INTO roles (id, user_id, company_id, role_name, created_at, updated_at)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [
          id || crypto.randomUUID(),
          user_id || 'demo-user',
          company_id || '',
          role_name ?? '',
          created_at || new Date().toISOString(),
          updated_at || new Date().toISOString()
        ],
        (err) => {
          if (err) reject(err);
          else resolve(role);
        }
      );
    });
  }

  static update(id: string, roleName: string, updatedAt: string): Promise<void> {
    return new Promise((resolve, reject) => {
      db.run(
        `UPDATE roles SET role_name = ?, updated_at = ? WHERE id = ?`,
        [roleName, updatedAt, id],
        (err) => {
          if (err) reject(err);
          else resolve();
        }
      );
    });
  }

  static delete(id: string): Promise<void> {
    return new Promise((resolve, reject) => {
      db.run('DELETE FROM roles WHERE id = ?', [id], (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  }
}
