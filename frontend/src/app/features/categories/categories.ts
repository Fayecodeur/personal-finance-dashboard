import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CategoryService } from '../../core/services/category';
import { Category } from '../../shared/models/category.model';
import { CategoryForm } from './category-form/category-form';

@Component({
  selector: 'app-categories',
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule, MatDialogModule],
  templateUrl: './categories.html',
  styleUrl: './categories.scss',
})
export class Categories implements OnInit {
  displayedColumns: string[] = ['name', 'type', 'actions'];
  categories = signal<Category[]>([]);

  constructor(
    private categoryService: CategoryService,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (categories) => this.categories.set(categories),
    });
  }

  openForm(category: Category | null = null): void {
    const dialogRef = this.dialog.open(CategoryForm, {
      width: '400px',
      data: { category },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) return;

      if (category) {
        this.categoryService
          .updateCategory(category._id, result)
          .subscribe(() => this.loadCategories());
      } else {
        this.categoryService.createCategory(result).subscribe(() => this.loadCategories());
      }
    });
  }

  deleteCategory(id: string): void {
    if (!confirm('Supprimer cette catégorie ?')) return;
    this.categoryService.deleteCategory(id).subscribe(() => this.loadCategories());
  }
}
