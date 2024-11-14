import { RouterModule, Routes } from '@angular/router';
import { UserHandlerComponent } from './user-handler/user-handler.component';
import { NgModel } from '@angular/forms';
import { NgModule } from '@angular/core';
import { GameHandlerComponent } from './game-handler/game-handler.component';
import { GameOverComponent } from './game-over/game-over.component';

export const routes: Routes = [
    {path: '', component: UserHandlerComponent},
    {path: 'game', component: GameHandlerComponent},
    {path: 'game/over', component: GameOverComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModul {}
