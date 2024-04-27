export function BidMgmt2(props: { active: boolean }) {
  return (
    <div className={`flex flex-col ${props.active ? 'opacity-100' : 'opacity-50'} ${props.active ? 'blur-0' : 'blur-sm'} transition-all duration-700`}>
      <div className="flex flex-col 2xl:flex-row">
        <div className="h-72 md:h-full 2xl:h-full w-full 2xl:w-1/2 p-3 2xl:p-7">
          <p className="text-white pt-3">Before | Search for Subcontractors View</p>
          <img className="h-56 md:h-full w-full object-left-top 2xl:object-center object-cover rounded-3xl" src="/bid-mgmt/before-search-for-bidders.webp" />
        </div>
        <div className="h-72 md:h-full 2xl:h-full w-full 2xl:w-1/2 p-3 2xl:p-7">
          <p className="text-white pt-3">After | Search for Subcontractors View</p>
          <img className="h-56 md:h-full w-full object-left-top 2xl:object-center object-cover rounded-3xl" src="/bid-mgmt/new-search-for-bidders.webp" />
        </div>

      </div>
      <div className="flex flex-col 2xl:flex-row">
        <div className="h-72 md:h-full 2xl:h-full w-full 2xl:w-1/2 p-3 2xl:p-7">
          <p className="text-white pt-3">Before | Bids List View</p>
          <img className="h-56 md:h-full w-full object-left-top 2xl:object-center object-cover rounded-3xl" src="/bid-mgmt/before-bid-list.webp" />
        </div>
        <div className="h-72 md:h-full 2xl:h-full w-full 2xl:w-1/2 p-3 2xl:p-7">
          <p className="text-white pt-3">After | Bids List View</p>
          <img className="h-56 md:h-full w-full object-left-top 2xl:object-center object-cover rounded-3xl" src="/bid-mgmt/new-bid-list.webp" />
        </div>

      </div>
    </div>
  )
}
