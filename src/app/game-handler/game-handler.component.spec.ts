import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameHandlerComponent } from './game-handler.component';

describe('GameHandlerComponent', () => {
  let component: GameHandlerComponent;
  let fixture: ComponentFixture<GameHandlerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameHandlerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameHandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
