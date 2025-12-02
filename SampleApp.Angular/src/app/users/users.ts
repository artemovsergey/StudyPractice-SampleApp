import { CommonModule } from '@angular/common';
import {
  Component,
  OnInit,
  signal,
  inject,
  ViewChild,
} from '@angular/core';
import User from '../../models/user.entity';
import { UsersService } from '../../services/users.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    FormsModule,
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
  ],
  templateUrl: './users.html',
  styleUrl: './users.scss',
})
export class Users implements OnInit {
  users = signal<User[]>([]);
  currentUsers = signal<User[]>([])

  usersService = inject(UsersService);
  displayedColumns: string[] = ['id', 'login'];
  _liveAnnouncer = inject(LiveAnnouncer);
  dataSource = new MatTableDataSource<User>([]);
  searchText: string = '';

  // Используем setter для ViewChild
  @ViewChild(MatSort) set matSort(sort: MatSort) {
    if (sort) {
      this.dataSource.sort = sort;
    }
  }

  @ViewChild(MatPaginator) set matPaginator(paginator: MatPaginator) {
    if (paginator) {
      this.dataSource.paginator = paginator;
    }
  }

  ngOnInit() {
    this.usersService.getAll().subscribe({
      next: (v) => {
        console.log(v);
        this.users.set(v);
        this.currentUsers.set(v);
        this.dataSource.data = v;
      },
      error: (e) => console.error(e),
      complete: () => console.info('complete'),
    });
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  search() {
    console.log(this.searchText);
    var result = this.users().filter((u) => u.login.includes(this.searchText));
    this.currentUsers.set(result)
    this.dataSource.data = this.currentUsers();
  }

  clearSearch() {
    this.dataSource.data = this.users().filter((u) => u.login.includes(''));
    this.searchText = '';
  }
}
