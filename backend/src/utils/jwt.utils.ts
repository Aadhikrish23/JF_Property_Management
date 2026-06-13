import crypto from 'crypto';

const JWT_SECRET = process.env.JWT_SECRET || 'demo-secret-key-for-jwt-signing-12345';

function base64url(str: string | Buffer): string {
  const base64 = typeof str === 'string' ? Buffer.from(str).toString('base64') : str.toString('base64');
  return base64.replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
}

export function sign(payload: object, expiresInSec: number = 86400): string {
  const header = { alg: 'HS256', typ: 'JWT' };
  const exp = Math.floor(Date.now() / 1000) + expiresInSec;
  const payloadWithExp = { ...payload, exp };
  
  const headerEncoded = base64url(JSON.stringify(header));
  const payloadEncoded = base64url(JSON.stringify(payloadWithExp));
  
  const signature = crypto.createHmac('sha256', JWT_SECRET)
    .update(headerEncoded + '.' + payloadEncoded)
    .digest();
    
  return `${headerEncoded}.${payloadEncoded}.${base64url(signature)}`;
}

export function verify(token: string): any {
  const [header, payload, signature] = token.split('.');
  if (!header || !payload || !signature) throw new Error('Invalid token');
  
  const expectedSignature = base64url(crypto.createHmac('sha256', JWT_SECRET)
    .update(header + '.' + payload)
    .digest());
    
  if (signature !== expectedSignature) throw new Error('Invalid signature');
  
  const decodedPayload = JSON.parse(Buffer.from(payload.replace(/-/g, '+').replace(/_/g, '/'), 'base64').toString());
  
  if (decodedPayload.exp && decodedPayload.exp < Math.floor(Date.now() / 1000)) {
    throw new Error('Token expired');
  }
  
  return decodedPayload;
}
