import '../../../../styles/Modal.css'
import { IoClose, BiSolidEdit, RiFunctionAddLine } from '../../../../styles/icons'
import { createPortal } from 'react-dom'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { projectJobHistoryValidation } from '../../../../utils/validationSchemas'
import { motion } from 'framer-motion'
import CustomSelect from '../../../custom/CustomSelect'
import CustomDateInput from '../../../custom/CustomDateInput'
import CustomNumberInput from '../../../custom/CustomNumberInput'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSuppliers } from '../../../../store/slices/supplierSlice'
import { useParams } from 'react-router-dom'
import { exchangeRateTimeList, typeOfJobList } from '../../../../static/datas'

function ProjectJobHistoryModal({ initialData, onSubmit, onClose }) {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { suppliers } = useSelector((state) => state.supplier)

  useEffect(() => {
    if (!suppliers || suppliers.length === 0) {
      dispatch(fetchSuppliers())
    }
  }, [dispatch, suppliers])

  const supplierList = suppliers.map((supplier) => {
    return { value: supplier.id, label: supplier.CompanyName_Supplier }
  })

  // const fetchExchangeRate = async () => {
  //--------------------------
  // }

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
            {initialData ? 'Yapılan İş Güncelle' : 'Yapılan İş Ekle'}
          </h5>
          <button className='modal-close' onClick={onClose}>
            <IoClose />
          </button>
        </div>

        <Formik
          initialValues={{
            Project_JobHistory: id, // from url
            CompanyName_Job_JobHistory: initialData?.CompanyName_Job_JobHistory || '',
            ExpensDetails_JobHistory: initialData?.ExpensDetails_JobHistory || '',
            Amount_JobHistory: initialData?.Amount_JobHistory || '',
            Date_JobHistory: initialData?.Date_JobHistory || '',
            Dollar_Rate_JobHistory: initialData?.Dollar_Rate_JobHistory || '',
            Invoice_No_JobHistory: initialData?.Invoice_No_JobHistory || '',
          }}
          validationSchema={projectJobHistoryValidation}
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
                  <label className='field-title'>İş Yapılan Firma</label>
                  <Field name='CompanyName_Job_JobHistory'>
                    {({ field, form }) => (
                      <CustomSelect options={supplierList} field={field} form={form} placeholder='Firma adı seçiniz' />
                    )}
                  </Field>
                  <ErrorMessage name='CompanyName_Job_JobHistory' component='div' className='field-error-message' />
                </div>

                <div className='field-group'>
                  <label className='field-title'>Cinsi</label>
                  <Field name='ExpensDetails_JobHistory'>
                    {({ field, form }) => (
                      <CustomSelect options={typeOfJobList} field={field} form={form} placeholder='İş cinsi seçiniz' />
                    )}
                  </Field>
                  <ErrorMessage name='ExpensDetails_JobHistory' component='div' className='field-error-message' />
                </div>

                <div className='field-group'>
                  <label className='field-title'>Tutar (₺)</label>
                  <Field name='Amount_JobHistory'>
                    {({ field, form }) => <CustomNumberInput field={field} form={form} />}
                  </Field>
                  <ErrorMessage name='Amount_JobHistory' component='div' className='field-error-message' />
                </div>

                <div className='field-group'>
                  <label className='field-title'>Tarih</label>
                  <Field name='Date_JobHistory'>
                    {({ field, form }) => <CustomDateInput field={field} form={form} />}
                  </Field>
                  <ErrorMessage name='Date_JobHistory' component='div' className='field-error-message' />
                </div>

                <div className='field-group'>
                  <label className='field-title'>Kur Saati</label>
                  <Field name='-'>
                    {({ field, form }) => (
                      <CustomSelect
                        options={exchangeRateTimeList}
                        field={field}
                        form={form}
                        placeholder='Kur saati seçiniz'
                      />
                    )}
                  </Field>
                  <ErrorMessage name='-' component='div' className='field-error-message' />
                </div>

                <div className='field-group'>
                  <label className='field-title'>Dolar Kuru (₺)</label>
                  <Field name='Dollar_Rate_JobHistory'>
                    {({ field, form }) => <CustomNumberInput field={field} form={form} decimalScale={4} />}
                  </Field>
                  <ErrorMessage name='Dollar_Rate_JobHistory' component='div' className='field-error-message' />
                </div>

                <div className='field-group'>
                  <label className='field-title'>Fatura Numarası</label>
                  <Field
                    name='Invoice_No_JobHistory'
                    type='text'
                    className='field-control'
                    placeholder='Fatura numarası giriniz'
                  />
                  <ErrorMessage name='Invoice_No_JobHistory' component='div' className='field-error-message' />
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
export default ProjectJobHistoryModal
