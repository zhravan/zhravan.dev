import fs from 'fs';
import path from 'path';
import { parse } from 'yaml';

export interface Book {
  id: string;
  title: string;
  author: string;
  status: 'reading' | 'read' | 'to-read';
  rating?: number;
  dateStarted?: string;
  dateFinished?: string;
  review?: string;
  notes?: string;
  coverUrl?: string;
  amazonLink?: string;
  tags?: string[];
}

export function getBooks(): Book[] {
  const configPath = path.join(process.cwd(), 'config', 'reading.yaml');
  
  if (!fs.existsSync(configPath)) {
    return [];
  }

  const fileContents = fs.readFileSync(configPath, 'utf8');
  const data = parse(fileContents) as { books: Book[] };
  
  return data?.books || [];
}
