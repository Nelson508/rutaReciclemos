import { Injectable, EventEmitter } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import Access from '../interfaces/interfaces';
import { getDatabase, ref, onValue, get, child} from "firebase/database";
import { DatabaseReference } from '@angular/fire/compat/database/interfaces';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  datita: any;
  datita1: any;
  nuevoDatita = new EventEmitter();
  databaseRef: DatabaseReference;
  data: any;
  dataGenero: any;
  dataRutasCompletas: any;
  puntosFijos: any = [];
  publicacion: any = [];
  dataproductos:any;

  
  constructor(public fireServices: AngularFirestore,
              public db: AngularFireDatabase,
              private afauth: AngularFireAuth       
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
  return this.databaseRef.child('zxcv').once('value').then((snapshot) => {
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

getKey(): Promise<any> {
  return this.databaseRef.child('zkey').once('value').then((snapshot) => {
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

getRutasCompletadas(): Promise<any> {
  return this.databaseRef.child('rutas_completadas').once('value').then((snapshot) => {
    if (snapshot.exists()) {
      // I don't think you need to keep the data in this.data anymore
      this.dataRutasCompletas = snapshot.val();
      //console.log(this.dataRutasCompletas);
      return this.dataRutasCompletas;
    } else {
      console.log('No data available');
      return null; // or return another default value, like [] or {} or "";
    }
  });
}

getGenero(id:any): Promise<any> {
  return this.databaseRef.child('Usuarios/app_usuarios/'+id+'/Sexo').once('value').then((snapshot) => {
    if (snapshot.exists()) {
      // I don't think you need to keep the data in this.data anymore
      this.dataGenero = snapshot.val();
     
      //console.log(this.dataGenero);
      return this.dataGenero;
    } else {
      console.log('No data available');
      return null; // or return another default value, like [] or {} or "";
    }
  });
}

getPuntosFijos(): Promise<any> {
  return this.databaseRef.child('puntofijo/').orderByChild('nombre').once('value').then((snapshot) => {
    if (snapshot.exists()) {
      // I don't think you need to keep the data in this.data anymore
      this.puntosFijos = [];
      snapshot.forEach(childrenSnapshot =>{
        this.puntosFijos.push(childrenSnapshot.val());
        console.log(this.puntosFijos);
      });
      return this.puntosFijos;
    } else {
      console.log('No data available');
      return null; // or return another default value, like [] or {} or "";
    }
  });
}

getInformaciones(): Promise<any> {

  return this.databaseRef.child('informaciones/').orderByChild('eliminado').equalTo(false).once('value').then((snapshot) => {
    if (snapshot.exists()) {
      // I don't think you need to keep the data in this.data anymore
      //let publicacion = [];
      this.publicacion = [];
      
      snapshot.forEach(childrenSnapshot =>{
        this.publicacion.push(childrenSnapshot.val());
      });
      
      //console.log(this.publicacion);
      //this.puntosFijos = snapshot.val();
      return this.publicacion;
    } else {
      console.log('No data available');
      return null; // or return another default value, like [] or {} or "";
    }
  });
}

setInformaciones(id:number, publicacion:any)
{

  console.log('Infomraciones:' + id);
  
  this.databaseRef.child('informaciones/'+ id).set({
    _id: id,
    titulo: publicacion.titulo,
    descripcion: publicacion.descripcion,
    imagen: publicacion.imagen,
    eliminado: false
  });
}

updateInformaciones(publicacion:any): Promise<any> {

  console.log('Infomracion:' + publicacion);
  // console.log('Id', publicacion._id)

  console.log('Titulo', publicacion.titulo)
  if(publicacion.imagen != undefined){
    return this.databaseRef.child('informaciones/' +  publicacion._id).update({
      titulo: publicacion.titulo,
      descripcion: publicacion.descripcion,
      imagen: publicacion.imagen,
    }, (error) => {
      if (error) {
        Swal.fire({
          title: 'Error, inténtelo nuevamente',
          icon: 'error',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK',
        });

      } else {
  
        Swal.fire(
          'Actualizado',
          'La publicación ha sido actualizada correctamente.',
          'success'
        )

      }
    });
  }
  // console.log('Descripcion', publicacion.descripcion)
  console.log('Descripcion', publicacion.imagen)
  
  return this.databaseRef.child('informaciones/' +  publicacion._id).update({
    titulo: publicacion.titulo,
    descripcion: publicacion.descripcion
  }, (error) => {
    if (error) {

      Swal.fire({
        title: 'Error, inténtelo nuevamente',
        icon: 'error',
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK',
      });

    } else {

      Swal.fire(
        'Actualizado',
        'La publicación ha sido actualizada correctamente.',
        'success'
      )

    }
  });
}

eliminarInformacion(id:number): Promise<any>{

  return this.databaseRef.child('informaciones/' + id).update({
    eliminado: true
  }, (error) => {
    if (error) {

      Swal.fire({
        title: 'Error, inténtelo nuevamente',
        icon: 'error',
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK',
      });

    } else {

      Swal.fire(
        'Eliminado!',
        'La publicación ha sido eliminada con éxito.',
        'success'
      )
    }
  // }).then((snapshot) => {
  //     return true;
   });
}


/* const usersRef = ref.child('users'); */
/* usersRef.set({
  alanisawesome: {
    date_of_birth: 'June 23, 1912',
    full_name: 'Alan Turing'
  },
  gracehop: {
    date_of_birth: 'December 9, 1906',
    full_name: 'Grace Hopper'
  }
});
 */

  /* async register() {
    try {
      return await this.afauth.createUserWithEmailAndPassword('Nelson@dominguez.com', '123456');
    } catch (err) {
      console.log("error en login: ", err);
      return null;
    }
  } */

  async login() {
    try {
      return await this.afauth.signInWithEmailAndPassword('Nelson@dominguez.com', '123456');
    } catch (err) {
      console.log("error en login: ", err);
      return null;
    }
  }

  getFechaNacimiento(id:any): Promise<any> {
    return this.databaseRef.child('Usuarios/app_usuarios/'+id+'/fecha_nacimiento').once('value').then((snapshot) => {
      if (snapshot.exists()) {
        // I don't think you need to keep the data in this.data anymore
        this.dataGenero = snapshot.val();
       
        //console.log(this.dataGenero);
        return this.dataGenero;
      } else {
        console.log('No data available');
        return null; // or return another default value, like [] or {} or "";
      }
    });
  }

  getProductos(): Promise<any> {
    return this.databaseRef.child('productos').once('value').then((snapshot) => {
      if (snapshot.exists()) {
        // I don't think you need to keep the data in this.data anymore
        this.dataproductos = snapshot.val();
       
        //console.log(this.dataGenero);
        return this.dataproductos;
      } else {
        console.log('No data available');
        return null; // or return another default value, like [] or {} or "";
      }
    });
  }

  updateProducto(material:any): Promise<any> {

    // console.log('From fireBase:' + material);
 
  
    
   
    
    return this.databaseRef.child('productos/' +  material.id).update({
      cantidad: material.cantidad,
      precio: material.precio
    }, (error) => {
      if (error) {
  
        Swal.fire({
          title: 'Error, inténtelo nuevamente',
          icon: 'error',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK',
        });

        return false;
  
      } else {
  
        Swal.fire(
          'Actualizado',
          'Los valores del material se han actualizado exitosamente.',
          'success'
        )

        return true;
  
      }
    });
  }
}
