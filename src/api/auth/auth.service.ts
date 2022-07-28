import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  public validateUser<T extends { id: string }>(data: T) {
    if (data.id === '468489930910203913') return data;
    return null;
  }
}
