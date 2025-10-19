import { Component, effect, signal, computed } from '@angular/core';

interface Month{
  monthName: string;
  monthNum: number; // 0-based month index
  monthDays: number;
}

@Component({
  selector: 'app-calendar',
  imports: [],
  templateUrl: './calendar.html',
  styleUrl: './calendar.scss'
})
export class Calendar {
  // make inputs numeric signals with sensible defaults
  selectedYear = signal<number>(new Date().getFullYear());
  selectedMonth = signal<number>(new Date().getMonth());

  weekDays: string[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  monthNames: string[] = ["January", "February", "March", "April", "May", "June",
                          "July", "August", "September", "October", "November", "December"];
  monthCode: number[] = [6, 2, 2, 5, 0, 3, 5, 1, 4, 6, 2, 4];

  // reactive months list (updated when year changes)
  months = signal<Month[]>([]);

  // computed day numbers for the currently selected month
  monthDays = computed<number[]>(() => {
    const year = this.selectedYear();
    const monthIndex = this.selectedMonth();
    const days = this.daysInMonth(year, monthIndex);
    return Array.from({ length: days }, (_, i) => i + 1);
  });

  constructor() {
    // Populate months
    effect(() => {
      const y = this.selectedYear();
      this.months.set(this.buildMonths(y));
      return y;
    });
  }

  // Get first week day from a month in a specific year
  startingWeekDay(): number{
    let mCode = this.monthCode[this.selectedMonth()]; 
    let yCode = (this.selectedYear() % 100) + Math.floor((this.selectedYear() % 100) / 4);
    return (mCode + yCode) % 7;
  }

  leadingBlanks(): number[]{
    const blanks = this.startingWeekDay();
    return Array.from({ length: blanks }, (_, i) => i);
  }

  buildMonths(year: number): Month[] {
    return this.monthNames.map((name, idx) => ({
      monthName: name,
      monthNum: idx,
      monthDays: this.daysInMonth(year, idx)
    }));
  }

  daysInMonth(year: number, monthIndex: number): number {
    const y = year ?? new Date().getFullYear();
    if (monthIndex === 1) { // February
      const isLeap = (y % 4 === 0) && (y % 100 !== 0 || y % 400 === 0);
      return isLeap ? 29 : 28;
    }
    const month30 = [3, 5, 8, 10]; // Apr, Jun, Sep, Nov (0-based)
    return month30.includes(monthIndex) ? 30 : 31;
  }
}
