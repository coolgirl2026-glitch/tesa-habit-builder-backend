import sqlite3 from 'sqlite3';
import path from 'path';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const DB_PATH = path.resolve(__dirname, '../../database.sqlite');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

const isSupabaseEnabled = !!(supabaseUrl && supabaseAnonKey && supabaseAnonKey !== 'your_supabase_anon_key_here');
const supabase = isSupabaseEnabled ? createClient(supabaseUrl!, supabaseAnonKey!) : null;



// Fallback SQLite Database
const localDb = new sqlite3.Database(DB_PATH, (err) => {
  if (err) {
    console.error('Error opening SQLite database:', err.message);
  } else {
    console.log('Connected to local SQLite database.');
    if (!isSupabaseEnabled) {
      initializeLocalDatabase();
    }
  }
});

if (isSupabaseEnabled) {
  console.log('Connected to Supabase Project:', supabaseUrl);
  // seedSupabasePreseededData();
}

async function seedSupabasePreseededData() {
  try {
    const companies = [
      {
        id: 'c1',
        name: 'Apex Fintech Solutions',
        industry: 'Financial Technology / Wealth Management',
        description: 'A leading provider of digital wealth management APIs, algorithmic trading platforms, and automated compliance solutions.'
      },
      {
        id: 'c2',
        name: 'CareLink Health Systems',
        industry: 'Healthcare Services & Telemedicine',
        description: 'Operates a network of multi-specialty clinics alongside a national telemedicine platform delivering remote patient monitoring.'
      },
      {
        id: 'c3',
        name: 'Nova CloudSaaS',
        industry: 'Software as a Service (SaaS) / DevOps Tools',
        description: 'Develops developer-centric infrastructure monitoring, automated deployment toolchains, and cloud-native cost optimization solutions.'
      },
      {
        id: 'c4',
        name: 'MetroCart E-Commerce',
        industry: 'Retail & Direct-to-Consumer Supply Chain',
        description: 'An online marketplace and next-day delivery network powered by proprietary AI routing and automated fulfillment centers.'
      },
      {
        id: 'c5',
        name: 'EduPath Learning',
        industry: 'EdTech / Corporate Upskilling',
        description: 'Provides personalized career progression curricula, interactive coding sandboxes, and skills assessments for corporate clients.'
      }
    ];

    const roles = [
      { id: 'r1', company_id: 'c1', role_name: 'Quantitative Analyst', role_description: 'Develops, backtests, and implements complex mathematical models for automated trading and risk assessment.' },
      { id: 'r2', company_id: 'c1', role_name: 'Compliance Associate', role_description: 'Monitors transaction logs, audits AML alerts, and prepares regulatory filing submissions.' },
      { id: 'r3', company_id: 'c1', role_name: 'Wealth Adviser', role_description: 'Guides clients on portfolio allocation, retirement planning, and tax-efficient investing.' },
      { id: 'r4', company_id: 'c2', role_name: 'Telemedicine Resident Doctor', role_description: 'Conducts remote patient consultations, diagnoses acute illnesses, and manages digital prescriptions.' },
      { id: 'r5', company_id: 'c2', role_name: 'Medical Care Coordinator', role_description: 'Coordinates post-discharge follow-ups, schedules diagnostics, and resolves insurance authorization gaps.' },
      { id: 'r6', company_id: 'c3', role_name: 'DevOps Engineer', role_description: 'Maintains Kubernetes clusters, deploys CI/CD pipelines, and manages incident response rotations.' },
      { id: 'r7', company_id: 'c3', role_name: 'Solutions Architect', role_description: 'Collaborates with enterprise clients to design secure, highly available, and cost-effective cloud architectures.' },
      { id: 'r8', company_id: 'c4', role_name: 'Fulfillment Lead', role_description: 'Manages automated warehouse picking operations, inventory dispatch targets, and workplace safety compliance.' },
      { id: 'r9', company_id: 'c4', role_name: 'Supply Chain Analyst', role_description: 'Forecasts inventory demand levels, audits carrier performance, and optimizes delivery routes.' },
      { id: 'r10', company_id: 'c5', role_name: 'Instructional Designer', role_description: 'Curates learning paths, drafts interactive assessment prompts, and coordinates video production.' },
      { id: 'r11', company_id: 'c5', role_name: 'Technical Mentor', role_description: 'Conducts code reviews, guides students through debugging sessions, and rates final projects.' }
    ];

    for (const company of companies) {
      await supabase!.from('preseeded_companies').upsert(company);
    }

    for (const role of roles) {
      await supabase!.from('preseeded_roles').upsert(role);
    }

    console.log('Seeded Supabase preseeded data successfully.');
  } catch (err: any) {
    console.error('Error seeding Supabase preseeded tables:', err.message);
  }
}

function initializeLocalDatabase() {
  localDb.serialize(() => {
    localDb.run(`
      CREATE TABLE IF NOT EXISTS company_profiles (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        company_name TEXT DEFAULT '',
        industry TEXT DEFAULT '',
        description TEXT DEFAULT '',
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL
      )
    `);

    localDb.run(`
      CREATE TABLE IF NOT EXISTS roles (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        company_id TEXT NOT NULL,
        role_name TEXT DEFAULT 'New Role',
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL,
        FOREIGN KEY (company_id) REFERENCES company_profiles(id) ON DELETE CASCADE
      )
    `);

    localDb.run(`
      CREATE TABLE IF NOT EXISTS programs (
        id TEXT PRIMARY KEY,
        role_id TEXT NOT NULL,
        user_id TEXT NOT NULL,
        problem_statement TEXT NOT NULL,
        competency TEXT NOT NULL,
        outcome TEXT NOT NULL,
        program_name TEXT NOT NULL,
        program_description TEXT NOT NULL,
        program_objectives TEXT NOT NULL,
        selected_habits TEXT NOT NULL,
        created_at TEXT NOT NULL,
        FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE
      )
    `);

    localDb.run(`
      CREATE TABLE IF NOT EXISTS preseeded_companies (
        id TEXT PRIMARY KEY,
        name TEXT UNIQUE NOT NULL,
        industry TEXT NOT NULL,
        description TEXT NOT NULL
      )
    `);

    localDb.run(`
      CREATE TABLE IF NOT EXISTS preseeded_roles (
        id TEXT PRIMARY KEY,
        company_id TEXT NOT NULL,
        role_name TEXT NOT NULL,
        role_description TEXT NOT NULL,
        FOREIGN KEY (company_id) REFERENCES preseeded_companies(id) ON DELETE CASCADE
      )
    `, () => {
      seedLocalPreseededData();
    });
  });
}

function seedLocalPreseededData() {
  const companies = [
    { id: 'c1', name: 'Apex Fintech Solutions', industry: 'Financial Technology / Wealth Management', description: 'A leading provider of digital wealth management APIs, algorithmic trading platforms, and automated compliance solutions.' },
    { id: 'c2', name: 'CareLink Health Systems', industry: 'Healthcare Services & Telemedicine', description: 'Operates a network of multi-specialty clinics alongside a national telemedicine platform delivering remote patient monitoring.' },
    { id: 'c3', name: 'Nova CloudSaaS', industry: 'Software as a Service (SaaS) / DevOps Tools', description: 'Develops developer-centric infrastructure monitoring, automated deployment toolchains, and cloud-native cost optimization solutions.' },
    { id: 'c4', name: 'MetroCart E-Commerce', industry: 'Retail & Direct-to-Consumer Supply Chain', description: 'An online marketplace and next-day delivery network powered by proprietary AI routing and automated fulfillment centers.' },
    { id: 'c5', name: 'EduPath Learning', industry: 'EdTech / Corporate Upskilling', description: 'Provides personalized career progression curricula, interactive coding sandboxes, and skills assessments for corporate clients.' }
  ];

  const roles = [
    { id: 'r1', company_id: 'c1', role_name: 'Quantitative Analyst', role_description: 'Develops, backtests, and implements complex mathematical models for automated trading and risk assessment.' },
    { id: 'r2', company_id: 'c1', role_name: 'Compliance Associate', role_description: 'Monitors transaction logs, audits AML alerts, and prepares regulatory filing submissions.' },
    { id: 'r3', company_id: 'c1', role_name: 'Wealth Adviser', role_description: 'Guides clients on portfolio allocation, retirement planning, and tax-efficient investing.' },
    { id: 'r4', company_id: 'c2', role_name: 'Telemedicine Resident Doctor', role_description: 'Conducts remote patient consultations, diagnoses acute illnesses, and manages digital prescriptions.' },
    { id: 'r5', company_id: 'c2', role_name: 'Medical Care Coordinator', role_description: 'Coordinates post-discharge follow-ups, schedules diagnostics, and resolves insurance authorization gaps.' },
    { id: 'r6', company_id: 'c3', role_name: 'DevOps Engineer', role_description: 'Maintains Kubernetes clusters, deploys CI/CD pipelines, and manages incident response rotations.' },
    { id: 'r7', company_id: 'c3', role_name: 'Solutions Architect', role_description: 'Collaborates with enterprise clients to design secure, highly available, and cost-effective cloud architectures.' },
    { id: 'r8', company_id: 'c4', role_name: 'Fulfillment Lead', role_description: 'Manages automated warehouse picking operations, inventory dispatch targets, and workplace safety compliance.' },
    { id: 'r9', company_id: 'c4', role_name: 'Supply Chain Analyst', role_description: 'Forecasts inventory demand levels, audits carrier performance, and optimizes delivery routes.' },
    { id: 'r10', company_id: 'c5', role_name: 'Instructional Designer', role_description: 'Curates learning paths, drafts interactive assessment prompts, and coordinates video production.' },
    { id: 'r11', company_id: 'c5', role_name: 'Technical Mentor', role_description: 'Conducts code reviews, guides students through debugging sessions, and rates final projects.' }
  ];

  localDb.serialize(() => {
    companies.forEach(company => {
      localDb.run(
        `INSERT OR IGNORE INTO preseeded_companies (id, name, industry, description) VALUES (?, ?, ?, ?)`,
        [company.id, company.name, company.industry, company.description]
      );
    });

    roles.forEach(role => {
      localDb.run(
        `INSERT OR IGNORE INTO preseeded_roles (id, company_id, role_name, role_description) VALUES (?, ?, ?, ?)`,
        [role.id, role.company_id, role.role_name, role.role_description]
      );
    });
  });
}

async function runSupabaseQuery(sql: string, params: any[]): Promise<any> {
  const cleanSql = sql.replace(/\s+/g, ' ').trim();
  
  if (cleanSql.toUpperCase().startsWith('SELECT')) {
    if (cleanSql.includes('preseeded_companies')) {
      const { data, error } = await supabase!
        .from('company_roles')
        .select('company_name, company_description');
      if (error) throw error;

      const seen = new Set();
      const distinct = (data || []).filter((item: any) => {
        if (!item.company_name) return false;
        const duplicate = seen.has(item.company_name);
        seen.add(item.company_name);
        return !duplicate;
      });

      return distinct.map((c: any) => ({
        id: c.company_name,
        name: c.company_name,
        industry: c.company_name,
        description: c.company_description || ''
      }));
    }
    
    if (cleanSql.includes('preseeded_roles WHERE company_id = ?')) {
      const { data, error } = await supabase!
        .from('company_roles')
        .select('*')
        .eq('company_name', params[0]);
      if (error) throw error;

      return (data || []).map((r: any) => ({
        id: r.id.toString(),
        company_id: r.company_name,
        role_name: r.role_name,
        role_description: r.role_description || ''
      }));
    }

    if (cleanSql.includes('company_roles WHERE role_name = ? AND company_description = ?')) {
      const { data, error } = await supabase!
        .from('company_roles')
        .select('*')
        .eq('role_name', params[0])
        .eq('company_description', params[1])
        .maybeSingle();
      if (error) throw error;
      return data;
    }

    if (cleanSql.includes('company_profiles WHERE id = ?')) {
      const { data, error } = await supabase!.from('company_profiles').select('*').eq('id', params[0]).maybeSingle();
      if (error) throw error;
      return data;
    }

    if (cleanSql.includes('company_profiles')) {
      const { data, error } = await supabase!.from('company_profiles').select('*');
      if (error) throw error;
      return data;
    }

    if (cleanSql.includes('roles WHERE company_id = ?')) {
      const { data, error } = await supabase!.from('roles').select('*').eq('company_id', params[0]);
      if (error) throw error;
      return data;
    }

    if (cleanSql.includes('roles WHERE id = ?')) {
      const { data, error } = await supabase!.from('roles').select('*').eq('id', params[0]).maybeSingle();
      if (error) throw error;
      return data;
    }

    if (cleanSql.includes('roles')) {
      const { data, error } = await supabase!.from('roles').select('*');
      if (error) throw error;
      return data;
    }

    if (cleanSql.includes('programs WHERE role_id = ?')) {
      const { data, error } = await supabase!.from('programs').select('*').eq('role_id', params[0]);
      if (error) throw error;
      return data.map((d: any) => ({
        ...d,
        program_objectives: typeof d.program_objectives === 'string' ? d.program_objectives : JSON.stringify(d.program_objectives),
        selected_habits: typeof d.selected_habits === 'string' ? d.selected_habits : JSON.stringify(d.selected_habits),
      }));
    }

    if (cleanSql.includes('programs')) {
      const { data, error } = await supabase!.from('programs').select('*');
      if (error) throw error;
      return data.map((d: any) => ({
        ...d,
        program_objectives: typeof d.program_objectives === 'string' ? d.program_objectives : JSON.stringify(d.program_objectives),
        selected_habits: typeof d.selected_habits === 'string' ? d.selected_habits : JSON.stringify(d.selected_habits),
      }));
    }
  }

  if (cleanSql.toUpperCase().startsWith('INSERT')) {
    if (cleanSql.includes('company_profiles')) {
      const row = {
        id: params[0],
        user_id: params[1],
        company_name: params[2],
        industry: params[3],
        description: params[4],
        created_at: params[5],
        updated_at: params[6]
      };
      const { error } = await supabase!.from('company_profiles').upsert(row);
      if (error) throw error;
      return;
    }

    if (cleanSql.includes('roles')) {
      const row = {
        id: params[0],
        user_id: params[1],
        company_id: params[2],
        role_name: params[3],
        created_at: params[4],
        updated_at: params[5]
      };
      const { error } = await supabase!.from('roles').upsert(row);
      if (error) throw error;
      return;
    }

    if (cleanSql.includes('programs')) {
      const row = {
        id: params[0],
        role_id: params[1],
        user_id: params[2],
        problem_statement: params[3],
        competency: params[4],
        outcome: params[5],
        program_name: params[6],
        program_description: params[7],
        program_objectives: typeof params[8] === 'string' ? JSON.parse(params[8]) : params[8],
        selected_habits: typeof params[9] === 'string' ? JSON.parse(params[9]) : params[9],
        created_at: params[10]
      };
      const { error } = await supabase!.from('programs').upsert(row);
      if (error) throw error;
      return;
    }
  }

  if (cleanSql.toUpperCase().startsWith('UPDATE')) {
    if (cleanSql.includes('company_profiles')) {
      const setPart = cleanSql.match(/SET (.*?) WHERE/i)?.[1] || '';
      const cols = setPart.split(',').map(part => part.split('=')[0].trim());
      const updates: any = {};
      cols.forEach((col, idx) => {
        updates[col] = params[idx];
      });
      const id = params[params.length - 1];
      const { error } = await supabase!.from('company_profiles').update(updates).eq('id', id);
      if (error) throw error;
      return;
    }

    if (cleanSql.includes('roles')) {
      const setPart = cleanSql.match(/SET (.*?) WHERE/i)?.[1] || '';
      const cols = setPart.split(',').map(part => part.split('=')[0].trim());
      const updates: any = {};
      cols.forEach((col, idx) => {
        updates[col] = params[idx];
      });
      const id = params[params.length - 1];
      const { error } = await supabase!.from('roles').update(updates).eq('id', id);
      if (error) throw error;
      return;
    }
  }

  if (cleanSql.toUpperCase().startsWith('DELETE')) {
    if (cleanSql.includes('company_profiles')) {
      const { error } = await supabase!.from('company_profiles').delete().eq('id', params[0]);
      if (error) throw error;
      return;
    }
    if (cleanSql.includes('roles')) {
      const { error } = await supabase!.from('roles').delete().eq('id', params[0]);
      if (error) throw error;
      return;
    }
  }
}

const dbWrapper = {
  all: (sql: string, params: any[], callback: (err: any, rows?: any) => void) => {
    if (isSupabaseEnabled) {
      runSupabaseQuery(sql, params)
        .then(rows => callback(null, rows))
        .catch(err => callback(err));
    } else {
      localDb.all(sql, params, callback);
    }
  },
  get: (sql: string, params: any[], callback: (err: any, row?: any) => void) => {
    if (isSupabaseEnabled) {
      runSupabaseQuery(sql, params)
        .then(row => callback(null, row))
        .catch(err => callback(err));
    } else {
      localDb.get(sql, params, callback);
    }
  },
  run: (sql: string, params: any[], callback?: (err: any, result?: any) => void) => {
    if (isSupabaseEnabled) {
      runSupabaseQuery(sql, params)
        .then(() => callback?.(null))
        .catch(err => callback?.(err));
    } else {
      localDb.run(sql, params, callback);
    }
  },
  serialize: (callback: () => void) => {
    if (isSupabaseEnabled) {
      callback();
    } else {
      localDb.serialize(callback);
    }
  }
};

export default dbWrapper;
