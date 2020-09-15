import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators ,AbstractControl, CheckboxControlValueAccessor} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'khumalo2';
  images: any =[];
  allfiles: any =[];

  rForm: FormGroup;
  rForm2: FormGroup;
  post:any;
  post2:any;
  name: string='';
  lname: string='';
  email: string='';
  phone: number;
  password : string='';
  description:string ='';
  checkin: Date;
  checkout: Date;
  bankName: string='';
  holderName:string='';
  cardNo:number;
  cvv:number;
  exDate: Date;



    constructor(private fb:FormBuilder)
    {
      this.rForm =fb.group({
        'name':[null, [Validators.required,Validators.minLength(2)]],
      'lname': [null, [Validators.required,Validators.minLength(2)]],
      'email': [null, Validators.required],
      'phone': [null, [Validators.required,Validators.minLength(2)]],
      'password': [null, Validators.required],
      'description':[null, Validators.compose([Validators.required, Validators.minLength(30),Validators.maxLength(200)])],
      'validate' : '',
      'checkin':[null, this.expiryDateValidator],
      'checkout':[null, Validators.required],
      'bankName':[null,Validators.required],
      'holderName':[null,Validators.required],
      'cardNo':[null, Validators.compose([Validators.required, Validators.minLength(16),Validators.maxLength(16)])],
      'cvv':[null, Validators.compose([Validators.required, Validators.minLength(1),Validators.maxLength(3)])],
      'exDate':[null,Validators.required]

      });

    }

    expiryDateValidator( control: AbstractControl )
    {
      if(control)
      {
       const group= <FormGroup> control.root.get('rForm');
       if(group){
         const addControl = group.controls.checkin;
          if(addControl)
          {
            if(addControl.value ==='checkin')
            {
              if(control.value ==null || control.value === undefined ||control.value === '')
              {
                return {'date error': 'Date can not be blank!'}
              }
            }

          }
       }
      }
      return null;
    }

    addPost(post)
    {
      this.name =post.name;
      this.lname =post.lname;
      this.email = post.email;
      this.phone = post.password;
      this.description= post.description;
      this.bankName=post.bankName;
      this.holderName=post.holderName;
      this.cardNo=post.cardNo;
      this.exDate=post.exDate;
    }




    fileuploads(event)
    {
        const files = event.target.files;
        console.log(files);
        if(files)
        {
          for (let i = 0; i <  files.length; i++){
            const image={
              name : '',
              type : '',
              size : '',
              url : ''
            };
            this.allfiles.push(files[i]);
            image.name = files[i].name;
            image.type = files[i].type;

            const size = files[i].size / 1000;
            const mbc = size + '';
            const mb = mbc.split('.')[0];
            const length = mb.length;

              if(length === 4 || length === 5)
              {
                const mbsize = size /1000;
                const splitdata = mbsize + '';
                const splitvalues = splitdata.split('.');
                let secondaryvariable ='';
                for(let j=0; j < splitvalues.length;j++)
                {
                  if(j===1)
                  {
                    secondaryvariable = splitvalues[j].slice(0,2);
                  }
                }
                image.size = splitvalues[0] + '.' + secondaryvariable + 'MB'
              }else{

                const splitdata = size + '';
                const splitvalues = splitdata.split('.');
                let secondaryvariable ='';
                for(let j=0; j < splitvalues.length;j++)
                {
                  if(j===1)
                  {
                    secondaryvariable = splitvalues[j].slice(0,2);
                  }
                }
                image.size = splitvalues[0] + '.' + secondaryvariable + 'KB'

              }


            const reader = new FileReader();
            reader.onload = (filedata)=>{
              image.url = reader.result + '';
              this.images.push(image);
            };
            reader.readAsDataURL(files[i]);
          }
        }
          event.srcElement.value = null;
    }
    deleteImage(image: any)
    {
      const index = this.images.indexOf(image);
      this.images.splice(index, 1);
      this.allfiles.splice(index, 1);
    }

    save()
    {
      console.log(this.allfiles);
    }


}
