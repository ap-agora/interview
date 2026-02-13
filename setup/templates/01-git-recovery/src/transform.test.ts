import { parseCSV, transformRecords, validateSchema, formatOutput } from './transform';

describe('parseCSV', () => {
  it('should parse basic CSV data', () => {
    const csv = 'name,age,city\nAlice,30,NYC\nBob,25,LA';
    const result = parseCSV(csv);
    expect(result).toEqual([
      ['name', 'age', 'city'],
      ['Alice', '30', 'NYC'],
      ['Bob', '25', 'LA'],
    ]);
  });

  it('should skip header when option is set', () => {
    const csv = 'name,age\nAlice,30\nBob,25';
    const result = parseCSV(csv, { skipHeader: true });
    expect(result).toEqual([
      ['Alice', '30'],
      ['Bob', '25'],
    ]);
  });

  it('should handle custom delimiters', () => {
    const csv = 'name;age\nAlice;30';
    const result = parseCSV(csv, { delimiter: ';' });
    expect(result).toEqual([
      ['name', 'age'],
      ['Alice', '30'],
    ]);
  });

  it('should trim whitespace by default', () => {
    const csv = ' name , age \n Alice , 30 ';
    const result = parseCSV(csv);
    expect(result).toEqual([
      ['name', 'age'],
      ['Alice', '30'],
    ]);
  });
});

describe('transformRecords', () => {
  it('should map rows to records using headers', () => {
    const rows = [['Alice', '30'], ['Bob', '25']];
    const headers = ['name', 'age'];
    const result = transformRecords(rows, headers);
    expect(result).toEqual([
      { name: 'Alice', age: '30' },
      { name: 'Bob', age: '25' },
    ]);
  });

  it('should handle missing fields gracefully', () => {
    const rows = [['Alice']];
    const headers = ['name', 'age'];
    const result = transformRecords(rows, headers);
    expect(result).toEqual([{ name: 'Alice', age: '' }]);
  });
});

describe('validateSchema', () => {
  it('should validate records against a schema', () => {
    const records = [{ name: 'Alice', age: '30', active: 'true' }];
    const schema = { name: 'string' as const, age: 'number' as const, active: 'boolean' as const };
    const result = validateSchema(records, schema);
    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it('should report invalid number fields', () => {
    const records = [{ name: 'Alice', age: 'not-a-number' }];
    const schema = { name: 'string' as const, age: 'number' as const };
    const result = validateSchema(records, schema);
    expect(result.valid).toBe(false);
    expect(result.errors.length).toBeGreaterThan(0);
  });
});

describe('formatOutput', () => {
  it('should format as JSON', () => {
    const records = [{ name: 'Alice', age: '30' }];
    const result = formatOutput(records, 'json');
    expect(JSON.parse(result)).toEqual(records);
  });

  it('should format as CSV', () => {
    const records = [{ name: 'Alice', age: '30' }];
    const result = formatOutput(records, 'csv');
    expect(result).toBe('name,age\nAlice,30');
  });
});
