import '../../../styles/Modal.css'
import { IoClose, BiSolidEdit, RiFunctionAddLine } from '../../../styles/icons'
import { createPortal } from 'react-dom'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { supplierValidation } from '../../../utils/validationSchemas'
import { motion } from 'framer-motion'
import CustomSelect from '../../custom/CustomSelect'
import CustomPhoneInput from '../../custom/CustomPhoneInput'
import { cities } from '../../../static/datas'

function SupplierModal({ initialData, onSubmit, onClose }) {
  return createPortal(
    <>
      <motion.div
        className='modal-backdrop'
        initial={{ opacity: 0.5 }}
        animate={{ opacity: 1 }}
        onClick={onClose}
      ></motion.div>

      <div className='modal-content'>
        <div className='modal-header'>
          <h5 className='modal-title'>
            {initialData ? <BiSolidEdit /> : <RiFunctionAddLine />}{' '}
            {initialData ? 'Tedarikçi Güncelle' : 'Tedarikçi Ekle'}
          </h5>
          <button className='modal-close' onClick={onClose}>
            <IoClose />
          </button>
        </div>

        <Formik
          initialValues={{
            CompanyName_Supplier: initialData?.CompanyName_Supplier || '',
            ContactPerson: initialData?.ContactPerson || '',
            PhoneNumber: initialData?.PhoneNumber || '',
            Email: initialData?.Email || '',
            Location: initialData?.Location || '',
          }}
          validationSchema={supplierValidation}
          onSubmit={(values) => {
            const transformedValues = Object.fromEntries(
              Object.entries(values).map(([key, value]) => [key, value === '' ? null : value])
            )
            onSubmit(transformedValues)
            onClose()
          }}
        >
          {() => (
            <Form>
              <div className='modal-body two-column'>
                <div className='field-group'>
                  <label className='field-title'>Tedarikçi Adı</label>
                  <Field
                    name='CompanyName_Supplier'
                    type='text'
                    className='field-control'
                    placeholder='Tedarikçi adı giriniz'
                  />
                  <ErrorMessage name='CompanyName_Supplier' component='div' className='field-error-message' />
                </div>

                <div className='field-group'>
                  <label className='field-title'>Muhatap</label>
                  <Field name='ContactPerson' type='text' className='field-control' placeholder='Muhatap giriniz' />
                  <ErrorMessage name='ContactPerson' component='div' className='field-error-message' />
                </div>

                <div className='field-group'>
                  <label className='field-title'>Telefon</label>
                  <Field name='PhoneNumber'>
                    {({ field, form }) => <CustomPhoneInput field={field} form={form} />}
                  </Field>
                  <ErrorMessage name='PhoneNumber' component='div' className='field-error-message' />
                </div>

                <div className='field-group'>
                  <label className='field-title'>E-posta</label>
                  <Field name='Email' type='text' className='field-control' placeholder='E-posta giriniz' />
                  <ErrorMessage name='Email' component='div' className='field-error-message' />
                </div>

                <div className='field-group'>
                  <label className='field-title'>Bölge</label>
                  <Field name='Location'>
                    {({ field, form }) => (
                      <CustomSelect options={cities} field={field} form={form} placeholder='Bölge seçiniz' />
                    )}
                  </Field>
                  <ErrorMessage name='Location' component='div' className='field-error-message' />
                </div>
              </div>
              <div className='modal-footer'>
                <button type='submit' className='submit-button'>
                  {initialData ? 'Güncelle' : 'Ekle'}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>,
    document.body
  )
}
export default SupplierModal
