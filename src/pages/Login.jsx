import { useAppContext } from "../context/context"
import {Formik, Form, Field, ErrorMessage} from 'formik'
import * as Yup from 'yup'
import toast from 'react-hot-toast'
import { useNavigate } from "react-router-dom"
import { useState } from "react"

export const Login = () => {

  const [dataform, setDataform] = useState({
    email: '',
    password: ''
  });
  const {loginUser} = useAppContext();
  const navigate = useNavigate();

  return (
    <div className="min-vh-100 d-flex justify-content-center align-items-center bg-black">
      <main className="vh-100 d-flex justify-content-center align-items-center px-3">
            <Formik initialValues={dataform}
                  validationSchema={Yup.object({
                    email: Yup.string().email().trim().lowercase().required("Email requerido"),
                    password: Yup.string().trim().required("Contraseña requerida")
                  })}
                  onSubmit={async (values, actions) => {
                            const res = await loginUser(values);
                            if(res.status === 200){
                              actions.setSubmitting(true);
                              toast.success("Sesion iniciada con éxito")
                              navigate("/");
                            } else {
                              toast.error("Mail o contraseña incorrecta", {
                                duration: 4000
                              });
                              actions.resetForm();
                            }
                  }}
                  enableReinitialize
              >
            {({handleSubmit, isSubmitting}) => (
              <Form onSubmit={handleSubmit} className='form-control-sm p-5 rounded formularioLogin flex-column d-flex'>
                  <h3 className="text-warning text-break text-center mb-3 fw-bold">Iniciar sesión</h3>

                  <label className='form-label text-light m-0 fw-bold' htmlFor="e">Email</label>
                  <Field className="form-control fw-bold bg-light text-black border border-light mt-1 mb-3 mx-0" placeholder="Email" name="email" id="e"/>
                    <ErrorMessage name='email' component="p" className="text-danger"/>

                  <label className='form-label text-light m-0 fw-bold' htmlFor="c">Contraseña</label>
                  <Field className="form-control fw-bold bg-light border border-light text-black mt-1 mb-3 mx-0" placeholder="Contraseña" name="password" id="c"/>
                    <ErrorMessage name='password' component="p" className="text-danger"/>
                    
                  <button type='submit' className='btn btn-warning fw-bold mt-4' disabled={isSubmitting}>{isSubmitting ? 'Iniciando sesion...' : 'Iniciar sesion'}</button>
              </Form>
            )}
            </Formik>    
        </main>
    </div>
  )
}

