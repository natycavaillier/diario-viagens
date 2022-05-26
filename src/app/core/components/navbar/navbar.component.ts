import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(private authService: AuthService) {}

  logged$?: Observable<any>;

  logout() {
    this.authService.logout('/login').subscribe();
  }

  ngOnInit(): void {
    this.logged$ = this.authService.logged;
  }
}
