import { describe, it, expect } from 'vitest';
import { FieldValidator } from '../services/FieldValidator';

describe('FieldValidator (Валідатор полів)', () => {
  
  describe('required (обов’язкове поле)', () => {
    it('має повертати true для коректних рядків', () => {
      expect(FieldValidator.required('привіт')).toBe(true);
      expect(FieldValidator.required(' так ')).toBe(true);
    });

    it('має повертати false для порожніх рядків або лише з пробілами', () => {
      expect(FieldValidator.required('')).toBe(false);
      expect(FieldValidator.required('   ')).toBe(false);
      expect(FieldValidator.required(null)).toBe(false);
      expect(FieldValidator.required(undefined)).toBe(false);
    });
  });

  describe('positiveNumber (додатне число)', () => {
    it('має повертати true для чисел більше 0', () => {
      expect(FieldValidator.positiveNumber(10)).toBe(true);
      expect(FieldValidator.positiveNumber('5')).toBe(true);
      expect(FieldValidator.positiveNumber(0.1)).toBe(true);
    });

    it('має повертати false для 0, від’ємних чисел або нечислових рядків', () => {
      expect(FieldValidator.positiveNumber(0)).toBe(false);
      expect(FieldValidator.positiveNumber(-1)).toBe(false);
      expect(FieldValidator.positiveNumber('абв')).toBe(false);
      expect(FieldValidator.positiveNumber(null)).toBe(false);
    });
  });

  describe('minLength (мінімальна довжина)', () => {
    const min3 = FieldValidator.minLength(3);

    it('має повертати true, якщо довжина >= мінімальної', () => {
      expect(min3('абв')).toBe(true);
      expect(min3('абвг')).toBe(true);
    });

    it('має повертати false, якщо довжина < мінімальної', () => {
      expect(min3('а')).toBe(false);
      expect(min3('')).toBe(false);
      expect(min3(null)).toBe(false);
    });
  });

  describe('maxLength (максимальна довжина)', () => {
    const max5 = FieldValidator.maxLength(5);

    it('має повертати true, якщо довжина <= максимальної', () => {
      expect(max5('абв')).toBe(true);
      expect(max5('абвгд')).toBe(true);
    });

    it('має повертати false, якщо довжина > максимальної', () => {
      expect(max5('абвгґд')).toBe(false);
    });
    
    it('має повертати false для null/undefined', () => {
      expect(max5(null)).toBe(false);
    });
  });
});