import * as yup from 'yup'

export const RegisterSchema = yup.object().shape({
    fullname:yup.string().required("Fullname is required")
      .min(5,"Fullname can't be less than 5 characters")
     .max(60,"Fullname can't be more than 60 characters")
     .matches(/^[A-Za-z ]*$/,'Please enter valid name'),
     IdNumber:yup.string().required("Id number is required"),
    phonenumber:yup.string().required("Phone number is required"),
    email:yup.string().email().required("Email is required"),
    password:yup.string().min(8,"Password cant be less than 8 characters").required("Password is required"),
    confirmpassword:yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
    photo:yup.mixed().required('Image is required')
    .test('fileSize',
      'File Size is too big', (value) => {
         if(value[0].size > 1024 * 1024)
          return true;

          return false;
      })
    .test('format','upload file', (value) => {
        return value && (
            value[0].type === "image/jpeg" ||
            value[0].type === "image/png" ||
            value[0].type === "image/jpg"
        );
    })
})

export const LoginSchema = yup.object().shape({
    email:yup.string().email().required("Email is required"),
    password:yup.string().min(8,"Password cant be less than 8 characters").required("Password is required")
})

export const PasswordSchema = yup.object().shape({
    password:yup.string().min(8,"Password cant be less than 8 characters").required("Password is required"),
    confirmpassword:yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
})
export const UpdateProfileSchema = yup.object().shape({
    fullname: yup.string()
      .required("Fullname is required")
      .min(5, "Fullname can't be less than 5 characters")
      .max(60, "Fullname can't be more than 60 characters")
      .matches(/^[A-Za-z ]*$/, 'Please enter a valid name'),
  
    IdNumber: yup.string().required("Id number is required"),
    phonenumber: yup.string().required("Phone number is required"),
    email: yup.string().email().required("Email is required"),
    Current_Image_Id:yup.string(),
    photo: yup.mixed().when(['photo'],{
      is:true,
      then:yup.mixed()
      .test('FILE_TYPE','Unsupported file type',(value)=>{
        return value && (
          value[0].type === "image/jpeg" ||
          value[0].type === "image/png" ||
          value[0].type === "image/jpg"
      );
      })
      .test('fileSize','File size should less than 5mb',(value) => {
        if(value[0].size > 5* 1048576)
         return true;
         return false;
     })
    })
  }
[
  ['photo','photo']
]
);

export const CreatePropertySchema = yup.object().shape({
    name:yup.string().required("Property name is required")
    .min(5, "Property name can't be less than 5 characters")
    .max(60, "Property name can't be more than 60 characters")
    .matches(/^[A-Za-z ]*$/, 'Please enter a valid name'),
    location:yup.string().required("Location is required")
    .min(5, "Location can't be less than 5 characters")
    .max(60, "Location can't be more than 60 characters"),
    price:yup.number().required("Price is required").positive("Price can't be less than 0"),
    type:yup.string().required("Type is required"),
    photos:yup.mixed().test('FILE_TYPE','Unsupported file type',(value) =>{
        if(value && value.length>0){
            for (let i=0;i<value.length;i++){
             if(value[i].type!= "image/png" && value[i].type!= "image/jpg" && value[i].type!= "image/jpeg"){
               return false;
             }
            }
         }
         return true;
    } ),
})

export const UpdatePropertySchema = yup.object().shape({
  name: yup
    .string()
    .required("Property name is required")
    .min(5, "Property name can't be less than 5 characters")
    .max(60, "Property name can't be more than 60 characters")
    .matches(/^[A-Za-z ]*$/, 'Please enter a valid name'),
  location: yup
    .string()
    .required("Location is required")
    .min(5, "Location can't be less than 5 characters")
    .max(60, "Location can't be more than 60 characters"),
  price: yup
    .number()
    .required("Price is required")
    .positive("Price can't be less than 0"),
  type: yup.string().required("Type is required"),
  photos: yup
    .mixed()
    .when('photos', {
      is: true,
      then: yup
        .mixed()
        .test('FILE_TYPE', 'Unsupported file type', (value) => {
          if (value) {
            for (let i = 0; i < value.length; i++) {
              if (
                value[i].type !== "image/png" &&
                value[i].type !== "image/jpg" &&
                value[i].type !== "image/jpeg"
              ) {
                return false;
              }
            }
          }
          return true;
        }),
    })
    .optional(),
}
[
  ['photos','photos']
]
);


  
  