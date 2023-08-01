import { Injectable } from '@angular/core';


export class Appointment {
  Title!: string;
  startDate!: Date;
  endDate!: Date;
  dayLong?: boolean;
  recurrence?: string;

}

const appointments: Appointment[] = [
  {
    Title: "Install New Database",
    startDate: new Date("2023-05-23T08:45:00.000Z"),
    endDate: new Date("2023-05-23T09:45:00.000Z"),
  },
  {
    Title: "asd",
    startDate: new Date("2023-07-23T08:45:00.000Z"),
    endDate: new Date("2023-07-23T09:45:00.000Z"),

  },
  {
    Title: "Customer Workshop",
    startDate: new Date("2023-05-26T08:00:00.000Z"),
    endDate: new Date("2023-05-26T10:00:00.000Z"),
    dayLong: true,
    recurrence: "FREQ=WEEKLY;BYDAY=TU,FR;COUNT=10",
   
  }
];

@Injectable({
  providedIn: 'root'
})
export class Service {
  getAppointments(): Appointment[] {
    return appointments;
  }

  setNearestHourForNewAppointment(newAppointment: Appointment) {
    if (newAppointment.startDate) {
      const startDate = new Date(newAppointment.startDate);
      newAppointment.startDate = this.enforceHourlyInterval(startDate);
      newAppointment.endDate = this.enforceHourlyInterval(startDate);
    }
  }

  private enforceHourlyInterval(date: Date): Date {
    return new Date(Math.round(date.getTime() / (60 * 60 * 1000)) * (60 * 60 * 1000));
  }
}
