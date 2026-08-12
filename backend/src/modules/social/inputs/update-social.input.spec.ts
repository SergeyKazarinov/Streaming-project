import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';

import { UpdateSocialLinkInput } from './update-social.input';

describe('UpdateSocialLinkInput', () => {
  const validInput: UpdateSocialLinkInput = {
    id: 'a062bece-16eb-4693-850d-f192ac281d9b',
    title: 'Facebook',
    url: 'https://www.facebook.com',
    order: 1,
  };

  function buildDto(overrides: Partial<UpdateSocialLinkInput> = {}) {
    return plainToInstance(UpdateSocialLinkInput, { ...validInput, ...overrides });
  }

  it('должен пройти валидацию при корректных данных', () => {
    const dto = buildDto();
    const errors = validateSync(dto);
    expect(errors).toHaveLength(0);
  });

  it('должен пройти валидацию при частичном обновлении (только id)', () => {
    const dto = plainToInstance(UpdateSocialLinkInput, { id: validInput.id });
    const errors = validateSync(dto);
    expect(errors).toHaveLength(0);
  });

  it('должен вернуть ошибку, если id пустой', () => {
    const dto = buildDto({ id: '' });
    const errors = validateSync(dto);
    expect(errors.some((e) => e.property === 'id')).toBe(true);
  });

  it('должен вернуть ошибку, если url передан, но невалидный', () => {
    const dto = buildDto({ url: 'invalid' });
    const errors = validateSync(dto);
    expect(errors.some((e) => e.property === 'url')).toBe(true);
  });
});
