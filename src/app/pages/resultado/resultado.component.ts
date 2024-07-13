import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-resultado',
  standalone: true,
  imports: [],
  templateUrl: './resultado.component.html',
  styleUrl: './resultado.component.css'
})
export class ResultadoComponent implements OnInit {
  public winner:string;

  constructor(
    private activatedRoute: ActivatedRoute
  ) {
    this.winner = '';
  }

  ngOnInit() {
    this.winner = this.activatedRoute.snapshot.queryParams['winner'] || '';
  }

}
