import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ResultService, ResultType} from '../result-service/result.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-result-form',
  templateUrl: './result-form.component.html',
  styleUrls: ['./result-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResultFormComponent implements OnInit {

  public form: FormGroup;
  public resultType: ResultType[] = [];
  public formModel: ResultType = new ResultType();
  public params: number;

  constructor(private fb: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private resultService: ResultService) {}

  ngOnInit() {
    this.resultType = this.resultService.getResults();
    this.checkParameters();
    this.initForm();
  }

  checkParameters(): void {
    this.route.paramMap.subscribe(params => {
      if (params.get('id')) {
        this.params = Number(params.get('id'));
        this.formModel = this.resultType.find((result) => result.id === this.params);
      }
    });
  }

  getControl(control): AbstractControl {
    return this.form.get(control);
  }

  initForm(): void {
    this.form = this.fb.group({
      id: [this.formModel.id],
      teamOne: [this.formModel.teamOne, Validators.required],
      scoreOne: [this.formModel.scoreOne, [Validators.required, Validators.min(0)]],
      teamTwo: [this.formModel.teamTwo, Validators.required],
      scoreTwo: [this.formModel.scoreTwo, [Validators.required, Validators.min(0)]],
      matchDate: [this.formModel.matchDate, [ Validators.required, Validators.minLength(10), Validators.maxLength(10)]]
    });
  }

  // Trimming the white space and transforming to lower case
  removeWhite(): void {
    Object.keys(this.form.getRawValue())
      .forEach((key) => {
        if (this.form.get(key).value && typeof this.form.get(key).value === 'string') {
          this.form.patchValue({
            [key]: this.form.get(key).value.toLowerCase().trim()
          });
        }
      });
  }

  submitResult(): void {
    if (this.form.valid) {
      this.removeWhite();
      if (!this.form.get('id').value) this.form.get('id').setValue(Date.now());
      this.resultService.saveResult(this.form.getRawValue());
      this.form.reset();
    }
  }

}
