import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FruitDetailComponent } from '../fruit-detail/fruit-detail.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpService } from 'src/app/app.service';
import {  FormControl } from '@angular/forms'
import { switchMap, startWith, debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { of, Observable, Subject } from 'rxjs';

interface Country {
  name: string;
  flag: string;
  area: number;
  population: number;
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  searchTerm = new FormControl();
  imagePath = "assets/images/Resources/Screen3/";
  fruitList: any = [];
  filteredFruits: any = [];

  constructor(private http: HttpClient,
    private modalService: NgbModal,
    private httpService: HttpService,
    private cdf : ChangeDetectorRef) {
      
  }

  async ngOnInit() {
    await this.getFruitList();
    this.searchFruit();
  }

  getFruitList() {
    this.httpService.getFruitList().subscribe((res) => {
      this.fruitList = res;
    })
  }

  openModal(id: number) {
    const modalRef = this.modalService.open(FruitDetailComponent, { size: 'lg', backdrop: true, centered: true });
    modalRef.componentInstance.fruitId = id
    modalRef.result.then(() => { }, async (res) => {
      if (res.data) {
        this.searchTerm.setValue(null);
        this.cdf.detectChanges()
      }
    });
  }

  selectInSearch(item : any){
    this.openModal(item.id);
  }

  async searchFruit(){
    this.searchTerm.valueChanges.pipe(
      startWith(null),
      debounceTime(200),
      distinctUntilChanged(),
    ).subscribe((search: any) => {
      this.filteredFruits = this.filter(search)
    } );
  }

  filter(val: string) {
    if(val){
      return this.fruitList.filter((option : any) => {
        return option.name.toLowerCase().indexOf(val.toLowerCase()) === 0
      })
    }
  }

}
