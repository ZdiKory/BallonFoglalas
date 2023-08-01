import { Component, ViewChild } from '@angular/core';
import { Service, Appointment } from './app.service';
import { DxSchedulerComponent } from 'devextreme-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [Service]
})
export class AppComponent {
  @ViewChild(DxSchedulerComponent, { static: false }) scheduler!: DxSchedulerComponent;
  appointmentsData: Appointment[];
  currentView: string = 'month';
  peopleData: string[] = ["Janos", "Dani", "Valaki"];
  ownerData: number[] = [1, 2, 3];

  constructor(private service: Service) {
    this.appointmentsData = service.getAppointments();
  }

  enforceHourlyInterval(date: Date): Date {
    return new Date(Math.round(date.getTime() / (60 * 60 * 1000)) * (60 * 60 * 1000));
  }

  onAppointmentAdding(e: any) {
    // Check if it's a new appointment
    if (!e.appointmentData.recurrence) {
      const startDate = new Date(e.appointmentData.startDate);
      const startHour = startDate.getHours();

      if (startHour < 9 || startHour >= 20) {
        e.cancel = true;
        alert('Start time should be between 9:00 AM and 8:00 PM.');
        return;
      }

      const startMinutes = startDate.getMinutes();
      const nearestHourStart = new Date(startDate);
      nearestHourStart.setMinutes(startMinutes < 30 ? 0 : 60);
      e.appointmentData.startDate = this.enforceHourlyInterval(nearestHourStart);

      const endDate = new Date(e.appointmentData.endDate);
      const endHour = endDate.getHours();
      const endMinutes = endDate.getMinutes();
      const nearestHourEnd = new Date(endDate);
      nearestHourEnd.setMinutes(endMinutes < 30 ? 0 : 60);

      // Check if the calculated endDate is greater than 20:00 (8:00 PM)
      if (nearestHourEnd.getHours() >= 20) {
        nearestHourEnd.setHours(20);
        nearestHourEnd.setMinutes(0);
      }

      e.appointmentData.endDate = this.enforceHourlyInterval(nearestHourEnd);

      if (nearestHourEnd <= nearestHourStart) {
        e.cancel = true;
        alert('End date should be after start date.');
        return;

      }
  
    }
  }

  onAppointmentUpdating(e: any) {
    const oldStart = e.oldData.startDate;
    const oldEnd = e.oldData.endDate;
    const newStart = e.newData.startDate;
    const newEnd = e.newData.endDate;
    const roundedStart = new Date(Math.round(newStart.getTime() / (60 * 60 * 1000)) * (60 * 60 * 1000));
    const roundedEnd = new Date(Math.round(newEnd.getTime() / (60 * 60 * 1000)) * (60 * 60 * 1000));
    if (oldStart.getTime() !== roundedStart.getTime()) {
      e.newData.startDate = roundedStart;
    }

    if (oldEnd.getTime() !== roundedEnd.getTime()) {
      e.newData.endDate = roundedEnd;
    }
  }

  customizeDateCell(e: any) {
    if (this.isWorkHour(e.date)) {
      e.cellElement.style.backgroundColor = '#f0f0f0';
    } else {
      e.cellElement.style.backgroundColor = '#fff';
    }
  }

  private isWorkHour(date: Date): boolean {
    const day = date.getDay();
    return day >= 1 && day <= 5 && date.getHours() >= 9 && date.getHours() < 20;
  }

  // Set the start and end hours of the day to display hourly intervals
  startDayHour: number = 9;
  endDayHour: number = 20;
}
