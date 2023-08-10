import { Injectable } from '@angular/core';


export class Appointment {
  title!: string;
  startDate!: Date;
  endDate!: Date;
  recurrence?: string;
  ownerId!: number[];
  priority!: number;
}

export class Resource {
  text!: string;

  id!: number;

  color!: string;
}
export class Priority {
  text!: string;
  id!: number;

}
const prioritiesData: Priority[] = [
  {
    text: '1',    id: 1,
     }, {
    text: '2',    id: 2,
    }, {
    text: '3',    id: 3,
    }, {
    text: '4',    id: 4,
  },  {
    text: '5',    id: 5,
  },  {
    text: '6',    id: 6,
  },  {
    text: '7',    id: 7,
  },  {
    text: '8',    id: 8,
  },  {
    text: '9',    id: 9,
  },  {
    text: '10',    id: 10,
  }, {
    text: '11',    id: 11,
  }, {  
    text: '12',    id: 12,
  },  {
    text: '13',    id: 13,
  },  {
    text: '14',    id: 14,
  },  {
    text: '15',    id: 15,
  },  {
    text: '16',    id: 16,
  },  {
    text: '17',    id: 17,
  },  {
    text: '18',    id: 18,
  },  {
    text: '19',    id: 19,
  },  {
    text: '20',    id: 20,
  },  {
    text: '21',    id: 21,
  }, {
    text: '22',    id: 22,
  }, {
    text: '23',    id: 23,
  }, {
    text: '24',    id: 24,
  }, {
    text: '25',    id: 25,
  }, {
    text: '26',    id: 26,
  }, {
    text: '27',    id: 27,
  }, {
    text: '28',    id: 28,
  }, {
    text: '29',    id: 29,
  }, {
    text: '30',    id: 30,
  }, 

];


const resourcesData: Resource[] = [
  {
    text: 'Mátyás Bogdán',
    id: 1,
    color: '#800000',

  }, {
    text: 'Zsombor Fazekas',
    id: 2,
    color: '#284d3e',
  }, {
    text: 'Márton Papp',
    id: 3,
    color: '#008080',
  }, {
    text: 'Bendegúz Mészáros',
    id: 4,
    color: '#D2691E',
  },
];

const appointments: Appointment[] = [
  {
    title: "Install New Database",
    ownerId: [2],
    startDate: new Date("2023-05-23T08:45:00.000Z"),
    endDate: new Date("2023-05-23T09:45:00.000Z"),
    priority: 2,
  },
  {
    title: "asd",
    ownerId: [3],
    startDate: new Date("2023-07-23T08:45:00.000Z"),
    endDate: new Date("2023-07-23T09:45:00.000Z"),
    priority: 2,

  },
  {
    title: "Customer Workshop",
    ownerId: [4],
    startDate: new Date("2023-05-26T08:00:00.000Z"),
    endDate: new Date("2023-05-26T10:00:00.000Z"),

    recurrence: "FREQ=WEEKLY;BYDAY=TU,FR;COUNT=10",
    priority: 2,
   
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
  getResources() {
    return resourcesData;
  }
  getPriorities() {
    return prioritiesData;
  }
}
