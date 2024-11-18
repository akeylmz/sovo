import * as Yup from 'yup'

const phoneRegex = /^\(\d{3}\) \d{3} \d{2} \d{2}$/ // (555) 555 55 55
const dateRegex = /^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/ // 2024-10-15 (for api)

const emailValidation = Yup.string().email('E-posta formatı geçersiz')
const dateValidation = Yup.string().matches(dateRegex, 'Tarih formatı geçersiz')
const phoneValidation = Yup.string().matches(phoneRegex, 'Telefon formatı geçersiz')

//---------------------------------------------------------------------

export const clientValidation = Yup.object({
  CompanyName_Clients: Yup.string().required('Bu alan zorunludur'),
  ContactPerson: Yup.string(),
  PhoneNumber: phoneValidation,
  Email: emailValidation,
  Location: Yup.string(),
})

export const supplierValidation = Yup.object({
  CompanyName_Supplier: Yup.string().required('Bu alan zorunludur'),
  ContactPerson: Yup.string(),
  PhoneNumber: phoneValidation,
  Email: emailValidation,
  Location: Yup.string(),
})

export const projectValidation = Yup.object({
  Company_id: Yup.string().required('Bu alan zorunludur'),
  ProjectName: Yup.string().required('Bu alan zorunludur'),
  ProjectCode: Yup.string().required('Bu alan zorunludur'),
  CompanyUndertakingWork: Yup.string(),
  Location: Yup.string(),
  Cost_NotIncludingKDV: Yup.string(),
  AC_Power: Yup.string(),
  DC_Power: Yup.string(),
  CalculatedCost_NotIncludingKDV: Yup.string(),
  StartDate: dateValidation,
  FinishDate: dateValidation,
  KDV_Rate: Yup.string(),
  Terrain_Roof: Yup.string(),
  Incentive: Yup.string(),
  Situation: Yup.string(),
})

export const projectIncomeValidation = Yup.object({
  CompanyName_Pay_Incomes: Yup.string().required('Bu alan zorunludur'),
  CompanyName_ReceivePayment_Incomes: Yup.string(),
  Amount_Incomes: Yup.string(),
  Dollar_Rate_Incomes: Yup.string(),
  ChekDate_Incomes: dateValidation,
  PaymentType_Incomes: Yup.string(),
  LastChekDate_Incomes: dateValidation,
})

export const projectJobHistoryValidation = Yup.object({
  CompanyName_Job_JobHistory: Yup.string().required('Bu alan zorunludur'),
  ExpensDetails_JobHistory: Yup.string(),
  Amount_JobHistory: Yup.string(),
  Date_JobHistory: dateValidation,
  Dollar_Rate_JobHistory: Yup.string(),
  Invoice_No_JobHistory: Yup.string(),
})

export const projectExpenseValidation = Yup.object({
  CompanyName_Paying_Expenses: Yup.string().required('Bu alan zorunludur'),
  CompanyName_FromPaymentMade_Expenses: Yup.string(),
  ExpensDetails_Expenses: Yup.string(),
  Amount_Expenses: Yup.string(),
  Date_Expenses: dateValidation,
  Dollar_Rate_Expenses: Yup.string(),
  Bank_Expenses: Yup.string(),
})

export const salesProcessValidation = Yup.object({
  Client_Card: Yup.string().required('Bu alan zorunludur'),
  Person_Deal: Yup.string().required('Bu alan zorunludur'),
  Location_Card: Yup.string().required('Bu alan zorunludur'),
  Offer_Cost_NotIncludingKDV_Card: Yup.string(),
  UnitOffer_NotIncludingKDV: Yup.string(),
  AC_Power_Card: Yup.string(),
  Cost_NotIncludingKDV_Card: Yup.string(),
  UnitCost_NotIncludingKDV: Yup.string(),
  DC_Power_Card: Yup.string(),
  Situation_Card: Yup.string().required('Bu alan zorunludur'),
  Comment_Card_1: Yup.string(),
  Date_Card: dateValidation,
  Person_Related: Yup.string(),
  Terrain_Roof_Card: Yup.string(),
  Roof_Cost_Card: Yup.string(),
})

export const salesProcessCommentValidation = Yup.object({
  Comment_Person_Card: Yup.string(),
  Comment_Card: Yup.string(),
  Comment_Telno_Card_1: phoneValidation,
  Comment_Date_Card_1: dateValidation,
  Comment_Telno_Card_2: phoneValidation,
  Comment_Date_Card_2: dateValidation,
  Comment_Telno_Card_3: phoneValidation,
  Comment_Date_Card_3: dateValidation,
  Comment_Telno_Card_4: phoneValidation,
  Comment_Date_Card_4: dateValidation,
  Comment_Telno_Card_5: phoneValidation,
  Comment_Date_Card_5: dateValidation,
  Comment_Telno_Card_6: phoneValidation,
  Comment_Date_Card_6: dateValidation,
  Comment_Telno_Card_7: phoneValidation,
  Comment_Date_Card_7: dateValidation,
})