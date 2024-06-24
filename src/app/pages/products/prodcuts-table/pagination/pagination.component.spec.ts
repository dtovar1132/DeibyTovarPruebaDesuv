import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginationComponent } from './pagination.component';
import { provideHttpClient } from '@angular/common/http';
import { of } from 'rxjs';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginationComponent],
      providers: [provideHttpClient()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should setPerpage', () => {
    component.perPage = 5;
    const spy = spyOn((component as any).productStroe, 'setPerPaget').and.returnValue(
      of(true)
    );
    component.setPerpage();
    expect(spy).toHaveBeenCalledWith(5);
  });

  it('should getPage', () => {
    component.getPage();
    component.page = -1;
    component.getPage();
    expect(component.page).toBe(0);
  });

});
