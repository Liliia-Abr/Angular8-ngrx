import { Component, Input, OnInit } from '@angular/core';
import { ListItem } from '../../../models/list-item';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent implements OnInit {
    @Input() public item: ListItem = {id: 0, title: '', description: '', date: new Date()};

    constructor() { }

    ngOnInit() {
    }

}
