import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';

import { CreateSocialLinkInput } from './create-social-link.input';

describe('CreateSocialLinkInput', () => {
  const validInput = {
    title: 'Facebook',
    url: 'https://www.facebook.com',
  };

  function buildDto(overrides: Partial<CreateSocialLinkInput> = {}) {
    return plainToInstance(CreateSocialLinkInput, { ...validInput, ...overrides });
  }

  it('должен пройти валидацию при корректных данных', () => {
    const dto = buildDto();
    const errors = validateSync(dto);
    expect(errors).toHaveLength(0);
  });

  it('должен вернуть ошибку, если title пустой', () => {
    const dto = buildDto({ title: '' });
    const errors = validateSync(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors.some((e) => e.property === 'title')).toBe(true);
  });

  it('должен вернуть ошибку, если title не строка', () => {
    const dto = plainToInstance(CreateSocialLinkInput, { ...validInput, title: 123 });
    const errors = validateSync(dto);
    expect(errors.some((e) => e.property === 'title')).toBe(true);
  });

  it('должен вернуть ошибку, если url пустой', () => {
    const dto = buildDto({ url: '' });
    const errors = validateSync(dto);
    expect(errors.some((e) => e.property === 'url')).toBe(true);
  });

  it('должен вернуть ошибку, если url не валидный URL', () => {
    const dto = buildDto({ url: 'not-a-url' });
    const errors = validateSync(dto);
    expect(errors.some((e) => e.property === 'url')).toBe(true);
  });

  it('должен вернуть ошибку при отсутствии обязательных полей', () => {
    const dto = plainToInstance(CreateSocialLinkInput, {});
    const errors = validateSync(dto);
    expect(errors.length).toBeGreaterThan(0);
  });
});
