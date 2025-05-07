import { Passkey } from 'react-native-passkey';
import { createHash } from 'sha256-uint8array';
import * as uuid from 'uuid';
import { Buffer } from 'buffer';

const RPID = 'zippy-daffodil-78a820.netlify.app';

// Needs to return a base64-encoded string
function getChallengeFromPayload(payload: string): string {
  const hexString = createHash().update(payload).digest('hex');
  const hexBuffer = Buffer.from(hexString, 'utf8');
  return hexBuffer.toString('base64');
}

// Function to return 32 random bytes encoded as hex
// (e.g "5e4c2c235fc876a9bef433506cf596f2f7db19a959e3e30c5a2d965ec149d40f")
// This function doesn't return strong cryptographic randomness (Math.random is a PRNG), but this is good enough for registration challenges.
// If the challenge was not random at all the risk is that someone can replay a previous signature to register an authenticator they don't own.
// However:
// - we are creating a brand new authenticator here, which means keygen is happening right as we call this library (which makes the replay attack hard-to-impossible)
// - even if a replay attack went through, the authenticator wouldn't be usable given Turnkey has anti-replay in place in activity payloads (timestamp field)
// Generating challenges with Math.random lets us avoid a dependency on webcrypto/polyfills.
export function getRandomChallenge(): string {
  const randomHexChars: string[] = [];
  const hexChars = [
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    'a',
    'b',
    'c',
    'd',
    'e',
    'f'
  ];

  for (let i = 0; i < 64; i++) {
    randomHexChars.push(hexChars[Math.floor(Math.random() * 16)]!);
  }
  return randomHexChars.join('');
}

export const handlePasskeyAuth = async () => {
  return await Passkey.get({
    challenge: getChallengeFromPayload('hello'),
    allowCredentials: [],
    timeout: 1800000,
    userVerification: 'required',
    rpId: RPID
  });
};

export const handleCreatePasskey = async () => {
  return await Passkey.create({
    challenge: getChallengeFromPayload('hello'),
    rp: {
      name: 'Maga Wallet',
      id: RPID
    },
    user: {
      id: uuid.v4(),
      name: 'Maga Wallet',
      displayName: 'Maga Wallet'
    },
    timeout: 1800000,
    attestation: 'none',
    excludeCredentials: [],
    authenticatorSelection: {
      authenticatorAttachment: 'platform',
      requireResidentKey: true,
      residentKey: 'required',
      userVerification: 'required'
    },
    // All algorithms can be found here: https://www.iana.org/assignments/cose/cose.xhtml#algorithms
    // We only support ES256 and RS256, which are listed below
    pubKeyCredParams: [
      {
        type: 'public-key',
        alg: -7
      },
      {
        type: 'public-key',
        alg: -257
      }
    ]
  });
};
