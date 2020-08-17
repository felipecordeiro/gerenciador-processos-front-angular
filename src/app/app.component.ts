import { UsuarioService } from '../providers/usuario.service';
import { Usuario } from '../to/usuario';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'gerenciador-processos-front-angular';
  
  static isLoggedIn: boolean = false

  constructor(){

  }

  ngOnInit(): void {
    
  }
  
}
