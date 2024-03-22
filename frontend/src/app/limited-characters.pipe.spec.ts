import { LimitedCharactersPipe } from './limited-characters.pipe';

describe('LimitedCharactersPipe', () => {
  it('create an instance', () => {
    const pipe = new LimitedCharactersPipe();
    expect(pipe).toBeTruthy();
  });
});
