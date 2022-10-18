import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(private authService: AuthService) { }

  public get isAuth() {
    return this.authService.token;
  }

  public get isAdmin() {
    return this.authService.isAdmin;
  }

  ngOnInit(): void {
  }
    
}
