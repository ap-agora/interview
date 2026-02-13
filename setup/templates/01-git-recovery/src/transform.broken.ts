export interface Schema {
  [field: string]: 'string' | 'number' | 'boolean';
}

export interface TransformOptions {
  delimiter?: string;
  skipHeader?: boolean;
  trimWhitespace?: boolean;
}

export function parseCSV(raw: string, options: TransformOptions = {}): string[][] {
  // TODO: re-implement after refactor
  throw new Error('Not implemented');
}

export function validateSchema(
  records: Record<string, unknown>[],
  schema: Schema
): { valid: boolean; errors: string[] } {
  // TODO: re-implement after refactor
  throw new Error('Not implemented');
}

export function transformRecords(
  rows: string[][],
  headers: string[]
): Record<string, string>[] {
  // TODO: re-implement after refactor
  throw new Error('Not implemented');
}

export function formatOutput(
  records: Record<string, unknown>[],
  format: 'json' | 'table' | 'csv'
): string {
  // TODO: re-implement after refactor
  throw new Error('Not implemented');
}
