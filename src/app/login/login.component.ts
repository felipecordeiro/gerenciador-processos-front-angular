import { of } from 'rxjs';
import { concatMap } from 'rxjs/operators';
import { Funcao } from './../../enums/enum-funcao';
import { UsuarioService } from './../../providers/usuario.service';
import { Usuario } from './../../to/usuario';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup

  constructor(private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      login: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  verificaConta() {
    let obs = of(null)
    obs = obs.pipe(
      concatMap(() => {
        return this.verificaUsuarioValidoObservable()
      })
    )
    obs.subscribe((usuario: Usuario) => {
      this.login(usuario)
    }, error => {
      this.form.reset()
      console.log(error)
    })
  }

  verificaUsuarioValidoObservable() {
    return this.usuarioService.verificaUsuarioValido(this.form.get('login').value,
      this.form.get('password').value)
  }

  private login(usuario: Usuario) {
    AppComponent.isLoggedIn = true
    if (usuario.funcao == Funcao.USUARIO_ADMINISTRADOR) {
      this.router.navigate(['/administrador'])
    }
    else if (usuario.funcao == Funcao.USUARIO_TRIADOR) {
      this.router.navigate(['/triador'])
    }
    else if (usuario.funcao == Funcao.USUARIO_FINALIZADOR) {
      this.router.navigate(['/finalizador'])
    }

  }


}
