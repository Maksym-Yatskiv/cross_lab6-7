export class FieldValidator {
  static required(value: string | undefined | null): boolean {
    return !!value?.trim();
  }

  static positiveNumber(value: string | number | undefined | null): boolean {
    const num = typeof value === "string" ? parseFloat(value) : value;
    return typeof num === "number" && !isNaN(num) && num > 0;
  }

  static minLength(min: number) {
    return (value: string | undefined | null) => !!value && value.trim().length >= min;
  }

  static maxLength(max: number) {
    return (value: string | undefined | null) => !!value && value.trim().length <= max;
  }

}