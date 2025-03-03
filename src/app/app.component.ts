import { Component, effect, inject, Inject, signal, WritableSignal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { Router } from "@angular/router";
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatButtonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Señales';
  $contador: WritableSignal<number> = signal(0);
  router = inject(Router);
  constructor() {
    effect(() => {
      console.log('El contador cambió a:', this.$contador());
    })
  }
  subirContador() {
    this.$contador.update(contadorPrevio => contadorPrevio + 1);
  }
  bajarContador() {
    this.$contador.update(contadorPrevio => contadorPrevio - 1);
  }

  multiplicarContador() {
    this.$contador.update(contadorPrevio => contadorPrevio * 2);
  }
  ng_Gd() {
    this.router.navigate(['/ng-gd']);
  }
  
  candleChart() {
    this.router.navigate(['/candle-chart']);
  }

}
