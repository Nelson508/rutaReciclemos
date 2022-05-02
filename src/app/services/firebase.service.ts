import { Injectable, EventEmitter } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import Access from '../interfaces/interfaces';
import { getDatabase, ref, onValue, get, child} from "firebase/database";
import { DatabaseReference } from '@angular/fire/compat/database/interfaces';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  datita: any;
  datita1: any;
  nuevoDatita = new EventEmitter();
  databaseRef: DatabaseReference;
  data: any;
  constructor(public fireServices: AngularFirestore,
              public db: AngularFireDatabase          
    ) {

      this.databaseRef = db.database.ref();
     }
 //https://github.com/angular/angularfire/blob/master/docs/rtdb/querying-lists.md
 //https://www.bezkoder.com/angular-12-firebase-crud/
 //https://firebase.google.com/docs/database/web/read-and-write?hl=es&authuser=0

    getUData()
  {
    
    // // console.log('query already done');
    // // return this.db.list('zxcv');
    // const dbRef = ref(getDatabase());
    // get(child(dbRef, `zxcv/1`)).then(  (snapshot) => 
    // {
    //   if (snapshot.exists()) 
    //   {
    //   // console.log(snapshot.val());
    //   this.datita = snapshot.val();
    //   console.log(this.datita['user'] + 'datita');
    //   return this.datita;
      
      
    //   // console.log('Auxi:' + aux1['user'] + ' contra' + aux1['pass']);
    //   } else {
    //     console.log("No data available");
    //     return null;
    //   }
    // }).catch((error) => {
    //   console.error(error);
    //   });

    const db = getDatabase();
    const starCountRef = ref(db, 'zxcv/');
    onValue(starCountRef, (snapshot) => {
    const data = snapshot.val();
    console.log(data);
    return data;
    
});
 
}



getData(): Promise<any> {
  return this.databaseRef.child('zxcv').get().then((snapshot) => {
    if (snapshot.exists()) {
      // I don't think you need to keep the data in this.data anymore
      this.data = snapshot.val();
      // console.log(this.data['1']['user']);
      return this.data;
    } else {
      console.log('No data available');
      return null; // or return another default value, like [] or {} or "";
    }
  });
}

}
