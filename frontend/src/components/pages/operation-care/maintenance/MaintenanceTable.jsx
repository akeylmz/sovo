import CustomTable from '../../../custom/CustomTable'
import { formatDate, formatNumber } from '../../../../utils/valueFormatters'

function MaintenanceTable({ data, handleMaintenanceDetail }) {
  // Key değerlerinde başında 'x' olan alanlar formatlanmış veya yeni eklenmiş
  // alanları ifade etmektedir. Örnek olarak orijinal verideki bir tarih alanı
  // 2024-01-01 şeklinde gelmektedir. Bu veri formatlanarak 1 Ocak 2024 haline
  // dönüştürüldüğünde karışıklık olmaması için başarına bu ifade konmuştur.

  const columns = [
    { key: 'Operation_Care_Company', title: 'FİRMA ADI' },
    { key: 'Operation_Care_AC_Power', title: 'TESİS KURULU GÜCÜ' },
    { key: 'Operation_Care_Location', title: 'KONUM' },
    { key: '*****', title: 'BAKIM ÜCRETİ' },
    { key: '*****', title: 'ARIZA DURUMU' },
    { key: 'Operation_Care_Finish_Date', title: 'SONRAKİ BAKIM TARİHİ' },
    // { key: 'x_Cost_NotIncludingKDV_Card', title: 'TOPLAM MALİYET' },
    // { key: 'x_UnitOffer_NotIncludingKDV', title: 'BİRİM TEKLİF' },
    // { key: 'x_Offer_Cost_NotIncludingKDV_Card', title: 'TOPLAM TEKLİF' },
    // { key: 'Terrain_Roof_Card', title: 'ARAZİ/ÇATI' },
    // { key: 'x_Roof_Cost_Card', title: 'ARAZİ MALİYETİ' },
    // { key: 'x_Unit_Cost_with_Roof_Cost', title: 'ARAZİ DAHİL BİRİM MALİYET' },
    // { key: 'x_Unit_Offer_with_Roof_Cost', title: 'ARAZİ DAHİL TOPLAM TEKLİF' },
    // { key: 'x_Profit_Rate_Card', title: 'ARAZİ MALİYETİ' },
    // { key: 'x_Date_Card', title: 'TARİH' },
  ]

  const newData = data.map((item) => ({
    ...item,
    // x_Client_Name: item.client.CompanyName_Clients,
    // x_AC_Power_Card: formatNumber(item.AC_Power_Card) + ' kWe',
    // x_DC_Power_Card: formatNumber(item.DC_Power_Card) + ' kWp',
    // x_UnitCost_NotIncludingKDV: formatNumber(item.UnitCost_NotIncludingKDV) + '$',
    // x_Cost_NotIncludingKDV_Card: formatNumber(item.Cost_NotIncludingKDV_Card) + '$',
    // x_UnitOffer_NotIncludingKDV: formatNumber(item.UnitOffer_NotIncludingKDV) + '$',
    // x_Offer_Cost_NotIncludingKDV_Card: formatNumber(item.Offer_Cost_NotIncludingKDV_Card) + '$',
    // x_Roof_Cost_Card: formatNumber(item.Roof_Cost_Card) + '$',
    // x_Unit_Cost_with_Roof_Cost: formatNumber(item.Unit_Cost_with_Roof_Cost) + '$',
    // x_Unit_Offer_with_Roof_Cost: formatNumber(item.Unit_Offer_with_Roof_Cost) + '$',
    // x_Profit_Rate_Card: formatNumber(item.Profit_Rate_Card) + '$',
    // x_Date_Card: formatDate(item.Date_Card),
  }))

  return <CustomTable data={newData} columns={columns} handleMaintenanceDetail={handleMaintenanceDetail} />
}
export default MaintenanceTable
