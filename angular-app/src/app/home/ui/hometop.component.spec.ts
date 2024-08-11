import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HometopComponent } from "./hometop.component";

describe("HometopComponent", () => {
  let component: HometopComponent;
  let fixture: ComponentFixture<HometopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HometopComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HometopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
