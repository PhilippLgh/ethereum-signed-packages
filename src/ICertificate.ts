import { IEthJWK } from "./jwk"

export const REGISTERED_SERVICES = {
  'GITHUB': 'github'
}

export const CERT_TYPE = {
  "PUBLIC_KEY": 1,
  "CODE_SIGN": 3
}

export  const IDENTITY_TYPE = {
  "ADDRESS": 1,
  "EMAIL": 2,
  // git services range: 200-300
  "GITHUB": 200,
  "GITLAB": 201
}

export interface IEthKeyShort {
  address: string,
  alg: string // TODO oneOf
}

export interface ISubjectInfo {
  name: string, // || 'ANON'
  org?: string,
  email: string,
}

export interface ICsrOptions {
  csrType: number // oneOf IDENTITY_TYPE
}

export interface IIdentityInfo {
  "entropy"?: string,
  "name": string, // service name: oneOf REGISTERED_SERVICES
  "username": string
}

// can be used to verify client-side
export interface ICertProof { 

}

// The digital certificate is a common credential that provides a means to verify identity.
// It associates an identity with a public key and / or claims
export interface ICertificatePayload {

  // versioning block:
  version: number,
  jti: string, // jwt

  typ: number, // custom: oneOf CERT_TYPE

  // issuer block:
  iss: string, // jwt uri || 'self'

  // validity block:
  iat: number, // jwt : date
  exp?: number, // jwt : date
  nbf?: number, // jwt : date

  // subject block: this block needs to be validated by the CA
  id_typ: number, // custom oneOf IDENTITY_TYPE
  sub: string, // jwt identifier
  subject?: ISubjectInfo, // custom
  service?: IIdentityInfo,

  // key block
  key: IEthJWK | IEthKeyShort

  // 
  proof? : ICertProof

}
