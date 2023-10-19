import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PresenceService {

  hubUrl = environment.hubUrl;
  private hubConnection : HubConnection;

  private onlineUserSource = new BehaviorSubject<string[]>([]);
  onlineUsers$ = this.onlineUserSource.asObservable();

constructor(private toster: ToastrService) { 
}


createHubConnection(user : User){
  this.hubConnection = new HubConnectionBuilder()
  .withUrl(this.hubUrl +  'presence', {
    accessTokenFactory : () => user.token
  })
  .withAutomaticReconnect()
  .build();

  this.hubConnection.start()
  .catch(error => console.log(error));

  this.hubConnection.on("UserIsOnline", username => {
    this.toster.success('user is connected.');
    console.log(username + "user is connected");
  });

  this.hubConnection.on("UserIsOffline", username => {
    
    this.toster.error("Member is disconnected");
    console.warn(username + "user is disconnected!")
  });

  this.hubConnection.on("GetOnlineUsers", (usernames : string[]) => {
    debugger
    this.onlineUserSource.next(usernames);
  } )

}

stopHubConnection(){
  this.hubConnection.stop().catch(error => console.error(error));
}


}