import { TestBed } from '@angular/core/testing';

import { ModalService } from './modal.service';

describe('ModalService', () => {
  let service: ModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should close modal', () => {
    service.closeModal();
    expect(service.showModal()).toBeFalse();
  });

  it('should comfirmAction modal', () => {
    service.openModal({title:'test',data:{}, actionConfirm: jasmine.createSpy()})
    service.comfirmAction();
    expect(service.showModal()).toBeFalse();
  });
});
