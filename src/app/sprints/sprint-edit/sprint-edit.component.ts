import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SprintService } from '../sprint.service';
import { ISprint } from '../sprint';
import { FormControl, FormGroup, Validators, FormGroupDirective, NgForm, AbstractControl, FormBuilder } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { DatePipe } from '@angular/common';

/** Error when invalid control is dirty, touched, or submitted. */
export class DateErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidControl = !!(control && control.invalid && (control.dirty || control.touched));
    const invalidParent = !!(control && control.parent && control.parent.invalid
    && (control.parent.dirty || control.parent.touched) && control.parent.hasError('invalidDates'));

    return (invalidControl || invalidParent);
  }
}

@Component({
  selector: 'app-sprint-edit',
  templateUrl: './sprint-edit.component.html',
  styleUrls: ['./sprint-edit.component.scss']
})
export class SprintEditComponent implements OnInit {

  @Input()sprint: ISprint;
  @Output() sprintSaved = new EventEmitter<ISprint>();
  @Output() discarded = new EventEmitter<any>();

  sprintForm: FormGroup;
  matcher = new DateErrorStateMatcher();
  selectedStartDate: string;
  selectedEndDate: string;

  constructor(
    private sprintService: SprintService,
    private fb: FormBuilder,
    public datepipe: DatePipe,
    ) { }

  ngOnInit(): void {
    this.sprintForm = this.fb.group({
      startDate: [new Date(this.sprint.startDate), Validators.required],
      endDate: [new Date(this.sprint.endDate), Validators.required]
    }, {validator: this.checkDates });
  }

  saveFormSprint() {
    if (this.sprintForm.touched && this.sprintForm.valid) {
      this.sprint.startDate = this.datepipe.transform(this.sprintForm.get('startDate').value, 'yyyy-MM-dd');
      this.sprint.endDate = this.datepipe.transform(this.sprintForm.get('endDate').value, 'yyyy-MM-dd');
      this.sprintService.updateSprint(this.sprint.id, this.sprint).subscribe(savedSprint  =>  {
        console.log(savedSprint);
        this.sprintSaved.emit(savedSprint);
      });
    }
  }

  cancel() {
    this.discarded.emit();
  }

  checkDates(c: AbstractControl): { [key: string]: boolean} | null {
    const startDate = c.get('startDate').value;
    const endDate = c.get('endDate').value;

    return endDate > startDate ? null : { invalidDates: true };
  }

}
