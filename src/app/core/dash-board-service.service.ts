import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DashBoardService {

  urlGetPlayerGameData: string = "api/game/get/player";

  constructor(private http: HttpClient) { }


getPlayerGameData(playerId:string): Observable<any> {
  let params = new HttpParams();

  params = params.append('playerId', playerId);

  return this.http.get<any>(this.urlGetPlayerGameData, {
    params: params
  })
    .pipe(
      (map(res => {
        var response: any = res.playerGameDetails;
        return response;
      }
      ))
    );
}

}
