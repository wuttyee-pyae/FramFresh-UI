import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpService } from 'src/app/app.service';

@Component({
  selector: 'app-fruit-detail',
  templateUrl: './fruit-detail.component.html',
  styleUrls: ['./fruit-detail.component.scss']
})
export class FruitDetailComponent implements OnInit  {
  readMoreStatus: boolean = false;
  showText = "see more"
  fruitId: any ;
  imagePath = "assets/images/Resources/Screen3/";
  fruitData: any ;

  constructor(public modal: NgbActiveModal,
    private httpService : HttpService ) {
    
  }

  ngOnInit(): void {
    if (this.fruitId) {
      this.getFruitDetail();
    }
  }

  getFruitDetail(){
    this.httpService.getFruitDetail(this.fruitId).subscribe((res) => {
      this.fruitData = res;
    })
  }
  close(){
    this.modal.dismiss(
      { data: true }
      );
  }

   showMore(){
    this.readMoreStatus = ! this.readMoreStatus;
    if(this.readMoreStatus){
      this.showText = "see less"
    }else{
      this.showText = "see more"
    }
  }
}
