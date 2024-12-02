import '../../../../styles/Modal.css'
import { IoClose, FaRegFileAlt } from '../../../../styles/icons'
import { createPortal } from 'react-dom'
import { Formik, Form, ErrorMessage } from 'formik'
import { motion } from 'framer-motion'
import * as Yup from 'yup'
import Loader from '../../../custom/Loader'
import ErrorOccurred from '../../../custom/ErrorOccurred'
import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { updateSalesOfferWithFile } from '../../../../store/slices/salesOfferSlice'

function CardFileModal({ initialData, fileColumn, onClose }) {
  const dispatch = useDispatch()
  const { loading, error } = useSelector((state) => state.salesOffer)

  const [protocol, setProtocol] = useState('')

  useEffect(() => {
    // window.location.protocol, http: veya https: döner
    const currentProtocol = window.location.protocol
    setProtocol(currentProtocol)
  }, [])

  if (error) return <ErrorOccurred message={error} />

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
            <FaRegFileAlt /> {fileColumn.includes('Offer_File') ? 'Teklif Dosyası' : 'Maliyet Dosyası'}
          </h5>
          <button className='modal-close' onClick={onClose}>
            <IoClose />
          </button>
        </div>

        {initialData[fileColumn] ? (
          <>
            <div className='modal-body one-column'>
              <div className='field-group'>
                <input
                  className='field-control'
                  value={decodeURIComponent(initialData[fileColumn].split('/').pop())}
                  disabled
                />
              </div>
            </div>
            <div className='modal-footer'>
              <a href={`${initialData[fileColumn].replace('http:', protocol)}`} download>
                <button type='button' className='submit-button' onClick={onClose}>
                  Dosya indir
                </button>
              </a>
            </div>
          </>
        ) : (
          <Formik
            initialValues={{
              [fileColumn]: initialData?.[fileColumn] || null,
            }}
            validationSchema={Yup.object().shape({
              [fileColumn]: Yup.mixed()
                .required('Lütfen yüklemek istediğiniz dosyayı seçiniz!')
                .test('fileSize', 'Dosya boyutu 0’dan büyük olmalıdır.', (value) => {
                  return value && value.size > 0
                }),
            })}
            onSubmit={(values) => {
              // Objeden dosya alanları kaldırıldı, yoksa api hata veriyor
              const cleanedSituationCard = Object.keys(initialData)
                .filter((key) => !key.includes('File'))
                .reduce((acc, key) => ({ ...acc, [key]: initialData[key] }), {})

              // Güncellenen veriyi kaydet
              dispatch(updateSalesOfferWithFile({ ...cleanedSituationCard, ...values }))
              onClose()
            }}
          >
            {({ setFieldValue }) => (
              <Form>
                <div className='modal-body one-column'>
                  <div className='field-group'>
                    <input
                      type='file'
                      onChange={(e) => setFieldValue(fileColumn, e.target.files[0])}
                      className='rounded text-md border border-slate-300 file:mr-4 file:py-2 file:px-4 file:border-0 text-gray-400 file:font-semibold file:bg-gray-200 hover:file:bg-gray-300'
                    />

                    <ErrorMessage name={fileColumn} component='div' className='field-error-message' />
                  </div>
                </div>
                <div className='modal-footer'>
                  <button type='submit' className='submit-button'>
                    Yükle
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        )}
      </div>

      {loading && <Loader />}
    </>,
    document.body
  )
}
export default CardFileModal
