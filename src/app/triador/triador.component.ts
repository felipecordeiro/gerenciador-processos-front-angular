import { ProcessoService } from './../../providers/processo.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Usuario } from 'src/to/usuario';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/providers/usuario.service';
import { Processo } from 'src/to/processo';
import { Funcao } from 'src/enums/enum-funcao';

@Component({
  selector: 'app-triador',
  templateUrl: './triador.component.html',
  styleUrls: ['./triador.component.css']
})
export class TriadorComponent implements OnInit {

  usuariosFinalizador: Usuario[] = []
  processos: Processo[] = []
  form: FormGroup
  view: 'incluir' | 'visualizar'

  constructor(private router: Router,
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private processoService: ProcessoService) { }

  ngOnInit(): void {
    this.visualizacao()

  }

  private buscaUsuariosFinalizador() {
    this.usuarioService.getAll().subscribe((res: Usuario[]) => {
      this.usuariosFinalizador = res.filter(obj => obj.funcao == Funcao.USUARIO_FINALIZADOR)
    })
  }

  private buscaProcessos(){
    this.processoService.getAll().subscribe((res: Processo[]) => {
      this.processos = res
      this.processos.forEach(obj => {
        obj.pendenteParecerString = obj.pendenteParecer ? 'Sim' : 'Não'
        if (obj.usuarios && obj.usuarios.length > 0){
          obj.nomeUsuarios = ''
          obj.nomeUsuarios += obj.usuarios.map(obj => obj.nome)
        }
      })
    })
  }

  inclusao() {
    this.view = 'incluir'
    this.iniciarForm()

  }

  visualizacao() {
    this.view = 'visualizar'
    this.buscaProcessos()
  }

  voltar() {
    this.visualizacao()
  }

  incluirParecerChange(){
    if (this.form.get('pendenteParecer').value == 'S'){
      this.buscaUsuariosFinalizador()
      this.form.get('usuarios').setValidators(Validators.required)
    }else {
      this.form.get('usuarios').setValidators(null)
    }
    this.form.get('usuarios').updateValueAndValidity()
  }

  usuarioChange(valor){
    console.log(valor)
  }

  private iniciarForm() {
      this.form = this.fb.group({
        id: [null],
        titulo: [null, Validators.required],
        descricao: [null, Validators.required],
        pendenteParecer: [null, Validators.required],
        usuarios: [null]
      })
    this.form.get('id').disable()
  }

  botaoSalvar() {
    let request = null
    let processo: Processo = new Processo
    processo.titulo = this.form.get('titulo').value
    processo.descricao = this.form.get('descricao').value
    processo.pendenteParecer = true
    processo.usuarios = this.form.get('usuarios').value
    request = this.processoService.create(processo)
    
    request.subscribe(() => {
      this.form.reset()
      this.voltar()
    })
  }

  logout(){
    this.router.navigate(['/login'])
  }

}
