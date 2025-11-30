import { CommonModule } from "@angular/common"
import { Component, OnInit, signal, inject } from "@angular/core"
import User from "../../models/user.entity"
import { UsersService } from "../../services/users.service"
import { MatTableModule } from "@angular/material/table"

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './users.html',
  styleUrl: './users.scss'
})


export class Users implements OnInit {

  users = signal<User[]>([])
  usersService = inject(UsersService)
  displayedColumns: string[] = ['id', 'login'];

  ngOnInit() {
    this.usersService.getAll().subscribe({
      next: (v) => this.users.set(v),
      error: (e) => console.error(e),
      complete: () => console.info('complete') 
  })
  }
}