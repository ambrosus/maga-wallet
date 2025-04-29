import { delay } from '@utils/delay';

describe('delay', () => {
  it('should resolve after the specified time', async () => {
    const start = Date.now();
    await delay(100);
    const end = Date.now();
    expect(end - start).toBeGreaterThanOrEqual(100);
  });
});
