import { AfterViewInit, Component, Renderer2 } from '@angular/core';
import { UserDtoService } from '../service/user-dto.service';
import { User } from '../model/user';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game-handler',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './game-handler.component.html',
  styleUrl: './game-handler.component.css'
})

export class GameHandlerComponent implements AfterViewInit{

  private userDto: UserDtoService;
  private user: User;

  private cells: HTMLCollectionOf<Element>;
  private isLose: number;
  private isWin: boolean | null;
  private clickCounter: number;
  private renderer: Renderer2;
  private http: HttpClient;
  private router: Router;


  constructor(userDto: UserDtoService, renderer: Renderer2, http: HttpClient, router: Router) {

    this.renderer = renderer;
    this.router = router;

    this.userDto = userDto;
    this.user = new User();
    this.user.setName(this.userDto.getName());
    this.user.setLifeLeft(this.userDto.getLifeLeft());
    this.user.setRecord(this.user.getRecord());

    this.cells = document.getElementsByClassName('cell');
    
    this.isLose = 3;
    this.isWin = null;
    this.clickCounter = 0;
    this.http = http;
  }

  ngAfterViewInit(): void {
    
    let randomNrs = this.getRandomNumbers();
    this.isLose = 0;
    this.isWin = false;
    
    this.cells = document.getElementsByClassName('cell');
    this.cells[randomNrs[0]].classList.add('treasure');
    this.cells[randomNrs[1]].classList.add('death');
    this.cells[randomNrs[2]].classList.add('death');

    for(let index = 0; index < this.cells.length; index ++) {

      let currentCell = this.cells[index];

      this.renderer.listen(currentCell, 'click', (event) => {
        this.cellClickHandler(currentCell as HTMLElement);
      });

    }

  }

  

  public getUser(): User {
    return this.user;
  }

  private randomNr() {
    return Math.floor(Math.random() * (this.cells.length - 1));
    
  }

  private getRandomNumbers() {
	
    let numbers = new Array();
    
    
    let treasureIndex = this.randomNr();
    numbers.push(treasureIndex);
    
    
    let deathIndex = this.randomNr();
    while(treasureIndex == deathIndex) {
      deathIndex = this.randomNr();
    }
    numbers.push(deathIndex);
    
    
    let deathIndex2 = this.randomNr();
    while(treasureIndex == deathIndex2 || deathIndex == deathIndex2) {
      deathIndex2 = this.randomNr();
    }
    numbers.push(deathIndex2);
    
    
    return  numbers;
  }

 

  public cellClickHandler(cell: HTMLElement) {


    if(this.isWin == false && this.isLose == 0) {
      this.clickCounter++;
      
      if(cell.classList.contains('treasure')) {
        cell.style.backgroundImage = "URL('https://i.etsystatic.com/40655870/r/il/9934c4/4622155632/il_1140xN.4622155632_4pmz.jpg')";
        this.isWin = true;
        this.restartGame();
      }
      else if(cell.classList.contains('death')) {
        cell.style.backgroundImage = "URL('https://www.militarytrader.com/.image/c_limit%2Ccs_srgb%2Cq_auto:good%2Cw_620/MTY3Mzc5MTgyMzA0MTc1NzI4/image-placeholder-title.webp')";
        this.isLose = 1;
        this.restartGame();
      }
      else {
        cell.style.backgroundColor = "grey";
      }
      
    }
      
  }

  private restartGame() {
	
    let bodyParams = new HttpParams();
    bodyParams = bodyParams.set('name', this.user.getName());
    bodyParams = bodyParams.set('isLost', this.isLose);
    bodyParams = bodyParams.set('count', this.clickCounter);

    let requestForRestart = this.http.post<User>("http://localhost:8080/game/restart", bodyParams);
    requestForRestart.subscribe((data) => {
      this.user = Object.assign(new User(), data);
      if(this.user.getLifeLeft() > 0) {
        this.resetTable();
        this.ngAfterViewInit();
      }
      else {
        this.router.navigate(['/game/over']);
      }
      
    });
    
      
    
      
    
  }

  private resetTable() {

    // Remove Treasure/Death
    let treasure = document.getElementsByClassName('treasure');
    let deaths = document.getElementsByClassName('death');
    treasure[0].classList.remove('treasure');
    deaths[0].classList.remove('death');
    deaths[0].classList.remove('death');

    // Remove style
    for(let index = 0; index < this.cells.length; index++) {

      let currentCell = this.cells[index] as HTMLElement;
      currentCell.style.removeProperty("background-color");
      currentCell.style.removeProperty("background-image");
    }
    
  }



  
	
}
