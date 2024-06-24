import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, Renderer2, ViewChild, effect, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '@models/Product.model';
import { ProductStore } from '@store/product.store';
import { ModalService } from 'app/shared/components/modal/modal.service';
import { first, last, takeLast } from 'rxjs';

@Component({
  selector: 'app-menu-actions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu-actions.component.html',
  styleUrl: './menu-actions.component.scss'
})
export class MenuActionsComponent {

  private readonly router: Router = inject(Router);
  private readonly modalService: ModalService = inject(ModalService);
  readonly productStroe = inject(ProductStore);
  private readonly renderer: Renderer2 = inject(Renderer2);

  @ViewChild('menuItems') menuItems!: ElementRef;

  @Input() product!: Product;

  toggleActions(): void {
    const elements = document.querySelectorAll('.action-menu__items');
    elements.forEach(element => {
      this.renderer.removeClass(element,'action-menu__items--visible');
    });
    this.renderer.addClass(this.menuItems.nativeElement,'action-menu__items--visible');
  }

  goToEdit(): void {
    this.router.navigate(['products/edit', this.product.id]);
  }

  openModal(event:any){
    event.stopPropagation();
    this.renderer.removeClass(this.menuItems.nativeElement,'action-menu__items--visible');
    this.modalService.openModal({
     title:`¿Estas seguro de eliminar el producto ${this.product.name}?`,
     data: this.product,
     actionConfirm: this.delete.bind(this)
    });
  }

  delete() {
    this.productStroe.delete(this.product)
  }

}
