import { Component, Inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { Category } from '../../../shared/models/category.model';
import { Transaction } from '../../../shared/models/transaction.model';
import { MatIconModule } from '@angular/material/icon';

export interface TransactionFormData {
  transaction: Transaction | null;
  categories: Category[];
}

@Component({
  selector: 'app-transaction-form',
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
  ],
  templateUrl: './transaction-form.html',
  styleUrl: './transaction-form.scss',
})
export class TransactionForm implements OnInit {
  form: FormGroup;
  isEdit = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<TransactionForm>,
    @Inject(MAT_DIALOG_DATA) public data: TransactionFormData,
  ) {
    this.form = this.fb.group({
      type: ['depense', Validators.required],
      amount: [null, [Validators.required, Validators.min(0.01)]],
      description: ['', Validators.required],
      category: ['', Validators.required],
      date: [new Date(), Validators.required],
    });
  }

  ngOnInit(): void {
    if (this.data.transaction) {
      this.isEdit = true;
      const t = this.data.transaction;
      const categoryId = typeof t.category === 'string' ? t.category : t.category._id;
      this.form.patchValue({
        type: t.type,
        amount: t.amount,
        description: t.description,
        category: categoryId,
        date: new Date(t.date),
      });
    }
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.dialogRef.close(this.form.value);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
