import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DataService {
    private dataSource = new BehaviorSubject<string>('default message');
    currentData = this.dataSource.asObservable();

    changeData(data: any) {
        this.dataSource.next(data);
    }
}
