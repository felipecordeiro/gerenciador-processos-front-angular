import { Usuario } from './../../to/usuario';
import { UsuarioService } from './../../providers/usuario.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.css']
})
export class AdministradorComponent implements OnInit {

  usuarios: Usuario[] = []
  form: FormGroup
  view: 'incluir' | 'atualizar' | 'visualizar'
  visaoAtualizar: boolean = false
  visaoVisualizar: boolean = false

  constructor(private router: Router,
    private fb: FormBuilder,
    private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.visualizacao()

  }

  private buscaUsuarios() {
    this.usuarioService.getAll().subscribe((res: Usuario[]) => {
      this.usuarios = res
    })
  }

  inclusao() {
    this.view = 'incluir'
    this.iniciarForm()

  }

  atualizacao(usuario: Usuario) {
    this.view = 'atualizar'
    this.iniciarForm(usuario)
  }

  visualizacao() {
    this.view = 'visualizar'
    this.buscaUsuarios()
  }

  exclusao(id: number) {
    this.usuarioService.delete(id).subscribe(() => {
      this.buscaUsuarios()
    })
  }

  voltar() {
    this.visualizacao()
  }


  private iniciarForm(usuario?: Usuario) {
    if (usuario) {
      this.form = this.fb.group({
        id: [usuario.id],
        login: [usuario.login, Validators.required],
        password: [usuario.password, Validators.required],
        nome: [usuario.nome, Validators.required],
        funcao: [usuario.funcao, Validators.required]
      })
    }
    else {
      this.form = this.fb.group({
        id: [''],
        login: ['', Validators.required],
        password: ['', Validators.required],
        nome: ['', Validators.required],
        funcao: ['', Validators.required]
      })
    }
    this.form.get('id').disable()
  }

  botaoSalvar() {
    let request = null
    let usuario: Usuario = new Usuario
    usuario.login = this.form.get('login').value
    usuario.password = this.form.get('password').value
    usuario.nome = this.form.get('nome').value
    usuario.funcao = this.form.get('funcao').value
    if (this.view == 'incluir') {
      request = this.usuarioService.create(usuario)
    }
    else if (this.view == 'atualizar') {
      usuario.id = this.form.get('id').value
      request = this.usuarioService.update(usuario)
    }
    request.subscribe(() => {
      this.form.reset()
      this.voltar()
    })
  }

  logout(){
    this.router.navigate(['/login'])
  }


}
