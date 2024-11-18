function Content({ children }) {
  return (
    <div className='flex-1 bg-soento-green overflow-auto'>
      <div className='size-full rounded-tl-3xl bg-soento-white'>
        <div className='size-full flex flex-col px-5 pt-4 pb-20 md:pb-5 overflow-auto'>{children}</div>
      </div>
    </div>
  )
}
export default Content
