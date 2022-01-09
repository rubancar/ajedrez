import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Club } from '../shared/entidades/club';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClubService {

  clubes$: BehaviorSubject<Club[]>;
  clubes: Array<Club> = [];

  constructor(private http: HttpClient) { 
    this.clubes$ = new BehaviorSubject([]);
    this.clubes = [];
  }

  getClubes(): Observable<any> {
    return this.http.get<any>("/api/club/").pipe(
      tap(response => {
        this.clubes$.next(response);
      })
    );
  }

  editClub(club: Club): Observable<any> {
    const club_id = club.id;
    console.log(club_id);
    return this.http.put<any>(`/api/club/${club_id}`, club)
  }

  saveClub(club: Club): Observable<any> {
    return this.http.post<any>("/api/club/", club)
  }

  removeClub(club: Club): void {
    console.log(club);
  }
}
