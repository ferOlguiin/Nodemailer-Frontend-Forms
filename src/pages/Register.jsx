import { useNavigate } from "react-router-dom"
import { useAppContext } from "../context/context"
import { useState } from "react"
import { toast } from "react-hot-toast"
import {Formik, Form, Field, ErrorMessage} from 'formik'
import * as Yup from 'yup'

export const Register = () => {

  const {registerUser} = useAppContext();
  const navigate = useNavigate();
  const [dataform, setDataform] = useState({
    name: '',
    email: '',
    password: '',
  });

  return (
    <div className="min-vh-100 d-flex justify-content-center align-items-center bg-black">
      <main className="vh-100 d-flex justify-content-center align-items-center px-3">
            <Formik initialValues={dataform}
                  validationSchema={Yup.object({
                    name: Yup.string().max(25, 'El nombre no puede tener mas de 25 caracteres').trim().required("Nombre de usuario requerido"),
                    email: Yup.string().email().trim().lowercase().required("Email requerido"),
                    password: Yup.string().trim().required("Contraseña requerida")
                  })}
                  onSubmit={async (values, actions) => {
                            const res = await registerUser(values);
                            if(res.status === 200){
                              actions.setSubmitting(true);
                              toast.success("Registramos tu usuario correctamente")
                              navigate("/login");
                            } else {
                              toast.error("No pudimos registrar tu usuario, algo falló", {
                                duration: 4000
                              });
                              actions.resetForm();
                            }
                  }}
                  enableReinitialize
              >
            {({handleSubmit, isSubmitting}) => (
              <Form onSubmit={handleSubmit} className='form-control-sm p-5 rounded flex-column d-flex'>
                  <h3 className="text-info text-break text-center mb-3 fw-bold">Registrar usuario</h3>
                  
                  <label className='form-label text-light m-0 fw-bold' htmlFor="c">Name</label>
                  <Field className="form-control fw-bold bg-secondary border border-secondary text-light mt-1 mb-3 mx-0" placeholder="Nombre" name="name" id="n"/>
                    <ErrorMessage name='name' component="p" className="text-danger"/>

                  <label className='form-label text-light m-0 fw-bold' htmlFor="e">Email</label>
                  <Field className="form-control fw-bold bg-secondary text-light border border-secondary mt-1 mb-3 mx-0" placeholder="Email" name="email" id="e"/>
                    <ErrorMessage name='email' component="p" className="text-danger"/>

                  
                  <label className='form-label text-light m-0 fw-bold' htmlFor="c">Contraseña</label>
                  <Field className="form-control fw-bold bg-secondary border border-secondary text-light mt-1 mb-3 mx-0" placeholder="Contraseña" name="password" id="c"/>
                    <ErrorMessage name='password' component="p" className="text-danger"/>
                    
                  <button type='submit' className='btn-sun fw-bold mt-4' disabled={isSubmitting}>{isSubmitting ? 'Registrando usuario...' : 'Registrarme'}</button>
              </Form>
            )}
            </Formik>    
        </main>
    </div>
  )
}

