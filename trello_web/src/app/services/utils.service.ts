import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, Observer } from 'rxjs';
import { environment } from 'src/environments/environment';
import { filter, map } from 'rxjs/operators';
import { Lista } from '../models/lista.model';
import { Hateoas } from '../models/hateoas.model';

// @Author Ismael Alves
@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  private sharedData: Subject<any> = new Subject<any>();

  constructor(private http: HttpClient) { }

  // metodo que pega rota ativa obs temporaria
  static getRouter(): string {
    return localStorage.getItem('router');
  }

  // metodo que seta a rota ativa obs temporaria
  static setRouter(router: string) {
    localStorage.setItem('router', router);
  }

  // metodo que seta dados no localStorage
  static setLocalStorageData(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  // metodo que pega dados no localStorage
  static getLocalStorageData(key: string) {
    return JSON.parse(localStorage.getItem(key));
  }

  // metodo que pega remove dados no localStorage
  static removeLocalStorageData(key: string) {
    return localStorage.removeItem(key);
  }

  // metodo que pega limpa localStorage
  static clearLocalStorage() {
    localStorage.clear();
  }

  // metodo que pega dynamicamente os parametro da rota
  static sortParamters(router: string) {
    const queryParams = router.split('?')[1];
    if (queryParams !== undefined) {
      const params = queryParams.split('&');
      let pair = null;
      const data = {};
      params.forEach((d) => {
        pair = d.split('=');
        data[`${pair[0]}`] = pair[1];
      });
      return data;
    } else {
      return null;
    }
  }

  // metodo que tranforma image em base64
  static onFileBase64(event: any): Promise<string[]> {
    return new Promise((resolve, reject) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          resolve([btoa(e.target.result.toString()), '.' + file.type.split('/')[1]]);
        };
        reader.readAsBinaryString(file);
      } else {
        reject(['error ao converter']);
      }
    });
  }

  // metodo que tranforma base64 em Blob
  static convertBase64InBlob(base64: string, type: string = 'image/jpeg'): Observable<Blob> {
    return new Observable((observer: Observer<Blob>) => {
      try {
        const byteString: string = window.atob(base64.replace(/^data:image\/(png|jpeg|jpg);base64,/, ''));
        const arrayBuffer: ArrayBuffer = new ArrayBuffer(byteString.length);
        const int8Array: Uint8Array = new Uint8Array(arrayBuffer);
        for (let i = 0; i < byteString.length; i++) {
          int8Array[i] = byteString.charCodeAt(i);
        }
        const blob = new Blob([int8Array], { type });
        observer.next(blob);
        observer.complete();
      } catch (error) {
        observer.error(error);
        observer.complete();
      }
    });
  }

  // metodo que tranforma base64 em File
  static converttBase64InFile(base64: string, type: string = 'image/jpeg', extension: string = '.jpeg'): Observable<File> {
    return new Observable((observer: Observer<File>) => {
      UtilsService.convertBase64InBlob(base64, type).subscribe(
        (blob: Blob) => {
          const imageBlob: Blob = blob;
          const imageName: string = UtilsService.generateName() + extension;
          observer.next(new File([imageBlob], imageName, { type}));
          observer.complete();
        },
        (e) => {
          observer.error(e);
          observer.complete();
        }
      );
    });
  }

  // gerador de nome
  static generateName(): string {
    const date: number = new Date().valueOf();
    let text = '';
    const possibleText =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 5; i++) {
      text += possibleText.charAt(
        Math.floor(Math.random() * possibleText.length)
      );
    }
    return date + '.' + text;
  }

  static removeDuplicates<T>(array:T[], key:string){
    let lookup = new Set()
    return array.filter( obj => !lookup.has(obj[key]) && lookup.add(obj[key]))
  }

  // metodo que pega os dados por id
  getGenericById<T>(path: string) {
    const header = new HttpHeaders().set('authorization', `teste`);
    const url = environment.BASE_URL + path;
    return this.http.get<T>(url, {headers: header});
  }

  // metodo que paga todos os dados
  getGenericAll<T>(path: string) {
    const header = new HttpHeaders().set('authorization', `teste`);
    const url = environment.BASE_URL + path;
    return this.http.get(url, {headers: header}).pipe(
      map((resp: any) => {
        if (resp._links) {
          return {
            _links: new Hateoas(resp._links),
            items: new Array<T>(...resp.items)
          };
        }
        return {
          items: new Array<T>(...resp.items)
        };
      })
    );
  }

  // metodo que pega os dados por id
  postDataGeneric<T>(path:string, data?: any) {
    const header = new HttpHeaders().set('authorization', `teste`);
    const url = environment.BASE_URL+path;
    const body = new FormData();
    if (data) {
      Object.keys(data).forEach(key => {
        body.append(key, data[key]);
      });
    }
    return this.http.post<T>(url, body, {headers: header});
  }

  // metodo que manda os dados para alguma requisição
  putGeneric<T>(path: string, data: any) {
    const header = new HttpHeaders().set('authorization', `teste`);
    const url = environment.BASE_URL + path;
    const body = new FormData();
    Object.keys(data).forEach(key => {
      body.append(key, data[key]);
    });
    return this.http.put<T>(url, body, {headers: header});
  }

  // metodo que manda os dados para alguma requisição
  delGeneric(path: string) {
    const header = new HttpHeaders().set('authorization', `teste`);
    const url = environment.BASE_URL + path;
    return this.http.delete(url, {headers: header});
  }

  // metodo que pega dados genericos compatilhados entre os componets
  getSharedData<T>(action: string): Observable<T> {
    return this.sharedData.asObservable().pipe(
      filter(x => x.action === action),
      map((resp) => {
       return resp.payload;
    }));
  }

  // metodo que coloca dados genericos compatilhados entre os componets
  setSharedData<T>(action: string, payload: T) {
    this.sharedData.next({action, payload});
  }

}
