import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ConnectionService } from 'ng-connection-service';
import { UtilsService } from './services/utils.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(
    private connectionService: ConnectionService,
    private router: Router,
    private toastr: ToastrService
  ){
    this.connectionService.monitor().subscribe((isConnected) => {
      if (isConnected != null) {
        if (isConnected) {
          this.router.navigate([UtilsService.getRouter()]);
          this.toastr.info('Conexão restabelecida');
        } else {
          if (this.router.url !== '/internet') {
            UtilsService.setRouter(this.router.url);
          }
          this.toastr.warning('Você está sem internet :(').onShown.subscribe(() => {
            this.router.navigate(['/internet']);
          });
        }
      }
    });
  }
  
  ngOnInit(){
    // Lock inspect
    document.addEventListener('contextmenu', (e) => {
      if (!environment.INSPECT) {
        e.preventDefault();
        document.onkeydown = (keyDown) => {
          if (keyDown.keyCode === 123) {
            return false;
          }
          if (keyDown.ctrlKey && keyDown.shiftKey && keyDown.keyCode === 'I'.charCodeAt(0)) {
            return false;
          }
          if (keyDown.ctrlKey && keyDown.shiftKey && keyDown.keyCode === 'C'.charCodeAt(0)) {
            return false;
          }
          if (keyDown.ctrlKey && keyDown.shiftKey && keyDown.keyCode === 'J'.charCodeAt(0)) {
            return false;
          }
          if (keyDown.ctrlKey && keyDown.keyCode === 'U'.charCodeAt(0)) {
            return false;
          }
        };
      }
    });
  }
}
