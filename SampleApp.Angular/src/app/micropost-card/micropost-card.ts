import { Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-micropost-card',
 imports: [MatCardModule, MatButtonModule, MatIcon],
  templateUrl: './micropost-card.html',
  styleUrl: './micropost-card.scss',
})
export class MicropostCard {

  public attachImage = input<string>();
  public content = input<string>();
  
  public autorName = input<string>();
  public autorLogin = input<string>();
  public autorAvatar = input<string>();

}
