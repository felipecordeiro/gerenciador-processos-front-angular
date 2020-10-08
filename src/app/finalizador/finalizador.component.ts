import { ProcessoService } from './../../providers/processo.service';
import { Processo } from './../../to/processo';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-finalizador',
  templateUrl: './finalizador.component.html',
  styleUrls: ['./finalizador.component.css']
})
export class FinalizadorComponent implements OnInit {

  view: 'incluir' | 'visualizar'
  processos: Processo[] = []
  processoSave: Processo = new Processo
  form: FormGroup

  constructor(private router: Router,
    private fb: FormBuilder,
    private processoService: ProcessoService) { }

  ngOnInit(): void {
    this.view = "visualizar"
    this.carregarProcessos()
  }

  iniciarForm() {
    this.form = this.fb.group({
      descricaoParecer: [null, Validators.required]
    })
  }

  carregarProcessos() {
    this.processoService.getAll().subscribe(res => {
      this.processos = res.filter(obj => obj.pendenteParecer)
    })
  }

  incluirParecer(processo: Processo){
    this.processoSave = processo
    this.iniciarForm()
    this.view = 'incluir'
  }

  botaoSalvarDescricaoParecer(){
    this.processoSave.descricaoParecer = this.form.get('descricaoParecer').value
    this.processoSave.pendenteParecer = false
    this.processoService.update(this.processoSave).subscribe(res => {

      this.visualizacao()
    }, error => {

    })
  }

  voltar(){
    this.visualizacao()
  }

  visualizacao() {
    this.view = 'visualizar'
    this.carregarProcessos()
  }

  logout() {
    this.router.navigate(['/login'])
  }

}
