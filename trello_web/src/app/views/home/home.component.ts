import { Component, OnInit } from '@angular/core';
import { UtilsService } from 'src/app/services/utils.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Lista } from 'src/app/models/lista.model';
import { Card } from 'src/app/models/card';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

// @Author Ismael Alves
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  dataCards: Card[]
  card: Card
  lista: Lista

  // Forms
  formCard: FormGroup = new FormGroup({
    "nome": new FormControl(null, [Validators.required])
  })
  formCardEdit: FormGroup = new FormGroup({
    "nome": new FormControl(null, [Validators.required])
  })
  formLista: FormGroup = new FormGroup({
    "nome": new FormControl(null, [Validators.required])
  })
  formListaEdit: FormGroup = new FormGroup({
    "nome": new FormControl(null, [Validators.required])
  })

  constructor(
    private spinner: NgxSpinnerService,
    private utilsS: UtilsService
  ) {

  }

  ngOnInit() {
    this.spinner.show()
    this.utilsS.getGenericAll<Card>("/card").subscribe((data: any) => {
      this.dataCards = data.items
      this.dataCards.forEach((item) => {
        this.utilsS.getGenericAll<Lista>(`/lista/${item.id}/card`).subscribe((lista: any) => {
          item
          item.listas = lista.items
        })
      })
      this.dataCards.push(new Card())
      this.spinner.hide();
    }, (e: any) => {
      this.dataCards = []
      this.dataCards.push(new Card())
      if(e.status == 500){
        Swal.fire(
          'Error',
          'Ops! Aperece que não obtivemos a conexão com o servidor contate o suporte !!!',
          'error'
        )
      }
      this.spinner.hide();
    })
  }

  drop(event: CdkDragDrop<Lista[]>, id: number) {
    moveItemInArray(this.dataCards[id].listas, event.previousIndex, event.currentIndex);
  }

  changerEditCard(card: Card) {
    if (card.view) {
      card.view = false
      this.formCardEdit.reset()
      this.card = null
    } else {
      card.view = true
      this.card = card
      this.formCardEdit.get('nome').setValue(card.nome)
    }
  }

  changerEditLista(lista: Lista) {
    if (lista.view) {
      lista.view = false
      this.formListaEdit.reset()
      this.lista = null
    } else {
      lista.view = true
      this.lista = lista
      this.formListaEdit.get('nome').setValue(lista.nome)
    }
  }

  // metodo que edita o card
  editCard() {
    if (this.formCardEdit.valid) {
      const data = this.formCardEdit.value
      Swal.fire({
        title: `Tem certeza que deseja editar o card ${data.nome}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sim',
        cancelButtonText: 'Cancelar'
      }).then(result => {
        if (result.value) {
          this.utilsS.putGeneric(`/card/${this.card.id}`, data).subscribe(() => {
            Swal.fire({
              html: "<p>Card editado com sucesso!</p>",
              icon: 'success',
            }).then(() => {
              window.location.reload()
            })
          }, (e) => {
            Swal.fire(
              'Error',
              'Ops! Aconteceu algo inesperado !!!',
              'error'
            )
          })
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire(
            'Cancelado',
            'Ops! Foi quase :)',
            'error'
          )
        }
      })
    }
  }

  // metodo que adiconar o card
  addCard() {
    if (this.formCard.valid) {
      const data = this.formCard.value
      Swal.fire({
        title: `Tem certeza que deseja adicionar o card ${data.nome}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sim',
        cancelButtonText: 'Cancelar'
      }).then(result => {
        if (result.value) {
          this.utilsS.postDataGeneric(`/card`, data).subscribe(() => {
            Swal.fire({
              html: "<p>Card adicionar com sucesso!</p>",
              icon: 'success',
            }).then(() => {
              window.location.reload()
            })
          }, (e) => {
            Swal.fire(
              'Error',
              'Ops! Aconteceu algo inesperado !!!',
              'error'
            )
          })
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire(
            'Cancelado',
            'Ops! Foi quase :)',
            'error'
          )
        }
      })
    }
  }

  // metodo que deleta o card
  delCard(data: Card) {
    if(data.listas.length > 0){
      Swal.fire(
        'Cancelado',
        'Ops! você precisa retirar as tarefas do card antes :)',
        'error'
      )
    }else{
      Swal.fire({
        title: `Tem certeza que deseja remover o card ${data.nome}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sim',
        cancelButtonText: 'Cancelar'
      }).then(result => {
        if (result.value) {
          this.utilsS.delGeneric(`/card/${data.id}`).subscribe(() => {
            Swal.fire({
              html: "<p>Card removido com sucesso!</p>",
              icon: 'success',
            }).then(() => {
              window.location.reload()
            })
          }, (e) => {
            Swal.fire(
              'Error',
              'Ops! Aconteceu algo inesperado !!!',
              'error'
            )
          })
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire(
            'Cancelado',
            'Ops! Foi quase :)',
            'error'
          )
        }
      })
    }
    
  }

  // metodo que edita a lista
  editLista() {
    if (this.formListaEdit.valid) {
      const data = this.formListaEdit.value
      Swal.fire({
        title: `Tem certeza que deseja editar a tarefa ${data.nome}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sim',
        cancelButtonText: 'Cancelar'
      }).then(result => {
        if (result.value) {
          this.utilsS.putGeneric(`/lista/${this.lista.id}`, data).subscribe(() => {
            Swal.fire({
              html: "<p>Tarefa editado com sucesso!</p>",
              icon: 'success',
            }).then(() => {
              window.location.reload()
            })
          }, (e) => {
            Swal.fire(
              'Error',
              'Ops! Aconteceu algo inesperado !!!',
              'error'
            )
          })
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire(
            'Cancelado',
            'Ops! Foi quase :)',
            'error'
          )
        }
      })
    }
  }

  // metodo que adiconar o lista
  addLista(card: Card) {
    if (this.formLista.valid) {
      const data = this.formLista.value
      Swal.fire({
        title: `Tem certeza que deseja adicionar a tarefa ${data.nome}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sim',
        cancelButtonText: 'Cancelar'
      }).then(result => {
        if (result.value) {
          this.utilsS.postDataGeneric(`/lista/${card.id}`, data).subscribe(() => {
            Swal.fire({
              html: "<p>Tarefa adicionada com sucesso!</p>",
              icon: 'success',
            }).then(() => {
              window.location.reload()
            })
          }, (e) => {
            Swal.fire(
              'Error',
              'Ops! Aconteceu algo inesperado !!!',
              'error'
            )
          })
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire(
            'Cancelado',
            'Ops! Foi quase :)',
            'error'
          )
        }
      })
    }
  }

  // metodo que deleta o card
  delLista(data: Lista) {
    Swal.fire({
      title: `Tem certeza que deseja remover a terefa ${data.nome}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if (result.value) {
        this.utilsS.delGeneric(`/lista/${data.id}`).subscribe(() => {
          Swal.fire({
            html: "<p>Terefa removida com sucesso!</p>",
            icon: 'success',
          }).then(() => {
            window.location.reload()
          })
        }, (e) => {
          Swal.fire(
            'Error',
            'Ops! Aconteceu algo inesperado !!!',
            'error'
          )
        })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelado',
          'Ops! Foi quase :)',
          'error'
        )
      }
    })
  }

} 
