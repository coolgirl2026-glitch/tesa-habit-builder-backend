import db from '../config/db';

export interface HabitTask {
  title: string;
  description: string;
  duration: number;
}

export interface Program {
  id: string;
  role_id: string;
  user_id: string;
  problem_statement: string;
  competency: string;
  outcome: string;
  program_name: string;
  program_description: string;
  program_objectives: string[];
  selected_habits: HabitTask[];
  created_at: string;
}

// Internal row structure in SQLite
interface ProgramRow {
  id: string;
  role_id: string;
  user_id: string;
  problem_statement: string;
  competency: string;
  outcome: string;
  program_name: string;
  program_description: string;
  program_objectives: string; // JSON string
  selected_habits: string;      // JSON string
  created_at: string;
}

function parseRow(row: ProgramRow): Program {
  return {
    ...row,
    program_objectives: JSON.parse(row.program_objectives || '[]'),
    selected_habits: JSON.parse(row.selected_habits || '[]')
  };
}

export class ProgramModel {
  static getAll(): Promise<Program[]> {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM programs', [], (err, rows: ProgramRow[]) => {
        if (err) reject(err);
        else resolve((rows || []).map(parseRow));
      });
    });
  }

  static getByRoleId(roleId: string): Promise<Program[]> {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM programs WHERE role_id = ?', [roleId], (err, rows: ProgramRow[]) => {
        if (err) reject(err);
        else resolve((rows || []).map(parseRow));
      });
    });
  }

  static create(program: Program): Promise<Program> {
    return new Promise((resolve, reject) => {
      const {
        id, role_id, user_id, problem_statement, competency, outcome,
        program_name, program_description, program_objectives, selected_habits, created_at
      } = program;

      db.run(
        `INSERT INTO programs (
          id, role_id, user_id, problem_statement, competency, outcome,
          program_name, program_description, program_objectives, selected_habits, created_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          id || crypto.randomUUID(),
          role_id || '',
          user_id || 'demo-user',
          problem_statement ?? '',
          competency ?? '',
          outcome ?? '',
          program_name ?? '',
          program_description ?? '',
          typeof program_objectives === 'string' ? program_objectives : JSON.stringify(program_objectives || []),
          typeof selected_habits === 'string' ? selected_habits : JSON.stringify(selected_habits || []),
          created_at || new Date().toISOString()
        ],
        (err) => {
          if (err) reject(err);
          else resolve(program);
        }
      );
    });
  }

  static deleteByRoleId(roleId: string): Promise<void> {
    return new Promise((resolve, reject) => {
      db.run('DELETE FROM programs WHERE role_id = ?', [roleId], (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  }
}
