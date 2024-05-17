import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MenuItem } from '../models/menu-item.model';
import { MenuService } from '../services/menu.service';

@Component({
  selector: 'app-menu',
  // standalone: true,
  // imports: [],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  menuItems$: Observable<MenuItem[]> = of([]); // Initialize with an empty array observable

  constructor(private menuService: MenuService) {}

  ngOnInit(): void {
    this.menuItems$ = this.menuService.getMenuItems();
    console.log(this.menuItems$)
  }

  likeItem(id: string): void {
    this.menuService.updateLikes(id, 1);
  }
}
