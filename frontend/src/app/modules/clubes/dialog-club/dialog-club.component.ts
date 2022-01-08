import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { stringify } from 'querystring';
import { ClubService } from 'src/app/services/club.service';
import { Club } from 'src/app/shared/entidades/club';

@Component({
  selector: 'app-dialog-club',
  templateUrl: './dialog-club.component.html',
  styleUrls: ['./dialog-club.component.scss']
})
export class DialogClubComponent implements OnInit {

  clubForm: FormGroup;
  club: Club;

  constructor(private clubService:ClubService,
    public dialogRef: MatDialogRef<DialogClubComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Club) { 

      this.clubForm = new FormGroup({
        "id": new FormControl(''),
        "nombre": new FormControl('', Validators.required),
        "direccion": new FormControl('', Validators.required),
        "usuario_entrenador": new FormControl('', Validators.required),
        "federacion_id": new FormControl('')
      })

      this.clubForm.setValue(data);
      this.club = new Club();
    }

  ngOnInit() {
  }

  onSubmit() {
    this.club = this.clubForm.value;
    // se extrae el valor del id
    var id = this.club.id;
    console.log(id);

    // si id está presente entonces estamos editando
    if(id == null || id === "") {
      this.clubService.saveClub(this.club).subscribe(response => {
        console.log("Response save from API:", response);
        this.clubForm.reset({
          "id": "",
          "nombre": "",
          "direccion": "",
          "usuario_entrenador": "",
          "federacion_id": ""
        });
        this.dialogRef.close("Guardado correctamente");
      })
    } else {
      this.clubService.editClub(this.club).subscribe(response => {
        console.log("Response edit from API:", response);
        this.clubForm.reset({
          "id": "",
          "nombre": "",
          "direccion": "",
          "usuario_entrenador": "",
          "federacion_id": ""
        });
        this.dialogRef.close("Editado correctamente");
      })
    }
  }

}
