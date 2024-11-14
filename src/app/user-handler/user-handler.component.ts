import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { User } from '../model/user';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserDtoService } from '../service/user-dto.service';

@Component({
  selector: 'app-user-handler',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './user-handler.component.html',
  styleUrl: './user-handler.component.css'
})
export class UserHandlerComponent {

  private http: HttpClient;
  private user: User | null | undefined;
  private router: Router;
  private userDto: UserDtoService;

  constructor(http: HttpClient, router: Router, userDto: UserDtoService) {
    this.http = http;
    this.user = undefined;
    this.router = router;
    this.userDto = userDto;
  }


  loginTry(form: NgForm) {

    let name = form.value.uname;
    let pwd = form.value.pwd;

    let bodyParams = new HttpParams();
    bodyParams = bodyParams.set('uname', name);
    bodyParams = bodyParams.set('pwd', pwd);
    let requestForLogin = this.http.post<User>('http://localhost:8080/game', bodyParams);
    requestForLogin.subscribe((data) => {
      if(data != null) {
        this.user = Object.assign(new User(), data);
        if(this.user.getLifeLeft() > 0) {
          this.userDto.setName(this.user.getName());
          this.userDto.setLifeLeft(this.user.getLifeLeft());
          this.userDto.setRecord(this.user.getRecord());
          this.router.navigate(['/game']);
        }
        else {
          this.router.navigate(['/game/over']);
        }

        
      }
      else {
        this.user = null;
      }
    });

    
  }

  public getUser(): User | null | undefined {
    return this.user;
  }

}
