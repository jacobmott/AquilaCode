import { ComponentFixture, TestBed } from "@angular/core/testing";
import { TopNavSvgComponent } from "./top-nav-svg.component";

describe("TopNavSvgComponent", () => {
  let component: TopNavSvgComponent;
  let fixture: ComponentFixture<TopNavSvgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopNavSvgComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TopNavSvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
