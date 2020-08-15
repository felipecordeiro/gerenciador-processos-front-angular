import { UsuarioService } from './../../providers/usuario.service';
import { Usuario } from './../../to/usuario';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup
  usuarios: Usuario[] = [];

  constructor(private fb: FormBuilder,
    public crudService: UsuarioService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      login: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  verificaConta() {
    this.crudService.getAll().subscribe((data: Usuario[]) => {
      console.log(data);
      this.usuarios = data;
      if (this.usuarios.find(obj => obj.login == this.form.get('login').value &&
        obj.password == this.form.get('password').value)) {
        console.log(true)
      }
      else {
        console.log(false)
      }
    }, error => {
      console.log(error)
    })
  }


}
