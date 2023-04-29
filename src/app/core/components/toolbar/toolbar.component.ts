import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user/user.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  loading = false;

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  isLogged() {
    return this.userService.isLogged();
  }

  logout() {
    this.loading = true;
    this.userService.logoutUser().subscribe(() => {
      localStorage.removeItem('user');
      this.loading = false;
      window.location.replace('/');
    }, err => {
      localStorage.removeItem('user');
      this.loading = false;
      window.location.replace('/login');
    });
  }

}
