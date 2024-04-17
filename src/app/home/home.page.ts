import { Component } from '@angular/core';
import { LocalNotifications } from '@capacitor/local-notifications';
import { Database, object, ref } from '@angular/fire/database';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
valor:any;
tiempo:any;
hora:any;
link:any;
  constructor(private database:Database) {
    const route = ref(this.database, /*direccion a donde ir dentro de la base de datos */);
    object(route).subscribe(attributes => {
      const valores_db = attributes.snapshot.val();
      console.log(valores_db);
      this.valor=100-valores_db.valor;
      console.log(this.valor);
      if(this.valor>=50){
        this.tiempo="Noche";
        this.hora="6pm-6am";
        this.link="https://img.freepik.com/vector-gratis/noche-bosque_1308-69877.jpg?size=626&ext=jpg&ga=GA1.1.1488620777.1713139200&semt=ais";     this.ngOnInit();
      }else{
        this.tiempo="Día";
        this.hora="6am-6pm";
this.link="https://img.freepik.com/vector-premium/dia-soleado-campo_104785-344.jpg";
        this.ngOnInit2();
      }

    });
  }
  async ngOnInit() {
    await LocalNotifications.requestPermissions();//solicitar permisos de la app
    await LocalNotifications.schedule({//Elaboracion del objeto notificacion
      notifications: [
        {
          title: "Es de noche",
          body: "Han llegado las 6 de la tarde",
          id: 1
        }
      ]
    });
  }

  async ngOnInit2() {
    await LocalNotifications.requestPermissions();//solicitar permisos de la app
    await LocalNotifications.schedule({//Elaboracion del objeto notificacion
      notifications: [
        {
          title: "Es de día",
          body: "Ha empezado un nuevo dia",
          id: 1
        }
      ]
    });
  }
}
