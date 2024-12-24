import { Component, ViewEncapsulation } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import {MatGridListModule} from '@angular/material/grid-list';

@Component({
  selector: 'app-work-point',
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule, FormsModule, ReactiveFormsModule, MatIconModule, MatButtonModule, MatGridListModule],
  templateUrl: './work-point.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrl: './work-point.component.scss'
})
export class WorkPointComponent {
  journey = new FormControl('6:00');



  in1:string|undefined ; out1:string|undefined;
  in2:string|undefined ; out2:string|undefined;

  get colorResult() {
    return this.areTheTimesFilled() ? "green" : "red";
  }

  updateFields() {
    if (this.areTheTimesFilled()) {
      this.out2 = this.getLastMarkTime()
    } else {
      this.out2 = '';
    }
  }


  private getLastMarkTime() {
    const in2 = this.parseTimeString(this.in2!);
      const out2Date = this.addSecondsToDate(in2, this.timeLeft());
      const hours = out2Date.getHours().toString().padStart(2, '0');
      const minutes = out2Date.getMinutes().toString().padStart(2, '0');
  
      return `${hours}:${minutes}`
  }

  private areTheTimesFilled = () => (this.in1 && this.in2 && this.out1) ? true : false;
  
  private timeLeft() {
    const increased = this.firstHalfInSeconds()! + this.transformJourneyToSeconds()!;
    return increased;
  }

  private firstHalfInSeconds = () => this.calculateTimeDifference(this.out1!, this.in1!);

  private calculateTimeDifference(startString: string, endString: string): number | undefined {
    const startTime = this.parseTimeString(startString);
    const endTime = this.parseTimeString(endString);

    if (startTime && endTime) {
      const differenceInMilliseconds = endTime.getTime() - startTime.getTime();
      return differenceInMilliseconds / 1000;
    }
    return undefined;
  }

  private parseTimeString(timeString: string): Date {
    const [hours, minutes] = timeString.split(':').map(Number);
    const now = new Date();
    now.setHours(hours, minutes, 0, 0);
    return now;
  }

  private transformJourneyToSeconds() {
    const journeyString = this.journey.value;
    let [hours, minutes] = journeyString!.split(":").map(Number);

    const hoursInSeconds = (hours * 60) * 60;
    const minutesInSeconds = minutes * 60;

    return hoursInSeconds + minutesInSeconds;
  }


  private addSecondsToDate(date: Date, seconds: number): Date {
    date.setTime(date.getTime() + seconds * 1000);
    return date;
  }


  clearValues() {
    this.in1 = this.in2 = this.out1 = this.out2 = undefined;
  }
}
