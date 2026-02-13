export interface Schema {
  [field: string]: 'string' | 'number' | 'boolean';
}

export interface TransformOptions {
  delimiter?: string;
  skipHeader?: boolean;
  trimWhitespace?: boolean;
}

export function parseCSV(raw: string, options: TransformOptions = {}): string[][] {
  const { delimiter = ',', skipHeader = false, trimWhitespace = true } = options;

  const lines = raw.split('\n').filter((line) => line.trim() !== '');
  const startIndex = skipHeader ? 1 : 0;

  return lines.slice(startIndex).map((line) => {
    const fields = line.split(delimiter);
    return trimWhitespace ? fields.map((f) => f.trim()) : fields;
  });
}

export function validateSchema(
  records: Record<string, unknown>[],
  schema: Schema
): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  records.forEach((record, rowIndex) => {
    for (const [field, expectedType] of Object.entries(schema)) {
      if (!(field in record)) {
        errors.push(`Row ${rowIndex}: missing required field "${field}"`);
        continue;
      }

      const value = record[field];
      if (expectedType === 'number') {
        if (isNaN(Number(value))) {
          errors.push(`Row ${rowIndex}: field "${field}" expected number, got "${value}"`);
        }
      } else if (expectedType === 'boolean') {
        if (value !== 'true' && value !== 'false') {
          errors.push(`Row ${rowIndex}: field "${field}" expected boolean, got "${value}"`);
        }
      }
    }
  });

  return { valid: errors.length === 0, errors };
}

export function transformRecords(
  rows: string[][],
  headers: string[]
): Record<string, string>[] {
  return rows.map((row) => {
    const record: Record<string, string> = {};
    headers.forEach((header, index) => {
      record[header] = index < row.length ? row[index] : '';
    });
    return record;
  });
}

export function formatOutput(
  records: Record<string, unknown>[],
  format: 'json' | 'table' | 'csv'
): string {
  if (records.length === 0) return '';

  switch (format) {
    case 'json':
      return JSON.stringify(records, null, 2);

    case 'table': {
      const headers = Object.keys(records[0]);
      const colWidths = headers.map((h) =>
        Math.max(h.length, ...records.map((r) => String(r[h] ?? '').length))
      );

      const headerRow = headers.map((h, i) => h.padEnd(colWidths[i])).join(' | ');
      const separator = colWidths.map((w) => '-'.repeat(w)).join('-+-');
      const dataRows = records.map((r) =>
        headers.map((h, i) => String(r[h] ?? '').padEnd(colWidths[i])).join(' | ')
      );

      return [headerRow, separator, ...dataRows].join('\n');
    }

    case 'csv': {
      const headers = Object.keys(records[0]);
      const headerLine = headers.join(',');
      const dataLines = records.map((r) =>
        headers.map((h) => String(r[h] ?? '')).join(',')
      );
      return [headerLine, ...dataLines].join('\n');
    }
  }
}
