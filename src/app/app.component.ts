import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/models/user';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  [x: string]: any;
  title = 'mean-crud';


  // public name: string;
  // public email : string;
  // public cntno: string;
  // public age : number;
  // public pwd: string;
  // public cnfpwd : string;
  // public allData : any;
  docs:any;
  // userdata: any;
  user_id : any;
  reqData:any;
  public user: User;


  constructor(public http:HttpClient){
    this.user= new User();
    this.getuser();
    this.value=true;
  }
  submituser(){
    console.log(this.user);
    // let userdata={
    //   userName : this.name,
    //   userEmail : this.email,
    //   userCntno: this.cntno,
    //   userAge : this.age,
    //   userPwd : this.pwd
    // }
    this.http.post("http://localhost:3000/user/submituser",this.user)
    .subscribe((apiRes)=>{
      console.log(apiRes)
    });
    this.getuser();
    this.user.name="";
    this.user.email=""
    this.user.cntno="";
    this.user.age="";
    this.user.pwd="";
  }



  getuser(){
    console.log("Getting user from the db")
    this.http.get("http://localhost:3000/userlist/getalluser")
    .subscribe((apiRes)=>{
      this.allData=apiRes.docs;
    })
    console.log(this.allData);
  }




  edituser(_id){
    let reqData={
      userId : this._id,
      newName : this.editname,
      newEmail : this.editemail,
      newCntno: this.editcntno,
      newAge : this.editage,
    }
    console.log(this._id)
    this.http.post("http://localhost:3000/user/edituser",reqData)
    .subscribe((apiRes)=>{
      this.newData= apiRes.updtDocs;
      console.log(this.newData)
      this.getuser();
    })
  }



  deleteUser(userId){
    let user_id={
      _id:userId
    }
    this.http.post("http://localhost:3000/user/deleteuser",user_id)
    .subscribe((apiRes)=>{
      console.log("Record deleted");
      this.getuser();
    })
  }



  hidden(value,userId){
    this.value=value;
    this._id=userId;
  }
}

