import * as bcrypt from 'bcrypt'
import * as crypto from 'crypto'

export async function hashPassword(password: string, saltOrRounds: number=10) {
    const hashed = await bcrypt.hash(password, saltOrRounds);
    return hashed
}

export async function generateToken(prefix?: string, suffix?: string) {
    // Generate a password reset token with a length of 32 bytes (length/2 hex characters)
    let token = await crypto.randomBytes(8).toString('hex');
    if (prefix) {
        token = prefix + token
    }
    if (suffix) {
        token += suffix
    }
    return token
}
