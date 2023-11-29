import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/data/User';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from '../../../../services/user.service';
import { Route, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav-right',
  templateUrl: './nav-right.component.html',
  styleUrls: ['./nav-right.component.scss']
})
export class NavRightComponent implements OnInit{
  idUser=this.storageService.getItem('idUser');
  user:User
  constructor(
    private storageService:StorageService,
    private userService:UserService,
    private router:Router,
    private autService:AuthService
  ){}
  ngOnInit(): void {
  }

  async cerrarSesion(){
    this.autService.onLogout();
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 1000);
  }
}
