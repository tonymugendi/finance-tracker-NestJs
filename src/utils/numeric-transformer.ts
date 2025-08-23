export class ColumnNumericTransformer {
    to(value?: number | null): number | null {
      return value === null || value === undefined ? null : value;
    }
    from(value?: string | null): number | null {
      return value === null || value === undefined ? null : parseFloat(value);
    }
  }
  