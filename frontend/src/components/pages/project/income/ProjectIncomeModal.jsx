import '../../../../styles/Modal.css'
import { IoClose, BiSolidEdit, RiFunctionAddLine } from '../../../../styles/icons'
import { createPortal } from 'react-dom'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { projectIncomeValidation } from '../../../../utils/validationSchemas'
import { motion } from 'framer-motion'
import CustomSelect from '../../../custom/CustomSelect'
import CustomDateInput from '../../../custom/CustomDateInput'
import CustomNumberInput from '../../../custom/CustomNumberInput'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchClients } from '../../../../store/slices/clientSlice'
import { useParams } from 'react-router-dom'
import { companyUndertakingWorkList, paymentMethodList, exchangeRateTimeList } from '../../../../static/datas'

function ProjectIncomeModal({ initialData, onSubmit, onClose }) {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { clients } = useSelector((state) => state.client)

  useEffect(() => {
    if (!clients || clients.length === 0) {
      dispatch(fetchClients())
    }
  }, [dispatch, clients])

  const clientList = clients.map((client) => {
    return { value: client.id, label: client.CompanyName_Clients }
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
            {initialData ? <BiSolidEdit /> : <RiFunctionAddLine />} {initialData ? 'Gelir Güncelle' : 'Gelir Ekle'}
          </h5>
          <button className='modal-close' onClick={onClose}>
            <IoClose />
          </button>
        </div>

        <Formik
          initialValues={{
            Project_Incomes: id, // from url
            CompanyName_Pay_Incomes: initialData?.CompanyName_Pay_Incomes || '',
            CompanyName_ReceivePayment_Incomes: initialData?.CompanyName_ReceivePayment_Incomes || 'Sovo',
            Amount_Incomes: initialData?.Amount_Incomes || '',
            Dollar_Rate_Incomes: initialData?.Dollar_Rate_Incomes || '',
            ChekDate_Incomes: initialData?.ChekDate_Incomes || '',
            PaymentType_Incomes: initialData?.PaymentType_Incomes || '',
            LastChekDate_Incomes: initialData?.LastChekDate_Incomes || '',
          }}
          validationSchema={projectIncomeValidation}
          onSubmit={(values) => {
            const transformedValues = Object.fromEntries(
              Object.entries(values).map(([key, value]) => [key, value === '' ? null : value])
            )
            onSubmit(transformedValues)
            onClose()
          }}
        >
          {({ values }) => (
            <Form>
              <div className='modal-body two-column'>
                <div className='field-group'>
                  <label className='field-title'>Ödeme Yapan Firma</label>
                  <Field name='CompanyName_Pay_Incomes'>
                    {({ field, form }) => (
                      <CustomSelect options={clientList} field={field} form={form} placeholder='Firma adı seçiniz' />
                    )}
                  </Field>
                  <ErrorMessage name='CompanyName_Pay_Incomes' component='div' className='field-error-message' />
                </div>

                <div className='field-group'>
                  <label className='field-title'>Alıcı Firma</label>
                  <Field name='CompanyName_ReceivePayment_Incomes'>
                    {({ field, form }) => (
                      <CustomSelect
                        options={companyUndertakingWorkList}
                        field={field}
                        form={form}
                        placeholder='Firma seçiniz'
                      />
                    )}
                  </Field>
                  <ErrorMessage
                    name='CompanyName_ReceivePayment_Incomes'
                    component='div'
                    className='field-error-message'
                  />
                </div>

                <div className='field-group'>
                  <label className='field-title'>Alınan Miktar (₺)</label>
                  <Field name='Amount_Incomes'>
                    {({ field, form }) => <CustomNumberInput field={field} form={form} />}
                  </Field>
                  <ErrorMessage name='Amount_Incomes' component='div' className='field-error-message' />
                </div>

                <div className='field-group'>
                  <label className='field-title'>Tarih</label>
                  <Field name='ChekDate_Incomes'>
                    {({ field, form }) => <CustomDateInput field={field} form={form} />}
                  </Field>
                  <ErrorMessage name='ChekDate_Incomes' component='div' className='field-error-message' />
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
                  <Field name='Dollar_Rate_Incomes'>
                    {({ field, form }) => <CustomNumberInput field={field} form={form} decimalScale={4} />}
                  </Field>
                  <ErrorMessage name='Dollar_Rate_Incomes' component='div' className='field-error-message' />
                </div>

                <div className='field-group'>
                  <label className='field-title'>Ödeme Türü</label>
                  <Field name='PaymentType_Incomes'>
                    {({ field, form }) => (
                      <CustomSelect
                        options={paymentMethodList}
                        field={field}
                        form={form}
                        placeholder='Ödeme türü seçiniz'
                      />
                    )}
                  </Field>
                  <ErrorMessage name='PaymentType_Incomes' component='div' className='field-error-message' />
                </div>

                <div className='field-group'>
                  <label className='field-title'>Çek Son Kullanma Tarihi</label>
                  <Field name='LastChekDate_Incomes'>
                    {({ field, form }) => (
                      <CustomDateInput field={field} form={form} disabled={values.PaymentType_Incomes !== 'Çek'} />
                    )}
                  </Field>
                  <ErrorMessage name='LastChekDate_Incomes' component='div' className='field-error-message' />
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
export default ProjectIncomeModal
