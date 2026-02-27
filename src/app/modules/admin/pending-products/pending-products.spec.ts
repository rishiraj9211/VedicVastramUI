import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingProducts } from './pending-products';

describe('PendingProducts', () => {
  let component: PendingProducts;
  let fixture: ComponentFixture<PendingProducts>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PendingProducts]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PendingProducts);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
