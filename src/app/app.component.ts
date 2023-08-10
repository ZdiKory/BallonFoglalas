import { Component, ViewChild, NgModule, enableProdMode } from '@angular/core';
import { DxSchedulerModule } from 'devextreme-angular';
import { Service, Appointment, Resource, Priority } from './app.service';
import { DxSchedulerComponent, DxSpeedDialActionModule } from 'devextreme-angular';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import notify from 'devextreme/ui/notify';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [Service]
})
export class AppComponent {
  title(title: any) {
      throw new Error('Method not implemented.');
  }
  @ViewChild(DxSchedulerComponent, { static: false }) scheduler!: DxSchedulerComponent;
  appointmentsData: Appointment[];
  resourcesData: Resource[];
  currentView: string = 'month';
  prioritiesData: Priority[];


  constructor(private service: Service) {
    this.appointmentsData = service.getAppointments();
    this.resourcesData = service.getResources();
    this.prioritiesData = service.getPriorities();
  }

  showToast(event: string, message: string, type: string) {
    notify(`${event}: ${message}`, type, 2500);
  }

  enforceHourlyInterval(date: Date): Date {
    return new Date(Math.round(date.getTime() / (60 * 60 * 1000)) * (60 * 60 * 1000));
  }

  validateTimeRange(startDate: Date, endDate: Date): boolean {
    const startHour = startDate.getHours();
    const endHour = endDate.getHours();

    return startHour >= 9 && endHour <= 20;
  }


  onAppointmentAdding(e: any) {
    this.showToast('Successfully added', e.appointmentData.text, 'success');
   
   
    if (!e.appointmentData.recurrence) {
      const startDate = new Date(e.appointmentData.startDate);
      const startHour = startDate.getHours();

      if (startHour < 9 || startHour >= 20) {
        e.cancel = true;
        this.showToast('Wrong time', 'Start time should be between 9:00 AM and 8:00 PM.', 'error');
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

      
      if (nearestHourEnd.getHours() >= 21) {
        e.cancel = true;
        this.showToast('Wrong time', 'End time should be before 8:00 PM.', 'error');
        return;
      }

      e.appointmentData.endDate = this.enforceHourlyInterval(nearestHourEnd);

      if (nearestHourEnd <= nearestHourStart) {
        e.cancel = true;
        this.showToast('Wrong time', 'End date should be after start date.', 'error');
        return;
      }

    }
  }
  onAppointmentUpdating(e: any) {
    const newStart = new Date(e.newData.startDate);
    const newEnd = new Date(e.newData.endDate);

    if (!this.validateTimeRange(newStart, newEnd)) {
      e.cancel = true;
      this.showToast('Wrong time', 'Appointments should be between 9:00 AM and 8:00 PM.', 'error');
      return;
    }

    if (newEnd <= newStart) {
      e.cancel = true;
      this.showToast('Wrong time', 'End date should be after start date.', 'error');
      return;
    }

    e.newData.startDate = this.enforceHourlyInterval(newStart);
    e.newData.endDate = this.enforceHourlyInterval(newEnd);
    const appointmentText = e.appointmentData?.text || e.appointmentData?.title || '';

    this.showToast('Successfully updated', appointmentText, 'info');
  }


  onAppointmentDeleted(e: any) {
    this.showToast('Deleted', e.appointmentData.text, 'warning');
  }

  private isWorkHour(date: Date): boolean {
    const day = date.getDay();
    return day >= 1 && day <= 5 && date.getHours() >= 9 && date.getHours() < 20;
  }

  startDayHour: number = 9;
  endDayHour: number = 20;

 

}
