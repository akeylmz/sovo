import axios from 'axios'

export const getDollarRate = async (date, timeOption) => {
  const inputDate = new Date(date)

  if (!timeOption) {
    return { status: false, message: 'Kur saati seçimi yapılmadı' }
  }

  if (isNaN(inputDate.getTime())) {
    return { status: false, message: 'Geçerli bir tarih girilmedi' }
  }

  // Tarihi işleme
  const day = inputDate.getDay() // Haftanın günü (0: Pazar, 1: Pazartesi, ..., 6: Cumartesi)
  let targetDate = new Date(inputDate)

  if (timeOption === 'before') {
    if (day === 0) {
      // Pazar → Cuma
      targetDate.setDate(targetDate.getDate() - 2) // Pazar → Cuma
    } else if (day === 6) {
      // Cumartesi → Cuma
      targetDate.setDate(targetDate.getDate() - 1) // Cumartesi → Cuma
    } else if (day === 1) {
      // Pazartesi → Cuma
      targetDate.setDate(targetDate.getDate() - 3) // Pazartesi → Cuma
    } else {
      targetDate.setDate(targetDate.getDate() - 1) // Diğer günler → Önceki gün
    }
  } else if (timeOption === 'after') {
    if (day === 0) {
      // Pazar → Pazartesi
      targetDate.setDate(targetDate.getDate() + 1) // Pazar → Pazartesi
    } else if (day === 6) {
      // Cumartesi → Pazartesi
      targetDate.setDate(targetDate.getDate() + 2) // Cumartesi → Pazartesi
    }
    // Haftaiçi ise tarih değişmez
  }

  // "YYYY-MM-DD" → "DD-MM-YYYY" formatına dönüştür
  const formattedDate = targetDate.toISOString().split('T')[0].split('-').reverse().join('-')

  // API çağrısı
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/get_dollar_rate/${formattedDate}/`)

    // Yanıt kontrolü ve gösterimi
    if (response.data && response.data.rate) {
      return { status: true, data: response.data.rate }
    } else {
      return { status: true, data: 0 }
    }
  } catch {
    // Hata kontrolü
    return { status: false, message: 'Dolar kuru alınamadı, tekrar deneyin' }
  }
}
