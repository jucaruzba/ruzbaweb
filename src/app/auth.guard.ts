import {CanActivate, Router } from '@angular/router';
import { StorageService } from './services/storage.service';
import { UserService } from './services/user.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  token: string | null = this.storageService.getItem('Token');

  constructor(
    private storageService: StorageService,
    private router: Router,
    private userService: UserService
  ) {}

  async canActivate(): Promise<boolean> {
    if (this.token) {
      try {
        const resp = await this.userService.verifyToken(this.token).toPromise();

        if (resp.tokenValid) {
          return true;
        } else {
          this.router.navigate(['/login']);
          return false;
        }
      } catch (error) {
        console.error('Error verifying token:', error);
        this.router.navigate(['/login']);
        return false;
      }
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}