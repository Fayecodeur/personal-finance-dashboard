import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { TransactionService } from '../../core/services/transaction';
import { CategoryService } from '../../core/services/category';

import { Transaction } from '../../shared/models/transaction.model';
import { Category } from '../../shared/models/category.model';

import { TransactionForm, TransactionFormData } from './transaction-form/transaction-form';

@Component({
  selector: 'app-transactions',
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatSnackBarModule,
  ],
  templateUrl: './transactions.html',
  styleUrl: './transactions.scss',
})
export class Transactions implements OnInit {
  displayedColumns: string[] = ['date', 'description', 'category', 'type', 'amount', 'actions'];

  dataSource = new MatTableDataSource<Transaction>([]);
  categories: Category[] = [];

  totalItems = 0;
  pageSize = 10;
  currentPage = 1;
  sortBy = 'date';
  order: 'asc' | 'desc' = 'desc';
  search = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private transactionService: TransactionService,
    private categoryService: CategoryService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.loadCategories();
    this.loadTransactions();
  }

  private showSuccess(message: string): void {
    this.snackBar.open(message, 'Fermer', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (categories) => (this.categories = categories),
      error: () => (this.categories = []),
    });
  }

  loadTransactions(): void {
    this.transactionService
      .getTransactions({
        search: this.search,
        sortBy: this.sortBy,
        order: this.order,
        page: this.currentPage,
        limit: this.pageSize,
      })
      .subscribe({
        next: (res) => {
          this.dataSource.data = res.transactions;
          this.totalItems = res.total;
        },
      });
  }

  onSearchChange(value: string): void {
    this.search = value;
    this.currentPage = 1;
    this.loadTransactions();
  }

  onSortChange(sort: Sort): void {
    if (sort.direction) {
      this.sortBy = sort.active;
      this.order = sort.direction as 'asc' | 'desc';
    } else {
      this.sortBy = 'date';
      this.order = 'desc';
    }

    this.loadTransactions();
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.loadTransactions();
  }

  openForm(transaction: Transaction | null = null): void {
    const data: TransactionFormData = {
      transaction,
      categories: this.categories,
    };

    const dialogRef = this.dialog.open(TransactionForm, {
      width: '400px',
      data,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) return;

      if (transaction) {
        this.transactionService.updateTransaction(transaction._id, result).subscribe({
          next: () => {
            this.loadTransactions();
            this.showSuccess('Transaction modifiée avec succès.');
          },
        });
      } else {
        this.transactionService.createTransaction(result).subscribe({
          next: () => {
            this.loadTransactions();
            this.showSuccess('Transaction ajoutée avec succès.');
          },
        });
      }
    });
  }

  deleteTransaction(id: string): void {
    if (!confirm('Supprimer cette transaction ?')) return;

    this.transactionService.deleteTransaction(id).subscribe({
      next: () => {
        this.loadTransactions();
        this.showSuccess('Transaction supprimée avec succès.');
      },
    });
  }

  getCategoryName(category: Category | string | null): string {
    if (!category) return '—';
    return typeof category === 'string' ? '' : category.name;
  }
}
