import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuActionsComponent } from './menu-actions.component';
import { provideHttpClient } from '@angular/common/http';
import { of } from 'rxjs';

describe('MenuActionsComponent', () => {
  let component: MenuActionsComponent;
  let fixture: ComponentFixture<MenuActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuActionsComponent],
      providers: [provideHttpClient()],
    }).compileComponents();

    fixture = TestBed.createComponent(MenuActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('delete', () => {
    const spy = spyOn(
      (component as any).productStroe,
      'delete'
    ).and.returnValue(of(true));
    component.product = {
      id: '123',
      name: 'qweqweasdasd',
      description: 'qweqweqweqwe',
      logo: 'https://miro.medium.com/v2/resize:fit:786/format:webp/1*3c8q-1H2UBaSO9Z-Lmq4Bg.png',
      date_release: '2024-06-23',
      date_revision: '2025-06-23',
    };
    component.delete();
    expect(spy).toHaveBeenCalledWith(component.product);
  });

  it('should goToEdit', () => {
    const spy = spyOn(
      (component as any).router,
      'navigate'
    ).and.returnValue(of(true));
    component.product = {
      id: '123',
      name: 'qweqweasdasd',
      description: 'qweqweqweqwe',
      logo: 'https://miro.medium.com/v2/resize:fit:786/format:webp/1*3c8q-1H2UBaSO9Z-Lmq4Bg.png',
      date_release: '2024-06-23',
      date_revision: '2025-06-23',
    };
    component.goToEdit();

    expect(spy).toHaveBeenCalledWith(['products/edit', component.product.id]);
  });

  it('should openModal', () => {
    const eventoMock = { stopPropagation: jasmine.createSpy() };
    component.product = {
      id: '123',
      name: 'qweqweasdasd',
      description: 'qweqweqweqwe',
      logo: 'https://miro.medium.com/v2/resize:fit:786/format:webp/1*3c8q-1H2UBaSO9Z-Lmq4Bg.png',
      date_release: '2024-06-23',
      date_revision: '2025-06-23',
    };
    component.openModal(eventoMock);
    expect(eventoMock.stopPropagation).toHaveBeenCalled();
  });

  it('should toggleActions', () => {
    const rendererMock = { addClass: jasmine.createSpy(), removeClass: jasmine.createSpy() };
    (component as any).renderer = rendererMock;
    component.menuItems = { nativeElement: {} };
    component.toggleActions();
    expect(rendererMock.addClass).toHaveBeenCalledWith(component.menuItems.nativeElement, 'action-menu__items--visible');
  });
});
