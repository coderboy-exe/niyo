import { hashPassword, generateToken } from './helpers';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';

describe('Utils', () => {
  describe('hashPassword', () => {
    it('should hash a password', async () => {
      const password = 'password';
      const hashedPassword = await hashPassword(password);
      
      const isMatch = await bcrypt.compare(password, hashedPassword);
      expect(isMatch).toBe(true);
    });
  });

  describe('generateToken', () => {
    it('should generate a token', async () => {
      const token = await generateToken();
      expect(token).toHaveLength(16);
    });

    it('should generate a token with prefix', async () => {
      const token = await generateToken('prefix-');
      expect(token.startsWith('prefix-')).toBe(true);
    });

    it('should generate a token with suffix', async () => {
      const token = await generateToken(undefined, '-suffix');
      expect(token.endsWith('-suffix')).toBe(true);
    });

    it('should generate a token with prefix and suffix', async () => {
      const token = await generateToken('prefix-', '-suffix');
      expect(token.startsWith('prefix-')).toBe(true);
      expect(token.endsWith('-suffix')).toBe(true);
    });
  });
});
