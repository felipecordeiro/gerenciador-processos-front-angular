import { ProcessoService } from './../../providers/processo.service';
import { Processo } from './../../to/processo';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-finalizador',
  templateUrl: './finalizador.component.html',
  styleUrls: ['./finalizador.component.css']
})
export class FinalizadorComponent implements OnInit {

  view: 'incluir' | 'visualizar' | 'atribuicao'
  processos: Processo[] = []

  constructor(private router: Router,
    private processoService: ProcessoService) { }

  ngOnInit(): void {
    this.view = "visualizar"
    this.carregarProcessos()
  }

  carregarProcessos() {
    this.processoService.getAll().subscribe(res => {
      this.processos = res.filter(obj => obj.pendenteParecer)
    })
  }

  logout() {
    this.router.navigate(['/login'])
  }

}
