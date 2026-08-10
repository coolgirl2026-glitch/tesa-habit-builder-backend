import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase URL or Anon Key is missing from .env');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

function parseCSV(text: string): string[][] {
  const result: string[][] = [];
  let row: string[] = [];
  let inQuotes = false;
  let currentVal = '';

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const nextChar = text[i + 1];

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        currentVal += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      row.push(currentVal.trim());
      currentVal = '';
    } else if ((char === '\r' || char === '\n') && !inQuotes) {
      if (char === '\r' && nextChar === '\n') {
        i++;
      }
      row.push(currentVal.trim());
      result.push(row);
      row = [];
      currentVal = '';
    } else {
      currentVal += char;
    }
  }
  if (currentVal || row.length > 0) {
    row.push(currentVal.trim());
    result.push(row);
  }
  return result;
}

async function run() {
  const csvPath = 'C:\\Users\\vaish\\Downloads\\DNC - Desgn & JobRole - Sheet1.csv';
  console.log(`Reading CSV from: ${csvPath}`);
  
  if (!fs.existsSync(csvPath)) {
    console.error(`CSV file does not exist at ${csvPath}`);
    process.exit(1);
  }

  const fileContent = fs.readFileSync(csvPath, 'utf-8');
  const rows = parseCSV(fileContent);
  
  // The first row is headers: "company name", "COMPANY DESCRIPTION", "role", "Role description"
  const headers = rows[0];
  console.log('Headers:', headers);
  
  const records = rows.slice(1).filter(r => r.length >= 4 && r[0]);
  console.log(`Found ${records.length} records to import`);

  const payload = records.map(r => {
    return {
      company_name: r[0],
      company_description: r[1],
      role_name: r[2],
      role_description: r[3],
      created_at: new Date().toISOString()
    };
  });

  // Batch insert into company_roles
  console.log('Inserting into Supabase...');
  const { data, error } = await supabase
    .from('company_roles')
    .insert(payload);

  if (error) {
    console.error('Error inserting data into Supabase:', error);
    process.exit(1);
  }

  console.log('Import completed successfully!');
}

run();
