import { Injectable, computed, signal } from '@angular/core';
import { BehaviorSubject, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  #showModal = signal<boolean>(false);
  #data = signal<{title?:string, data?:any, actionConfirm?: any}>({});
  #confirm = signal<boolean>(false);
  showModal = computed(this.#showModal);
  data = computed(this.#data);
  confirm = computed(this.#confirm);

  

  openModal(data:{title:string, data?:any, actionConfirm?: any}){
    this.#showModal.set(true);
    this.#data.set(data);
  }

  closeModal(){
    this.#showModal.set(false);
  }

  comfirmAction(){
    this.closeModal();
    this.data().actionConfirm();
  }
}
