// import { Component, OnInit } from '@angular/core';
// import { Observable, of } from 'rxjs';
// import { MenuItem } from '../models/menu-item.model';
// import { MenuService } from '../services/menu.service';

// @Component({
//   selector: 'app-menu',
//   // standalone: true,
//   // imports: [],
//   templateUrl: './menu.component.html',
//   styleUrls: ['./menu.component.css'],
// })
// export class MenuComponent implements OnInit {
//   menuItems$: Observable<MenuItem[]> = of([]); // Initialize with an empty array observable

//   constructor(private menuService: MenuService) {}

//   ngOnInit(): void {
//     this.menuItems$ = this.menuService.getMenuItems();
//     console.log(this.menuItems$)
//   }

//   likeItem(id: string): void {
//     this.menuService.updateLikes(id, 1);
//   }
// }


import { Component, OnInit } from '@angular/core';
import { Observable, of,   combineLatest}    from 'rxjs';
import { MenuItem } from '../models/menu-item.model';
import { MenuService } from '../services/menu.service';

import { AuthService } from '../auth.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  menuItems$: Observable<MenuItem[]> = of([]); // Initialize with an empty array observable

  constructor(private menuService: MenuService ,     private authService: AuthService  ) {}

  // ngOnInit(): void {
  //   this.menuItems$ = this.menuService.getMenuItems();
  // }

  ngOnInit(): void {
    this.menuItems$ = combineLatest([
      this.menuService.getMenuItems(),
      this.authService.getCurrentUserId()
    ]).pipe(
      map(([menuItems, userId]) => {
        return menuItems.map(item => ({
          ...item,
          liked: item.likedBy ? item.likedBy.includes(userId || '') : false
        }));
      })
    );
  }

  toggleLike(id: string): void {
    this.menuService.toggleLike(id).catch(error => console.error(error));
  }
}
