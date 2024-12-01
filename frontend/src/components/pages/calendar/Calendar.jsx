import { IoCalendarNumberOutline, IoMdAddCircle } from '../../../styles/icons'
import { useCalendarApp, ScheduleXCalendar } from '@schedule-x/react'
import { createViewMonthAgenda } from '@schedule-x/calendar'
import '@schedule-x/theme-default/dist/index.css'

function Calendar() {
  const calendar = useCalendarApp({
    locale: 'tr-TR',
    views: [createViewMonthAgenda()],
    events: [
      {
        id: '1',
        title: 'Event 1',
        start: '2024-10-09 10:05',
        end: '2024-10-09 10:40',
      },
      {
        id: '2',
        title: 'Event 2',
        start: '2024-10-10',
        end: '2024-10-10',
      },
      {
        id: '3',
        title: 'Event 3',
        start: '2024-10-10 15:30',
        end: '2024-10-10 18:00',
      },
      {
        id: '4',
        title: 'Event 4',
        start: '2024-10-11 20:30',
        end: '2024-10-11 21:00',
      },
      {
        id: '5',
        title: 'Event 5',
        start: '2024-10-11 15:30',
        end: '2024-10-11 18:00',
      },
      {
        id: '6',
        title: 'Event 6',
        start: '2024-10-11 20:30',
        end: '2024-10-11 21:00',
      },
    ],
  })

  return (
    <>
      <div className='flex justify-between mb-6'>
        <div className='flex items-center gap-2'>
          <div className='rounded-full p-2 bg-soento-green text-soento-white'>
            <IoCalendarNumberOutline className='text-2xl' />
          </div>
          <p className='font-bold text-soento-green'>Takvim (Demo)</p>
        </div>
        <div className='flex items-center gap-1 rounded-full p-1 bg-soento-green'>
          <button className='flex gap-1.5 items-center rounded-full px-2 py-1 bg-soento-green text-soento-white hover:bg-soento-white hover:text-soento-green'>
            <IoMdAddCircle className='text-lg' /> Yeni Etkinlik
          </button>
        </div>
      </div>

      <ScheduleXCalendar calendarApp={calendar} />
    </>
  )
}
export default Calendar
