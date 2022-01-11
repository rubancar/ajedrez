import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { PartidasService } from 'src/app/services/partidas.service';
import { TorneoService } from 'src/app/services/torneo.service';
import { Torneo } from 'src/app/shared/entidades/torneo';

@Component({
  selector: 'app-detalle-torneo',
  templateUrl: './detalle-torneo.component.html',
  styleUrls: ['./detalle-torneo.component.scss']
})
export class DetalleTorneoComponent implements OnInit {

  id : string | null = '';
  torneo: Torneo;
  partidasService: any;
  serviceSubscribe: Subscription;
  dataSource: any;

  constructor(private route : ActivatedRoute,
              private torneoService : TorneoService,
              partidasService: PartidasService,
              public dialogo: MatDialog,
    ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.torneoService.getTorneo(this.id).subscribe((resp:any) => {
        this.torneo = new Torneo();
        this.torneo.id = resp.id;
        this.torneo.sede = resp.sede;
        console.log("la sede: " + this.torneo.sede);
      });
      this.serviceSubscribe = this.partidasService.getPartidas().subscribe(res => {
        this.dataSource.data = res;
        console.log("las partidas", res)
      })
    }
  }

  

  // this.serviceSubscribe = this.partidasService.getPartidas().subscribe(res => {
  //   console.log("the data-array", res);
  //   this.dataSource.data = res;
  // })

}
