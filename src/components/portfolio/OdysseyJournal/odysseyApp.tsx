export function OdysseyApp(props: { active: boolean }) {
  return (
    <div className={`h-full flex flex-col 2xl:flex-row justify-center align-center p-3 2xl:p-24 ${props.active ? 'opacity-100' : 'opacity-50'} ${props.active ? 'blur-0' : 'blur-sm'} transition-all duration-700`}>
      <div className="h-lvh 2xl:h-full w-full 2xl:w-1/3 flex flex-col justify-center p-2 2xl:p-12">
        <video controls className="h-full w-full object-cover">
          <source src="/odyssey-journal/dashboard.mov" />
        </video>
        <h1 className="text-xl my-2 text-white">Weekly Dashboard</h1>
        <p className="my-3 text-white">The purpose of the dashboard view is to help the voyager discern the things on their mind that week. The dashboard uses NLP to surface the people and ideas journaled about.</p>
      </div>
      <div className="h-lvh 2xl:h-full w-full 2xl:w-1/3 flex flex-col justify-center p-2 2xl:p-12">
        <video controls className="h-full w-full object-cover">
          <source src="/odyssey-journal/record.mov" />
        </video>
        <h1 className="text-xl my-2 text-white">Record View</h1>
        <p className="my-3 text-white">The record view was optimized for speed of entry. Journal entries can contain text, images, and audio. All entries are automatically augmented with the current location.</p>
      </div>
      <div className="h-lvh 2xl:h-full w-full 2xl:w-1/3 flex flex-col justify-center p-2 2xl:p-12">
        <video controls className="h-full w-full object-cover">
          <source src="/odyssey-journal/read.mov" />
        </video>
        <h1 className="text-xl my-2 text-white">Journal Entries</h1>
        <p className="my-3 text-white">{"The voyager's entries are presented descending chronologically. Bible verses are automatically identified. Tapping on the verse pulls up a modal with the Scripture."}</p>
      </div>
    </div>
  )
}
