import { Component, OnInit } from '@angular/core';
import { AsyncSubject, BehaviorSubject, fromEventPattern, interval, of, ReplaySubject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  title = 'StudyRXJS';

  ngOnInit(): void {
    this.testArrayForeach();
    this.testArrayMap();
    this.testArrayFilter();
    this.testArrayReduce();
    this.testFlatArray();
    this.testBehaviorSubject();
    this.testReplaySubject();
    this.testAsyncSubject();
    this.testCreationOperators();
  }
  
  testArrayForeach() {
    // Với mảng các phần tử có kiểu primitive (string, number) thì foreach không làm thay đổi giá trị của các phần tử
    let arr: Array<number> = [1, 2, 3, 4, 5];
    arr.forEach((item, index) => {
      console.log('item : ', item);
    })
    console.log('arr foreach : ', arr);

    // Với mảng các phần tử có kiểu reference (object) thì foreach có thể làm thay đổi giá trị của các phần tử
    let arrObj = [{value: 1}, {value: 2}, {value: 3}, {value: 4}];
    arrObj.forEach((item, index) => {
      item.value += 4;
      console.log('itemObj : ', item);
    })
    console.log('arr foreach obj : ', arrObj);
  }

  testArrayMap() {
    // Array map sẽ lặp qua tất cả phần tử để biến đổi các phần tử và trả về trong một array khác
    let arr: Array<number> = [1, 2, 3, 4, 5, 6];
    let arrMap = arr.map((item, index) => {
      return item += 4;
    })
    console.log('arr map : ', arrMap);
  }

  testArrayFilter() {
    // Array filter trả về một mảng mới với các phần tử thỏa mãn điều kiện lọc
    let arr: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    let arrFilter = arr.filter((item, index) => {
      return item %2 == 0
    })
    console.log('arr filter : ', arrFilter);
  }

  testArrayReduce() {
    // Method reduce cho phép lặp qua tất cả các phần tử và áp dụng một function nào đó vào mỗi phần tử, function này có các tham số :
    // - accumulator: giá trị trả về tử các lần callback trước
    // - currentValue: giá trị của phần tử hiện tại trong array
    // - currentIndex: index của phần tử hiện tại
    // - array: chính là mảng hiện tại
    let arr: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    let valReduce = arr.reduce((acc, currentValue, currentIndex, currentArray) => {
      console.log('acc : ', acc);
      console.log('current value : ', currentValue);
      console.log('current index : ', currentIndex);
      console.log('current array : ', currentArray);
      return acc * currentValue;
    }, 1);
    console.log('val reduce : ', valReduce);
  }

  testFlatArray() {
    
  }

  testBehaviorSubject() {
    const behaviorSubject = new BehaviorSubject<String>('');
    behaviorSubject.next('Anh Sơn');
    const observable_1 = behaviorSubject.subscribe(val => {
      console.log('observable1 : ', val);
    })
    const observable_2 = behaviorSubject.subscribe(val => {
      console.log('observable 2 : ', val);
    })
    behaviorSubject.next('Anh Sơn 2');
  }

  testReplaySubject() {
    const replaySubject = new ReplaySubject<String>(2);
    replaySubject.next('Value 1');
    replaySubject.next('Value 2');
    replaySubject.next('Value 3');
    const observable_1 = replaySubject.subscribe(val => {
      console.log('replaySubject 1 : ', val);
    })
    const observable_2 = replaySubject.subscribe(val => {
      console.log('replaySubject 2 : ', val);
    })
  }

  testAsyncSubject() {
    const asyncSubject = new AsyncSubject<String>();
    asyncSubject.next('Value 1');
    asyncSubject.next('Value 2');
    asyncSubject.next('Value 3');
    const observale_1 = asyncSubject.subscribe(val => {
      console.log('asyncSubject 1 : ', val);
    })
    const observable_2 = asyncSubject.subscribe(val => {
      console.log('asyncSubject 2 : ', val);
    })
    asyncSubject.complete();
  }

  eventClick1() {
    console.log('Event click 1');
  }

  eventClick2() {
    console.log('Event click 2');
  }

  testCreationOperators() {
    // creation operator : Of
    const arr1 = [1, 2, 3, 4, 5];
    const arr2 = [6, 7, 8, 9];
    const name = 'Anh son';
    const age = 27;
    const operatorOf = of(arr1, arr2, name, age);
    operatorOf.subscribe(val => {
      console.log('operator of : ', val);
    })

    //creation operator : interval
    // const arr3 = [1, 2, 3, 4, 5];
    // const operatorInterval = interval(500);
    // operatorInterval.subscribe(val => {
    //   console.log('operator interval : ', val);
    // })

    //creation operator for event : fromEventPattern
    const eventOfMe = fromEventPattern(this.eventClick1, this.eventClick2);
    eventOfMe.subscribe(val => {
      console.log('fromEventPattern : ', val);
    })
  }

}
