import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PropertyService } from '../../services/property.services';
import { MatSnackBar, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-proeprty',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.css']
})
export class PropertyComponent implements OnInit {

  singleUpdateForm: FormGroup;
  changeOwnerForm: FormGroup;
  displayedColumns: string[] = ['index', 'position', 'name', 'weight', 'symbol','test'];
  dataSource;
  allRates;
  constructor(private formBuilder: FormBuilder, private rateService: PropertyService, private snackbarService: MatSnackBar) { }

  ngOnInit() {
    this.singleUpdateForm = this.formBuilder.group({
      propertyId   : ['', [Validators.required]],
      area : ['', [Validators.required]],
      cost : ['' , [Validators.required]],
      type : ['' , [Validators.required]],
      location : ['' , [Validators.required]],
      ownerName : ['' , [Validators.required]],
      value : ['' , [Validators.required]],      

      });

      this.changeOwnerForm = this.formBuilder.group({
        newOwner   : ['', [Validators.required]],
        propertyId : ['', [Validators.required]]
        });
        this.getAllRates();
  }
  submitRate() {


    
    this.rateService.submitRate(this.singleUpdateForm.value)
    .subscribe((res) => {

      this.snackbarService.open('Successfully saved the properties');
      this.getAllRates();
    }, (err) => {

      this.snackbarService.open('Some error occurred', 'dismiss');
      this.singleUpdateForm.reset();

    });

  }
  changeOwner() {

    this.rateService.changeOwner(this.changeOwnerForm.value)
    .subscribe((res) => {
      this.snackbarService.open('Successfully changed owner', 'dismiss');
      this.changeOwnerForm.reset();
      this.getAllRates();
    }, (err) => {
      this.snackbarService.open('Some error occurred');
    });
  }
  getAllRates() {
    this.rateService.getRates()
    .subscribe((res: any) => {

      if (res) {

        const properties = JSON.parse(res);
        console.log(properties);
        this.allRates = properties['map']((property) => {
              return property['Record'];
        });
        console.log(this.allRates);
        this.buildTable();

       }
    }, (err) => {

    });
  }
  buildTable() {
    this.dataSource = new MatTableDataSource<any>(this.allRates);

  }

}




